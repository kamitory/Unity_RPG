﻿using UnityEngine;
using System.Collections;

[RequireComponent (typeof (StatusC))]
[RequireComponent (typeof (CharacterMotorC))]

public class AIsetC : MonoBehaviour {
	
	
	public enum AIState { Moving = 0, Pausing = 1 , Idle = 2 , Patrol = 3}
	
	public GameObject mainModel;
	public Transform followTarget;
	public float approachDistance = 2.0f;
	public float detectRange = 15.0f;
	public float lostSight = 100.0f;
	public float speed = 4.0f;
	public bool useMecanim = false;
	public Animator animator;
	public AnimationClip movingAnimation;
	public AnimationClip idleAnimation;
	public AnimationClip attackAnimation;
	public AnimationClip hurtAnimation;
	
	[HideInInspector]
	public bool  flinch = false;

	public bool  stability = false;
	
	public bool  freeze = false;
	
	public Transform bulletPrefab;
	public Transform attackPoint;

	public float attackCast = 0.3f;
	public float attackDelay = 0.5f;
	[HideInInspector]
	public AIState followState;
	private float distance = 0.0f;
	private int atk = 0;
	private int matk = 0;
	private Vector3 knock = Vector3.zero;
	[HideInInspector]
	public bool  cancelAttack = false;
	private bool  attacking = false;
	private bool  castSkill = false;
	private GameObject[] gos;

	public AudioClip attackVoice;
	public AudioClip hurtVoice;
	
	void  Start (){
		gameObject.tag = "Enemy"; 
	/*	if(!followTarget){
			followTarget = FindClosest().transform;
		}*/
		
		if(!attackPoint){
			attackPoint = this.transform;
		}
		
		if(!mainModel){
			mainModel = this.gameObject;
		}
		GetComponent<StatusC>().useMecanim = useMecanim;
		//Assign MainModel in Status Script
		GetComponent<StatusC>().mainModel = mainModel;
		//Set ATK = Monster's Status
		atk = GetComponent<StatusC>().atk;
		matk = GetComponent<StatusC>().matk;
		
		followState = AIState.Idle;
		if(!useMecanim){
			//If using Legacy Animation
			mainModel.GetComponent<Animation>().Play(idleAnimation.name);
			mainModel.GetComponent<Animation>()[hurtAnimation.name].layer = 10;
		}else{
			//If using Mecanim Animation
			if(!animator){
				animator = mainModel.GetComponent<Animator>();
			}
		}
		
	}
	
	Vector3  GetDestination (){
		Vector3 destination = followTarget.position;
		destination.y = transform.position.y;
		return destination;
	}
	
	void  Update (){
		StatusC stat = GetComponent<StatusC>();
		CharacterController controller = GetComponent<CharacterController>();
		gos = GameObject.FindGameObjectsWithTag("Player");  
			if (gos.Length > 0) {
				followTarget = FindClosest().transform;
			}
		if(useMecanim){
			animator.SetBool("hurt" , flinch);
		}
		
		if (flinch){
			controller.Move(knock * 6* Time.deltaTime);
			return;
		}
		
		if(freeze || stat.freeze){
			return;
		}
		
		if(!followTarget){
			return;
		}
		//-----------------------------------
		
		if (followState == AIState.Moving) {
			if ((followTarget.position - transform.position).magnitude <= approachDistance) {
				followState = AIState.Pausing;
				if(!useMecanim){
					//If using Legacy Animation
					mainModel.GetComponent<Animation>().CrossFade(idleAnimation.name, 0.2f);
				}else{
					animator.SetBool("run" , false);
				}
				//----Attack----
				//Attack();
				StartCoroutine(Attack());
			}else if ((followTarget.position - transform.position).magnitude >= lostSight)
			{//Lost Sight
				GetComponent<StatusC>().health = GetComponent<StatusC>().maxHealth;
				followState = AIState.Idle;
				if(!useMecanim){
					//If using Legacy Animation
					mainModel.GetComponent<Animation>().CrossFade(idleAnimation.name, 0.2f); 
				}else{
					animator.SetBool("run" , false);
				}
			}else {
				Vector3 forward = transform.TransformDirection(Vector3.forward);
				controller.Move(forward * speed * Time.deltaTime);
				
				Vector3 destiny = followTarget.position;
				destiny.y = transform.position.y;
				transform.LookAt(destiny);
			}
		}
		else if (followState == AIState.Pausing){
			Vector3 destinya = followTarget.position;
			destinya.y = transform.position.y;
			transform.LookAt(destinya);
			
			distance = (transform.position - GetDestination()).magnitude;
			if (distance > approachDistance) {
				followState = AIState.Moving;
				if(!useMecanim){
					//If using Legacy Animation
					mainModel.GetComponent<Animation>().CrossFade(movingAnimation.name, 0.2f);
				}else{
					animator.SetBool("run" , true);
				}
			}
		}
		//----------------Idle Mode--------------
		else if (followState == AIState.Idle){
			Vector3 destinyheight = followTarget.position;
			destinyheight.y = transform.position.y - destinyheight.y;
			int getHealth = GetComponent<StatusC>().maxHealth - GetComponent<StatusC>().health;
			
			distance = (transform.position - GetDestination()).magnitude;
			if (distance < detectRange && Mathf.Abs(destinyheight.y) <= 4 || getHealth > 0){
				followState = AIState.Moving;
				if(!useMecanim){
					//If using Legacy Animation
					mainModel.GetComponent<Animation>().CrossFade(movingAnimation.name, 0.2f);
				}else{
					animator.SetBool("run" , true);
				}
			}
		}
		//-----------------------------------
	}
	
