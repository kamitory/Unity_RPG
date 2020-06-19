#pragma strict
var mainGate : GameObject;
var button : Texture2D;
var textWindow : Texture2D;

var message : TextDialogue;

var key : int = 0;
var keyRequire : int = 2;
var moveX : float = 0.0;
var moveY : float  = 5.0;
var moveZ : float  = 0.0;

var duration : float = 1.0;

private var move : boolean = false;
private var talking : boolean = false;
private var enter : boolean = false;
private var complete : boolean = false;
private var wait : float = 0;

var textStyle : GUIStyle;

function Update () {
	if(complete){
		return;
	}
	if(move){
		mainGate.transform.Translate(moveX*Time.deltaTime, moveY*Time.deltaTime, moveZ*Time.deltaTime);
		if(wait >= duration){
				move = false;
				complete = true;
		}else{
			wait += Time.deltaTime;
		}
	}
	
	if(Input.GetButtonDown("Fire1") && talking){
		talking = false;
		Time.timeScale = 1.0;
	}
	
	if(Input.GetKeyDown("e") && enter){
		CheckCondition();
	}
	
			
}

function CheckCondition(){
	if(talking){
		talking = false;
		Time.timeScale = 1.0;
	}else{
		if(key >= keyRequire){
			move = true;
		}else{
			talking = true;
			Time.timeScale = 0.0;
		}
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "Player") {
		enter = true;
		talking = false;
	}
}

function OnTriggerExit  (other : Collider) {
	if (other.gameObject.tag == "Player") {
		enter = false;
		talking = false;
	}
}

function OnTriggerStay (other : Collider) {
	if (other.gameObject.tag == "Player") {
		if(complete){
			return;
		}	
	}
		
}

function OnGUI(){
	if(enter && !talking && !complete){
		if (GUI.Button (Rect(Screen.width / 2 - 130, Screen.height - 180, 260, 80), button)){
			CheckCondition();
		}
	}
	
	if(talking){
		GUI.DrawTexture(Rect(Screen.width /2 - 308, Screen.height - 255, 615, 220), textWindow);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 220, 500, 200), message.textLine1 , textStyle);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 190, 500, 200), message.textLine2 , textStyle);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 160, 500, 200), message.textLine3 , textStyle);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 130, 500, 200), message.textLine4 , textStyle);
		if (GUI.Button (Rect (Screen.width /2 + 150,Screen.height - 100,140,60), "OK")) {
			talking = false;
			Time.timeScale = 1.0;
		}
	}
}