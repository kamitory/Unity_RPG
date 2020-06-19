#pragma strict
class TextDialogue{
	var textLine1 : String = "";
	var textLine2 : String = "";
	var textLine3 : String = "";
	var textLine4 : String = "";
}
var message : TextDialogue[] = new TextDialogue[1];

var button : Texture2D;
var textWindow : Texture2D;
@HideInInspector
var enter : boolean = false;
private var showGui : boolean = false;
@HideInInspector
var s : int = 0;
private var player : GameObject;

//@HideInInspector
var talkFinish : boolean = false;

var textStyle : GUIStyle;

function Update () {
		if(Input.GetKeyDown("e") && enter){
			NextPage();
		}

}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		s = 0;
		talkFinish = false;
		player = other.gameObject;
		enter = true;
	}

}

function OnTriggerExit (other : Collider) {
	if(other.tag == "Player"){
		s = 0;
		enter = false;
		CloseTalk();
	}

}

function CloseTalk(){
		showGui = false;
		Time.timeScale = 1.0;
		//Screen.lockCursor = true;
		s = 0;

}

function NextPage(){
		if(!enter){
			return;
		}
			s++;
			if(s > message.Length){
				showGui = false;
				talkFinish = true;
				CloseTalk();
			}else{
				Time.timeScale = 0.0;
				talkFinish = false;
				//Screen.lockCursor = false;
				showGui = true;
			}
}

function OnGUI(){
	if(!player){
		return;
	}
	if(enter && !showGui){
		//GUI.DrawTexture(Rect(Screen.width / 2 - 130, Screen.height - 120, 260, 80), button);
		if (GUI.Button (Rect(Screen.width / 2 - 130, Screen.height - 180, 260, 80), button)){
			NextPage();
		}
	}
	
	if(showGui && s <= message.Length){
		GUI.DrawTexture(Rect(Screen.width /2 - 308, Screen.height - 255, 615, 220), textWindow);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 220, 500, 200), message[s-1].textLine1 , textStyle);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 190, 500, 200), message[s-1].textLine2 , textStyle);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 160, 500, 200), message[s-1].textLine3 , textStyle);
		GUI.Label (Rect (Screen.width /2 - 263, Screen.height - 130, 500, 200), message[s-1].textLine4 , textStyle);
		if (GUI.Button (Rect (Screen.width /2 + 150,Screen.height - 100,140,60), "Next")) {
			NextPage();
		}
	}

}