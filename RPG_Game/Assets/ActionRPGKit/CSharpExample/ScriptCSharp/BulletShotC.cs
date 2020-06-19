using UnityEngine;
using System.Collections;

[RequireComponent (typeof (BulletStatusC))]

public class BulletShotC : MonoBehaviour {
	
	public float Speed = 20;
	public Vector3 relativeDirection= Vector3.forward;
	public float duration = 1.0f;
	public string shooterTag = "Player";
	public GameObject hitEffect;
	
	void  Start (){
		hitEffect = GetComponent<BulletStatusC>().hitEffect;
		Destroy (gameObject, duration);
	}
	
	
	void  Update (){
		
		Vector3 absoluteDirection = transform.rotation * relativeDirection;
		transform.position += absoluteDirection *Speed* Time.deltaTime;
		
		
	}
	
	void  OnTriggerEnter ( Collider other  ){
		
		if (other.gameObject.tag == "Wall") {
			if(hitEffect){
				Instantiate(hitEffect, transform.position , transform.rotation);
			}
			Destroy (gameObject);
			
		}
	}

}