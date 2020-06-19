#pragma strict
var startAfterTalk : boolean = false;
private var begin : boolean = false;
private var noCash : boolean = false;

private var player : GameObject;
private var enter : boolean = false;

class MercenaryInfo{
	var className : String = "";
	var mercenaryPrefab : GameObject;
	var level : int = 1;
	var atk : int = 1;
	var def : int = 1;
	var matk : int = 1;
	var mdef : int = 1;
	var hp : int = 200;
	var price : int = 500;
}
var mercenariesInfo : MercenaryInfo[] = new MercenaryInfo[9];

function Update () {
		if(Input.GetKeyDown("e") && enter && !begin && !startAfterTalk){
			begin = true;
		}
		if(startAfterTalk && enter && !begin){
			begin = GetComponent(Dialogue).talkFinish;
		}
		if(startAfterTalk && begin){
			GetComponent(Dialogue).talkFinish = false;
		}

}

function OnGUI(){
	if(begin && !noCash && player){
		GUI.Box (Rect (Screen.width /2 - 320 ,120, 680, 400), "Mercenaries List");
		if (GUI.Button (Rect (Screen.width /2 + 160 , 460, 120, 50), "Cancel")) {
			CloseWindow();
		}
		GUI.Label (Rect (Screen.width /2 - 290 , 490, 200, 30), "$ " + player.GetComponent(Inventory).cash);
		//---------------------------------------
		if (GUI.Button (Rect (Screen.width /2 - 285 , 140, 200, 90), mercenariesInfo[0].className + " : LV " + mercenariesInfo[0].level + "\n Pay :" + mercenariesInfo[0].price)) {
			GetMercenary(0);
			CloseWindow();
		}
		if (GUI.Button (Rect (Screen.width /2 - 75 , 140, 200, 90), mercenariesInfo[1].className + " : LV " + mercenariesInfo[1].level + "\n Pay :" + mercenariesInfo[1].price)) {
			GetMercenary(1);
			CloseWindow();
		}
		if (GUI.Button (Rect (Screen.width /2 + 135 , 140, 200, 90), mercenariesInfo[2].className + " : LV " + mercenariesInfo[2].level + "\n Pay :" + mercenariesInfo[2].price)) {
			GetMercenary(2);
			CloseWindow();
		}
		//----------------------
		if (GUI.Button (Rect (Screen.width /2 - 285 , 250, 200, 90), mercenariesInfo[3].className + " : LV " + mercenariesInfo[3].level + "\n Pay :" + mercenariesInfo[3].price)) {
			GetMercenary(3);
			CloseWindow();
		}
		if (GUI.Button (Rect (Screen.width /2 - 75 , 250, 200, 90), mercenariesInfo[4].className + " : LV " + mercenariesInfo[4].level + "\n Pay :" + mercenariesInfo[4].price)) {
			GetMercenary(4);
			CloseWindow();
		}
		if (GUI.Button (Rect (Screen.width /2 + 135 , 250, 200, 90), mercenariesInfo[5].className + " : LV " + mercenariesInfo[5].level + "\n Pay :" + mercenariesInfo[5].price)) {
			GetMercenary(5);
			CloseWindow();
		}
		//--------------------------
		if (GUI.Button (Rect (Screen.width /2 - 285 , 360, 200, 90), mercenariesInfo[6].className + " : LV " + mercenariesInfo[6].level + "\n Pay :" + mercenariesInfo[6].price)) {
			GetMercenary(6);
			CloseWindow();
		}
		if (GUI.Button (Rect (Screen.width /2 - 75 , 360, 200, 90), mercenariesInfo[7].className + " : LV " + mercenariesInfo[7].level + "\n Pay :" + mercenariesInfo[7].price)) {
			GetMercenary(7);
			CloseWindow();
		}
		if (GUI.Button (Rect (Screen.width /2 + 135 , 360, 200, 90), mercenariesInfo[8].className + " : LV " + mercenariesInfo[8].level + "\n Pay :" + mercenariesInfo[8].price)) {
			GetMercenary(8);
			CloseWindow();
		}
	}
	
	if(noCash){
		GUI.Box (Rect (Screen.width /2 - 125 ,220, 250, 120), "Not Enough Cash!!");
		if (GUI.Button (Rect (Screen.width /2 - 75 , 255, 150, 60), "OK")) {
			noCash = false;
		}
	}

}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		player = other.gameObject;
		enter = true;
		begin = false;
	}

}

function OnTriggerExit (other : Collider) {
	if(other.tag == "Player"){
		enter = false;
		CloseWindow();
	}

}

function CloseWindow(){
		if(startAfterTalk){
			GetComponent(Dialogue).talkFinish = false;
		}
		//enter = false;
		begin = false;
}

function GetMercenary(id : int){
	if(player.GetComponent(Inventory).cash >= mercenariesInfo[id].price){
			//Get You Mercenary.
			player.GetComponent(Inventory).cash -= mercenariesInfo[id].price;
			if(player.GetComponent(SpawnPartner)){
					//Check if you have current partner.
					if(player.GetComponent(SpawnPartner).currentPartner){
						Destroy(player.GetComponent(SpawnPartner).currentPartner);
					}
			}else{
				player.AddComponent(SpawnPartner);
			}
			if(mercenariesInfo[id].mercenaryPrefab){
				//Spawn Mercenary
				var m : GameObject = Instantiate(mercenariesInfo[id].mercenaryPrefab , player.transform.position , player.transform.rotation);
				m.GetComponent(AIfriend).master = player.transform;
				player.GetComponent(SpawnPartner).currentPartner = m;
				//Apply Mercenary's Status
				m.GetComponent(Status).level = mercenariesInfo[id].level;
				m.GetComponent(Status).atk = mercenariesInfo[id].atk;
				m.GetComponent(Status).def = mercenariesInfo[id].def;
				m.GetComponent(Status).matk = mercenariesInfo[id].matk;
				m.GetComponent(Status).mdef = mercenariesInfo[id].mdef;
				m.GetComponent(Status).maxHealth = mercenariesInfo[id].hp;
				m.GetComponent(Status).health = mercenariesInfo[id].hp;
			}else{
				print("Please Assign Mercenary Prefab");
			}
	}else{
		//When you have not enough cash to hire.
		noCash = true;
	
	}

}