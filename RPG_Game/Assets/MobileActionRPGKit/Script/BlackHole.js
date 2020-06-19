#pragma strict
//var target : Transform;
var core : Transform;
var speed : float = 4.0;
var radius : float = 10.0;
var targetTag : String = "Player";
var shooterTag : String = "Enemy";

function Start () {
	if(!core){
		core = this.transform;
	}
}

function Update () {
		/*var step : float = speed * Time.deltaTime;
		var pos : Vector3 = core.position;
		pos.y = target.position.y;
		target.transform.position = Vector3.MoveTowards(target.position, pos, step);*/

		var objectsAroundMe : Collider[] = Physics.OverlapSphere(core.position , radius);
        for(var obj : Collider in objectsAroundMe){
            if(obj.CompareTag(targetTag)){
            	var step : float = speed * Time.deltaTime;
                var pos : Vector3 = core.position;
				pos.y = obj.transform.position.y;
				//obj.transform.position = Vector3.MoveTowards(obj.transform.position, pos, step);
				MoveTowardsTarget(obj.gameObject , pos);
            }
        }
        
}

function MoveTowardsTarget(obj : GameObject , target : Vector3) {
	  var charcon : CharacterController = obj.GetComponent(CharacterController);
	  var offset : Vector3 = target - obj.transform.position;
	  //offset.y = obj.transform.position.y;
	  if(offset.magnitude > 0.1) {
		   offset = offset.normalized * speed;
		   offset.y = obj.transform.position.y;
		   charcon.Move(offset * Time.deltaTime);
	  }
}