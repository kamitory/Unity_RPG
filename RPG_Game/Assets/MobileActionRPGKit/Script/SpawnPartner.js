#pragma strict
var mercenariesPrefab : GameObject[] = new GameObject[2];
var spawnId : int = 0;
@HideInInspector
var currentPartner : GameObject;

function Start () {
		var pos : Vector3 = transform.position;
		pos += Vector3.back * 3;
		if(mercenariesPrefab[spawnId]){
				var m : GameObject = Instantiate(mercenariesPrefab[spawnId] , pos , transform.rotation);
				m.GetComponent(AIfriend).master = this.transform;
				currentPartner = m;
		}
		
}

function MoveToMaster(){
		if(currentPartner){
			Physics.IgnoreCollision(collider, currentPartner.collider);
			currentPartner.transform.position = transform.position;
		}

}
