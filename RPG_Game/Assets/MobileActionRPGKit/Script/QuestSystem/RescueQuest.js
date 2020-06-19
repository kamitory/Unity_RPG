#pragma strict
var questId : int = 1;
var npcModel : GameObject;
var npcAnimation : AnimationClip;
var disappearEffect : GameObject;
var button : Texture2D;
private var player : GameObject;
private var enter : boolean = false;
private var clear : boolean = false;

function Update () {
		if(Input.GetKeyDown("e") && enter){
			QuestEvent();
		}

}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		player = other.gameObject;
		enter = true;
	}

}

function OnTriggerExit (other : Collider) {
	if(other.tag == "Player"){
		enter = false;
	}
}

function QuestEvent(){
		if(clear){
			return;
		}
		//Increase the progress of the Quest ID
		//The Function will automatic check If player have this quest(ID) in the Quest Slot or not.
		if(player){
			var qstat : QuestStat = player.GetComponent(QuestStat);
			if(qstat){
				player.GetComponent(QuestStat).Progress(questId);
				if(npcAnimation){
					npcModel.animation.Play(npcAnimation.name);
				}
				clear = true;
				var wait : float = npcModel.animation[npcAnimation.name].length;
				yield WaitForSeconds(wait + 0.3);
				if(disappearEffect){
					Instantiate(disappearEffect , transform.position , transform.rotation);
				}
				Destroy(gameObject);
			}
		}

}

function OnGUI(){
	if(!player){
		return;
	}
	/*if(enter && !clear){
		GUI.DrawTexture(Rect(Screen.width / 2 - 130, Screen.height - 120, 260, 80), button);
	}*/
	if(enter && !clear){
		if (GUI.Button (Rect(Screen.width / 2 - 130, Screen.height - 180, 260, 80), button)){
			QuestEvent();
		}
	}
}