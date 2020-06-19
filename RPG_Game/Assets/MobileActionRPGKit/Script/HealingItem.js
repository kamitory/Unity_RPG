#pragma strict
var healHP : int = 50;
var healMP : int = 0;

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player") { 
		other.GetComponent(Status).Heal(healHP , healMP); 
		Destroy(gameObject);
	} 
}