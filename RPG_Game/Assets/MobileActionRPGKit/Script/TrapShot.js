#pragma strict
var trapPrefab : Transform;
var damage : int = 50;
private var wait : float = 0;
var delay : float = 1.0;

function Update () {
	if(wait >= delay){
		//Shoot
		var bulletShootout : Transform = Instantiate(trapPrefab, transform.position , transform.rotation);
		bulletShootout.GetComponent(BulletStatus).Setting(damage , damage , "Enemy" , this.gameObject);
      	wait = 0;
    }else{
    	wait += Time.deltaTime;
    }

}