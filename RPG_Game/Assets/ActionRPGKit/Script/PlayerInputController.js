#pragma strict
private var motor : CharacterMotor;
var walkSpeed : float = 6.0;
var sprintSpeed : float = 12.0;
var canSprint : boolean = true;
private var sprint : boolean = false;
private var recover : boolean = false;
private var staminaRecover : float = 1.4;
private var useStamina : float = 0.04;

var staminaGauge : Texture2D;
var staminaBorder : Texture2D;

var maxStamina : float = 100.0;
var stamina : float = 100.0;
var jumpDelay : float = 0.1;
private var onJumping : boolean = false;
private var nextJump : float = 0.0;

class MovementSound{
		var jumpVoice : AudioClip;
		var walkingSound : AudioClip;
}
var sound : MovementSound;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	stamina = maxStamina;
}

// Update is called once per frame
function Update () {
	var stat : Status = GetComponent(Status);
	if(stat.freeze){
		motor.inputMoveDirection = Vector3(0,0,0);
		return;
	}
	if(Time.timeScale == 0.0){
        	return;
        }
        
    //Cancel Sprint
    if (sprint && Input.GetAxis("Vertical") < 0.02 || sprint && stamina <= 0 || sprint && Input.GetButtonDown("Fire1") || sprint && Input.GetKeyUp(KeyCode.LeftShift)){
		sprint = false;
		recover = true;
		motor.movement.maxForwardSpeed = walkSpeed;
		motor.movement.maxSidewaysSpeed = walkSpeed;
		StaminaRecover();
	}
	
	var controller : CharacterController = GetComponent(CharacterController);
	
	// Get the input vector from kayboard or analog stick
	var directionVector : Vector3 = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength : float = directionVector.magnitude;
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
				Dasher();
			}
			
		if(Input.GetButtonDown("Jump") && sound.jumpVoice && motor.grounded && Time.time > nextJump){
			audio.clip = sound.jumpVoice;
			audio.Play();
		}
		if(Input.GetAxis("Vertical") != 0 && sound.walkingSound && !audio.isPlaying|| Input.GetAxis("Horizontal") != 0 && sound.walkingSound && !audio.isPlaying){
			audio.clip = sound.walkingSound;
			audio.Play();
		}
	
	//Check if Player is in Midair.
	if(!motor.grounded){
		onJumping = true;
	}
	//Check if Player landed to the ground.
	if(motor.grounded && onJumping){
		onJumping = false;
		motor.inputJump = false;
		nextJump = Time.time + jumpDelay;
	}
	if (Time.time > nextJump && !onJumping) {
		motor.inputJump = Input.GetButton("Jump");
	}

}

function OnGUI () {
	if (sprint || recover){
		var staminaPercent : float = stamina * 100 / maxStamina *3;
		//GUI.DrawTexture (Rect ((Screen.width /2) -150,Screen.height - 120,stamina *3,10), staminaGauge);
		GUI.DrawTexture (Rect ((Screen.width /2) -150,Screen.height - 120, staminaPercent ,10), staminaGauge);
		GUI.DrawTexture (Rect ((Screen.width /2) -153,Screen.height - 123, 306 ,16), staminaBorder);
	}

}

function Dasher(){
 while (sprint){
	yield WaitForSeconds(useStamina);
	if(stamina > 0){
		stamina -= 1;
	}else{
		stamina = 0;
	}
 }

}

function StaminaRecover(){
	if(sprint || sprint && Input.GetKey(KeyCode.LeftShift) && stamina <= 0){
		return;
	}
		yield WaitForSeconds(staminaRecover);
		while (!sprint){
			yield WaitForSeconds(0.03);
			if(stamina < maxStamina && recover){
					stamina += 1;
			}else{
				stamina = maxStamina;
				recover = false;
		}
 }
 //---------------
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)