#pragma strict
var duration : float = 1.0;
var shooterTag : String = "Player";
var penetrate : boolean = false;
var hitEffect : GameObject;
	// Use this for initialization
function Start(){
		hitEffect = GetComponent(BulletStatus).hitEffect;
		//Set this object parent of the Shooter GameObject from BulletStatus
		this.transform.parent = GetComponent(BulletStatus).shooter.transform;
		this.transform.position = new Vector3(transform.position.x , transform.position.y ,  GetComponent(BulletStatus).shooter.transform.position.z);
		Destroy (gameObject, duration);
}
	
function OnTriggerEnter (other : Collider) {  
		if (other.gameObject.tag == "Wall") {
			if(hitEffect && !penetrate){
				Instantiate(hitEffect, transform.position , transform.rotation);
			}
			if(!penetrate){
				//Destroy this object if it not Penetrate
				Destroy (gameObject);
			}
		}
}
