#pragma strict
var attackIcon : Texture2D;
var skillIcon1 : Texture2D;
var skillIcon2 : Texture2D;
var skillIcon3 : Texture2D;

function Start () {

}

function Update () {

}

function OnGUI(){
	if (GUI.RepeatButton(Rect(Screen.width -185 ,Screen.height -180,120,120),attackIcon)){
			GetComponent(AttackTrigger).TriggerAttack();
	}
	if (GUI.RepeatButton(Rect(Screen.width -250 ,Screen.height -265,80,80),skillIcon1)){
			GetComponent(AttackTrigger).TriggerSkill(0);
	}
	if (GUI.RepeatButton(Rect(Screen.width -170 ,Screen.height -265,80,80),skillIcon2)){
			GetComponent(AttackTrigger).TriggerSkill(1);
	}
	if (GUI.RepeatButton(Rect(Screen.width -90 ,Screen.height -265,80,80),skillIcon3)){
			GetComponent(AttackTrigger).TriggerSkill(2);
	}

}