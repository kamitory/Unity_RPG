#pragma strict
var target : Transform;
// The distance in the x-z plane to the target
var distance = 10.0;
// the height we want the camera to be above the target
var height = 5.0;
var side = 0.0;
// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;
private var x : float = 20.0;
var lockOn : boolean = false;

function Start(){
	if (!target){
		target = GameObject.FindWithTag("Player").transform;
	}
}


function LateUpdate () {
	// Early out if we don't have a target
	if (!target)
		return;
	
	// Calculate the current rotation angles
	var wantedRotationAngle = target.eulerAngles.y;
	var wantedHeight = target.position.y + height;
		
	var currentRotationAngle = transform.eulerAngles.y;
	var currentHeight = transform.position.y;
	
	// Damp the rotation around the y-axis
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	// Damp the height
	currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);

	// Convert the angle into a rotation
	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;

	// Set the height of the camera
	transform.position.y = currentHeight;
	transform.LookAt (target);
}