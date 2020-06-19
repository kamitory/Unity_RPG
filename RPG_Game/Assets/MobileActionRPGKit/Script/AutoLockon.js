#pragma strict
var radius : float = 20.0;  //this is how far it checks for other objects
var lockOnRange : float = 5.0;
private var lockTarget : Transform;
private var lockon : boolean = false;
private var target : GameObject;

var test : GameObject;

function Update () {

    if(Input.GetButton("Fire2")){
		//lockTarget = FindClosestEnemy().transform;
		FindClosestEnemy();
		if(lockTarget){
				var lookOn : Vector3 = lockTarget.position;
		     			   lookOn.y = transform.position.y;
		  				   transform.LookAt(lookOn);
		  		lockon = true;
		}
 	}
 	
 	if (Input.GetButtonUp ("Fire2")) {
		lockon = false;
 	}
 	
 	if (Input.GetKeyDown ("j")) {
		FindClosestEnemy();
		if(lockTarget){
				lookOn = lockTarget.position;
		     	lookOn.y = transform.position.y;
		  		transform.LookAt(lookOn);
		}
 	}

}

// Find the closest enemy 
function FindClosestEnemy() { 
    var checkPos : Vector3 = transform.position + transform.forward * lockOnRange;
    var closest : GameObject; 
    
    Instantiate(test , checkPos , transform.rotation);
    
    if(lockon){
    	closest = target;
    	if(!closest){
    		lockon = false;
    	}
    	//return closest;
    	lockTarget = closest.transform;
    }
    
    var distance : float = Mathf.Infinity; 
    var position : Vector3 = transform.position; 
       //var objectsAroundMe : Collider[] = Physics.OverlapSphere(transform.position, radius);
       lockTarget = null; // Reset Lock On Target
       var objectsAroundMe : Collider[] = Physics.OverlapSphere(checkPos , radius);
        for(var obj : Collider in objectsAroundMe){
            if(obj.CompareTag("Enemy")){
               var diff : Vector3 = (obj.transform.position - position); 
		       var curDistance : float = diff.sqrMagnitude; 
		       if (curDistance < distance) { 
		       //------------
		         closest = obj.gameObject; 
		         distance = curDistance;
		         target = closest;
		         lockTarget = closest.transform;
		       } 
            }
        }
    //return closest; 
    
}
