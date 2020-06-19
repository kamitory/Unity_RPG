#pragma strict
var player : GameObject;
var posX : float = 20.0f;
var posY : float = 20.0f;
var size : float = 120.0f;

var downTexture : Texture2D;
private var originalTexture : Texture;
private var onMobile : boolean = false;

function Start () {
	if(!player){
		player = GameObject.FindWithTag("Player");
	}
	DontDestroyOnLoad (transform.gameObject);
	originalTexture = guiTexture.texture;
	guiTexture.pixelInset = Rect (Screen.width -size - posX, -Screen.height +posY, size, size);
	this.transform.parent = null;	// Set parent to null and Reset Position for GUI Texture
	this.transform.position = Vector3(0,1,0);
	CheckPlatform();
}

function CheckPlatform(){
	if(Application.platform == RuntimePlatform.Android || Application.platform == RuntimePlatform.IPhonePlayer){
		onMobile = true;
	}else{
		onMobile = false;
	}
					
}

function Update () {
	if(!player){
		Destroy(gameObject);
	}
	
	var count : int = Input.touchCount;
       
    for(var i: int = 0;i < count; i++){
    	var touch : Touch = Input.GetTouch(i);
    	//if(guiTexture.HitTest(touch.position) && touch.phase == TouchPhase.Began){
    	if(guiTexture.HitTest(touch.position)){
        	Activate();
     	}
    }
}

function OnMouseDown () {
	if(onMobile){
		return;
	}
	//Push Attack Button
	Activate();
		
}

function Activate(){
	//Push Attack Button
	player.GetComponent(AttackTrigger).TriggerAttack();
	if(downTexture){
		guiTexture.texture = downTexture;
		yield WaitForSeconds(0.1);
		guiTexture.texture = originalTexture;
	}
}


