using UnityEngine;
using System.Collections;

[RequireComponent (typeof (CharacterMotorC))]

public class PlayerInputControllerC : MonoBehaviour {
	
	private CharacterMotorC motor;
	public float walkSpeed = 6.0f;
	public float sprintSpeed = 12.0f;
	public bool  canSprint = true;
	private bool  sprint = false;
	private bool  recover = false;
	private float staminaRecover = 1.4f;
	private float useStamina = 0.04f;

	public Texture2D staminaGauge;
	public Texture2D staminaBorder;
	
	public float maxStamina = 100.0f;
	public float stamina = 100.0f;
	public float jumpDelay = 0.1f;
	private bool onJumping = false;
	private float nextJump = 0.0f;

	//----------Sounds-------------
	[System.Serializable]
	public class MovementSound {
		public AudioClip jumpVoice;
		public AudioClip walkingSound;
	}
	public MovementSound sound;

	// Use this for initialization
	void  Awake (){
		motor = GetComponent<CharacterMotorC>();
		stamina = maxStamina;
	}
	
	// Update is called once per frame
	void  Update (){
		StatusC stat = GetComponent<StatusC>();
		if(stat.freeze){
			motor.inputMoveDirection = new Vector3(0,0,0);
			return;
		}
		if(Time.timeScale == 0.0f){
			return;
		}
		
		//Cancel Sprint
		if (sprint && Input.GetAxis("Vertical") < 0.02f || sprint && stamina <= 0 || sprint && Input.GetButtonDown("Fire1") || sprint && Input.GetKeyUp(KeyCode.LeftShift)){
			sprint = false;
			recover = true;
			motor.movement.maxForwardSpeed = walkSpeed;
			motor.movement.maxSidewaysSpeed = walkSpeed;
			//StaminaRecover();
			StartCoroutine(StaminaRecover());
		}
		
		CharacterController controller = GetComponent<CharacterController>();
		
		// Get the input vector from kayboard or analog stick
		Vector3 directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		
		if (directionVector != Vector3.zero) {
			// Get the length of the directon vector and then normalize it
			// Dividing by the length is cheaper than normalizing when we already have the length anyway
			float directionLength = directionVector.magnitude;
			directionVector = directionVector / directionLength;
			
			// Make sure the length is no bigger than 1
			directionLength = Mathf.Min(1, directionLength);
			
			// Make the input vector more sensitive towards the extremes and less sensitive in the middle
			// This makes it easier to control slow speeds when using analog sticks
			directionLength = directionLength * directionLength;
			
			// Multiply the normalized direction vector by the modified length
			directionVector = directionVector * directionLength;
		}
		
		// Apply the direction to the CharacterMotor
		motor.inputMoveDirection = transform.rotation * directionVector;
		
		if (sprint){
			motor.movement.maxForwardSpeed = sprintSpeed;
			motor.movement.maxSidewaysSpeed = sprintSpeed;
			return;
		}
		//Activate Sprint
		if(Input.GetKey(KeyCode.LeftShift) && Input.GetAxis("Vertical") > 0 && (controller.collisionFlags & CollisionFlags.Below) != 0 && canSprint && stamina > 0){
			sprint = true;
			//Dasher();
			StartCoroutine(Dasher());
		}
		if(Input.GetButtonDown("Jump") && sound.jumpVoice && motor.grounded && Time.time > nextJump){
			GetComponent<AudioSource>().clip = sound.jumpVoice;
			GetComponent<AudioSource>().Play();
		}
		if(Input.GetAxis("Vertical") != 0 && sound.walkingSound && !GetComponent<AudioSource>().isPlaying|| Input.GetAxis("Horizontal") != 0 && sound.walkingSound && !GetComponent<AudioSource>().isPlaying){
			GetComponent<AudioSource>().clip = sound.walkingSound;
			GetComponent<AudioSource>().Play();
		}
		
		//motor.inputJump = Input.GetButton("Jump");
		if(motor.grounded && onJumping){
			onJumping = false;
			motor.inputJump = false;
			nextJump = Time.time + jumpDelay;
		}
		if (Time.time > nextJump && !onJumping) {
			motor.inputJump = Input.GetButton("Jump");
		}
	}
	
	void  OnGUI (){
		if (sprint || recover){
			float staminaPercent = stamina * 100 / maxStamina *3;
			//GUI.DrawTexture ( new Rect((Screen.width /2) -150,Screen.height - 120,stamina *3,10), staminaGauge);
			GUI.DrawTexture ( new Rect((Screen.width /2) -150,Screen.height - 120, staminaPercent ,10), staminaGauge);
			GUI.DrawTexture ( new Rect((Screen.width /2) -153,Screen.height - 123, 306 ,16), staminaBorder);
		}
		
	}
	
	IEnumerator  Dasher (){
		while (sprint){
			yield return new WaitForSeconds(useStamina);
			if(stamina > 0){
				stamina -= 1;
			}else{
				stamina = 0;
			}
		}
		
	}
	
	IEnumerator  StaminaRecover (){
		if(!sprint || !(sprint && Input.GetKey(KeyCode.LeftShift)) && stamina > 0){
			yield return new WaitForSeconds(staminaRecover);
			while (!sprint){
				yield return new WaitForSeconds(0.03f);
				if(stamina < maxStamina && recover){
					stamina += 1;
				}else{
					stamina = maxStamina;
					recover = false;
				}
			}
		}

		//---------------
	}
	
	// Require a character controller to be attached to the same game object

}