	public void  Flinch ( Vector3 dir  ){
		if(stability){
			return;
		}
		if(hurtVoice && GetComponent<StatusC>().health >= 1){
			GetComponent<AudioSource>().clip = hurtVoice;
			GetComponent<AudioSource>().Play();
		}
		cancelAttack = true;
		if(followTarget){
			Vector3 look = followTarget.position;
			look.y = transform.position.y;
			transform.LookAt(look);
		}
		knock = transform.TransformDirection(Vector3.back);
		//knock = dir;
		//KnockBack();
		StartCoroutine(KnockBack());
		if(!useMecanim){
			//If using Legacy Animation
			mainModel.GetComponent<Animation>().PlayQueued(hurtAnimation.name, QueueMode.PlayNow);
			mainModel.GetComponent<Animation>().CrossFade(movingAnimation.name, 0.2f);
		}
		followState = AIState.Moving;
		
	}
	
	IEnumerator  KnockBack (){
		flinch = true;
		yield return new WaitForSeconds(0.2f);
		flinch = false;
	}
	
	IEnumerator  Attack (){
		cancelAttack = false;
		Transform bulletShootout;
		if(!flinch || !GetComponent<StatusC>().freeze || !freeze || !attacking){
			freeze = true;
			attacking = true;
			if(!useMecanim){
				//If using Legacy Animation
				mainModel.GetComponent<Animation>().Play(attackAnimation.name);
			}else{
				animator.Play(attackAnimation.name);
			}
			yield return new WaitForSeconds(attackCast);
		
			//attackPoint.transform.LookAt(followTarget);
			if(!cancelAttack){
				if(attackVoice && !flinch){
					GetComponent<AudioSource>().clip = attackVoice;
					GetComponent<AudioSource>().Play();
				}
				bulletShootout = Instantiate(bulletPrefab, attackPoint.transform.position , attackPoint.transform.rotation) as Transform;
				bulletShootout.GetComponent<BulletStatusC>().Setting(atk , matk , "Enemy" , this.gameObject);
				yield return new WaitForSeconds(attackDelay);
				freeze = false;
				attacking = false;
				if(!useMecanim){
					//If using Legacy Animation
					mainModel.GetComponent<Animation>().CrossFade(movingAnimation.name, 0.2f);
				}else{
					animator.SetBool("run" , true);
				}
				CheckDistance();
			}else{
				freeze = false;
				attacking = false;
			}

		}
		
	}
	
	void  CheckDistance (){
		if(!followTarget){
			if(!useMecanim){
				//If using Legacy Animation
				mainModel.GetComponent<Animation>().CrossFade(idleAnimation.name, 0.2f);  
			}else{
				animator.SetBool("run" , false);
			}
			followState = AIState.Idle;
			return;
		}
		float distancea = (followTarget.position - transform.position).magnitude;
		if (distancea <= approachDistance){
			Vector3 destinya = followTarget.position;
			destinya.y = transform.position.y;
			transform.LookAt(destinya);
			StartCoroutine(Attack());
			//Attack();
		}else{
			followState = AIState.Moving;
			if(!useMecanim){
				//If using Legacy Animation
				mainModel.GetComponent<Animation>().CrossFade(movingAnimation.name, 0.2f);
			}else{
				animator.SetBool("run" , true);
			}
		}
	}
	
	
	GameObject FindClosest (){ 
		// Find Closest Player   
		//GameObject closest = new GameObject();
		GameObject closest = GameObject.FindWithTag("Player"); 
		gos = GameObject.FindGameObjectsWithTag("Player"); 
		if(gos.Length > 0){
			float distance = Mathf.Infinity; 
			Vector3 position = transform.position; 
			
			foreach(GameObject go in gos) { 
				Vector3 diff = (go.transform.position - position); 
				float curDistance = diff.sqrMagnitude; 
				if (curDistance < distance) { 
					//------------
					closest = go; 
					distance = curDistance;
				} 
			} 
		}
		return closest; 
	}

	public void ActivateSkill( Transform skill  ,   float castTime  ,   float delay  ,   string anim  ,   float dist  ){
		StartCoroutine(UseSkill(skill ,attackCast, attackDelay , anim , dist));
	}


	public IEnumerator  UseSkill ( Transform skill  ,   float castTime  ,   float delay  ,   string anim  ,   float dist  ){
		cancelAttack = false;
		if(!flinch && followTarget && (followTarget.position - transform.position).magnitude < dist && !GetComponent<StatusC>().silence && !GetComponent<StatusC>().freeze  && !castSkill){
			freeze = true;
			castSkill = true;
			if(!useMecanim){
				//If using Legacy Animation
				mainModel.GetComponent<Animation>().Play(anim);
			}else{
				animator.Play(anim);
			}
			//Transform bulletShootout;
			yield return new WaitForSeconds(castTime);
			//attackPoint.transform.LookAt(followTarget);
			if(!cancelAttack){
				Transform bulletShootout = Instantiate(skill, attackPoint.transform.position , attackPoint.transform.rotation) as Transform;
				bulletShootout.GetComponent<BulletStatusC>().Setting(atk , matk , "Enemy" , this.gameObject);
				yield return new WaitForSeconds(delay);
				freeze = false;
				castSkill = false;
				if(!useMecanim){
					//If using Legacy Animation
					mainModel.GetComponent<Animation>().CrossFade(movingAnimation.name, 0.2f);
				}else{
					animator.SetBool("run" , true);
				}
			}else{
				freeze = false;
				castSkill = false;
			}
			

		}

		
	}
	

}