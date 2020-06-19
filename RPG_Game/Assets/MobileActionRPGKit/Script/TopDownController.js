#pragma strict
private var motor : CharacterMotor;
private var moveDir : float = 0.0;
var joyStick : GameObject;
var walkingSound : AudioClip;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	if(!joyStick){
		joyStick = GameObject.FindWithTag("JoyStick");
	}
}

// Update is called once per frame
function Update () {
	var stat : Status = GetComponent(Status);
	if(stat.freeze || stat.flinch){
		motor.inputMoveDirection = Vector3(0,0,0);
		return;
	}
		if(Input.GetButton("Horizontal") || Input.GetButton("Vertical")){
			var moveHorizontal : float = Input.GetAxis("Horizontal");
			var moveVertical : float = Input.GetAxis("Vertical");
		}else if(joyStick){
			moveHorizontal = joyStick.GetComponent(MobileJoyStick).position.x;
			moveVertical = joyStick.GetComponent(MobileJoyStick).position.y;
		}
		
		// Get the input vector from kayboard or analog stick
		var directionVector : Vector3 = new Vector3(moveHorizontal, 0, moveVertical);
		//Vector3 directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		
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
		
		if(moveHorizontal != 0 || moveVertical != 0)
	    	transform.eulerAngles = new Vector3(transform.eulerAngles.x, Mathf.Atan2(moveHorizontal , moveVertical) * Mathf.Rad2Deg, transform.eulerAngles.z);
		//-----------------------------------------------------------------------------
		if(moveVertical != 0 && walkingSound && !audio.isPlaying|| moveHorizontal != 0 && walkingSound && !audio.isPlaying){
			audio.clip = walkingSound;
			audio.Play();
		}
		
		motor.inputMoveDirection = new Vector3(moveHorizontal , 0, moveVertical);
		motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)