#pragma strict
// The target we are following
var target : Transform;
// The distance in the x-z plane to the target
var distance : float = 10.0f;
// the height we want the camera to be above the target
var height : float = 5.0f;
// How much we 
var heightDamping : float = 2.0f;
var rotationDamping : float = 0.0f;

var zoomRate : float = 80;
var maxDistance : float = 7.9f;
var minDistance : float = 3.5f;

var maxHeight : float = 5.9f;
var minHeight : float = 1.5f;

function  Start (){
	if(!target){
		target = GameObject.FindWithTag("Player").transform;
	}
}

function  LateUpdate (){
	// Early out if we don't have a target
	if (!target)
		return;
		
	height -= (Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime) * zoomRate * Mathf.Abs(height);
    height = Mathf.Clamp(height, minHeight, maxHeight);
	
	// Calculate the current rotation angles
	var wantedRotationAngle : float = target.eulerAngles.y;
	var wantedHeight : float = target.position.y + height;
		
	var currentRotationAngle : float = transform.eulerAngles.y;
	var currentHeight : float = transform.position.y;
	
	// Damp the rotation around the y-axis
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	// Damp the height
	currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);

	// Convert the angle into a rotation
	var currentRotation : Quaternion = Quaternion.Euler (0, currentRotationAngle, 0);
	
	distance -= (Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime) * zoomRate * Mathf.Abs(distance);
    distance = Mathf.Clamp(distance, minDistance, maxDistance);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;

	transform.position = new Vector3(transform.position.x , currentHeight , transform.position.z);
	
	// Always look at the target
	transform.LookAt (target);
	
		var aRotation : Quaternion = Quaternion.Euler(0, 0, 0);
	
		var hit : RaycastHit;
        var trueTargetPosition : Vector3 = target.transform.position - new Vector3(0,-height,0);
        // Cast the line to check:
        if (Physics.Linecast (trueTargetPosition, transform.position, hit)) { 
			if(hit.transform.tag == "Wall"){
	            var tempDistance : float = Vector3.Distance (trueTargetPosition, hit.point) - 0.28f;
				var aPosition : Vector3  = target.position - (aRotation * Vector3.forward * tempDistance + new Vector3(0,-height,0));
				
	            transform.position = aPosition;
			}
        }
}

