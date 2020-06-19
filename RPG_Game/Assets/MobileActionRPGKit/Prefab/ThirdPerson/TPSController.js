#pragma strict
private var motor : CharacterMotor;
private var moveDir : float = 0.0;
var turnSpeed : float = 75.0;
var joyStick : GameObject;
var walkingSound : AudioClip;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	if(!joyStick){
		joyStick = GameObject.FindWithTag("JoyStick");
	}
	if(GetComponent(TopDownController)){
		GetComponent(TopDownController).enabled = false;
	}
}

// Update is called once per frame
function Update () {
	var stat : Status = GetComponent(Status);
	if(stat.freeze){
		motor.inputMoveDirection = Vector3(0,0,0);
		return;
	}
	
	if(Input.GetButton("Horizontal") || Input.GetButton("Vertical")){
		var moveHorizontal : float = Input.GetAxis("Horizontal");
		var moveVertical : float = Input.GetAxis("Vertical");
	}else{
		moveHorizontal = joyStick.GetComponent(MobileJoyStick).position.x;
		moveVertical = joyStick.GetComponent(MobileJoyStick).position.y;
	}
		
		if (moveHorizontal > 0.5) //Right
	      	transform.Rotate(Vector3.up * turnSpeed * moveHorizontal * Time.deltaTime);
	   else if (moveHorizontal < -0.5) //Left
	      	transform.Rotate(Vector3.down * turnSpeed * -moveHorizontal * Time.deltaTime);
		
		// Get the input vector from kayboard or analog stick
		//var movement = thisTransform.TransformDirection( Vector3( moveJoystick.position.x, 0, moveJoystick.position.y ) );
		var directionVector : Vector3 = new Vector3(moveHorizontal /2, 0, moveVertical);
		//var directionVector : Vector3 = new Vector3(0, 0, moveVertical);
		
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
		
		if(moveVertical != 0 && walkingSound && !audio.isPlaying|| moveHorizontal != 0 && walkingSound && !audio.isPlaying){
			audio.clip = walkingSound;
			audio.Play();
		}
		//motor.inputMoveDirection = new Vector3(moveHorizontal , 0, moveVertical);
		//motor.inputMoveDirection = new Vector3(0 , 0, moveVertical);
		motor.inputMoveDirection = transform.rotation * directionVector;
		motor.inputJump = Input.GetButton("Jump");
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)