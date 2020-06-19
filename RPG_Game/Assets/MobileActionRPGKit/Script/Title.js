#pragma strict
var tip : Texture2D;
var goToScene : String = "Field1";

private var page : int = 0;
//private var presave : int = 0;

private var saveSlot : int = 0;
private var charName : String = "Richea";

/*function Awake (){
		presave = PlayerPrefs.GetInt("PreviousSave");
}*/

function OnGUI () {
	if(page == 0){
	//Menu
		if (GUI.Button (Rect (Screen.width - 300,160 ,220 ,80), "Start Game")) {
			page = 2;
		}
		if (GUI.Button (Rect (Screen.width - 300,260 ,220 ,80), "Load Game")) {
			//Check for previous Save Data
			page = 3;
		}
		if (GUI.Button (Rect (Screen.width - 300,360 ,220 ,80), "How to Play")) {
			page = 1;
		}
	}
	
	if(page == 1){
		//Help
		GUI.Box (Rect (Screen.width /2 -250,85,500,430), tip);
		
		if (GUI.Button (Rect (Screen.width - 180, Screen.height -110,120 ,60), "Back")) {
			page = 0;
		}
	}
	
	if(page == 2){
		//Create Character and Select Save Slot
		GUI.Box ( new Rect(Screen.width / 2 - 250,170,500,400), "Select your slot");
			if (GUI.Button ( new Rect(Screen.width / 2 + 185,175,30,30), "X")) {
				page = 0;
			}
			//---------------Slot 1 [ID 0]------------------
			if(PlayerPrefs.GetInt("PreviousSave0") > 0){
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,205,400,100), PlayerPrefs.GetString("Name0") + "\n" + "Level " + PlayerPrefs.GetInt("PlayerLevel0").ToString())) {
					//When Slot 1 already used
					saveSlot = 0;
					page = 4;
				}
			}else{
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,205,400,100), "- Empty Slot -")) {
					//Empty Slot 1
					saveSlot = 0;
					page = 5;
				}
			}
			//---------------Slot 2 [ID 1]------------------
			if(PlayerPrefs.GetInt("PreviousSave1") > 0){
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,315,400,100), PlayerPrefs.GetString("Name1") + "\n" + "Level " + PlayerPrefs.GetInt("PlayerLevel1").ToString())) {
					//When Slot 2 already used
					saveSlot = 1;
					page = 4;
				}
			}else{
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,315,400,100), "- Empty Slot -")) {
					//Empty Slot 2
					saveSlot = 1;
					page = 5;
				}
			}
			//---------------Slot 3 [ID 2]------------------
			if(PlayerPrefs.GetInt("PreviousSave2") > 0){
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,425,400,100), PlayerPrefs.GetString("Name2") + "\n" + "Level " + PlayerPrefs.GetInt("PlayerLevel2").ToString())) {
					//When Slot 3 already used
					saveSlot = 2;
					page = 4;
				}
			}else{
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,425,400,100), "- Empty Slot -")) {
					//Empty Slot 3
					saveSlot = 2;
					page = 5;
				}
			}
	}
	
	if(page == 3){
		//Load Save Slot
		GUI.Box ( new Rect(Screen.width / 2 - 250,170,500,400), "Menu");
			if (GUI.Button ( new Rect(Screen.width / 2 + 185,175,30,30), "X")) {
				page = 0;
			}
			//---------------Slot 1 [ID 0]------------------
			if(PlayerPrefs.GetInt("PreviousSave0") > 0){
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,205,400,100), PlayerPrefs.GetString("Name0") + "\n" + "Level " + PlayerPrefs.GetInt("PlayerLevel0").ToString())) {
					//When Slot 1 already used
					saveSlot = 0;
					LoadData ();
				}
			}else{
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,205,400,100), "- Empty Slot -")) {
					//Empty Slot 1
				}
			}
			//---------------Slot 2 [ID 1]------------------
			if(PlayerPrefs.GetInt("PreviousSave1") > 0){
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,315,400,100), PlayerPrefs.GetString("Name1") + "\n" + "Level " + PlayerPrefs.GetInt("PlayerLevel1").ToString())) {
					//When Slot 2 already used
					saveSlot = 1;
					LoadData ();
				}
			}else{
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,315,400,100), "- Empty Slot -")) {
					//Empty Slot 2
				}
			}
			//---------------Slot 3 [ID 2]------------------
			if(PlayerPrefs.GetInt("PreviousSave2") > 0){
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,425,400,100), PlayerPrefs.GetString("Name2") + "\n" + "Level " + PlayerPrefs.GetInt("PlayerLevel2").ToString())) {
					//When Slot 3 already used
					saveSlot = 2;
					LoadData ();
				}
			}else{
				if (GUI.Button ( new Rect(Screen.width / 2 - 200,425,400,100), "- Empty Slot -")) {
					//Empty Slot 3
				}
			}
	
	}
	
	if(page == 4){
			//Overwrite Confirm
			GUI.Box (Rect (Screen.width /2 - 150,200,300,180), "Are you sure to overwrite this slot?");
			if (GUI.Button ( new Rect(Screen.width / 2 - 110,260,100,40), "Yes")) {
					page = 5;
			}
			if (GUI.Button ( new Rect(Screen.width / 2 +20,260,100,40), "No")) {
					page = 0;
			}
	}
	
	if(page == 5){
		GUI.Box (Rect (Screen.width /2 - 150,200,300,180), "Enter Your Name");
		charName = GUI.TextField (Rect (Screen.width / 2 - 110, 240, 220, 40), charName, 25);
		if (GUI.Button ( new Rect(Screen.width / 2 -50,300,100,40), "Done")) {
				NewGame();
		}
	}

}

function NewGame(){
		PlayerPrefs.SetInt("SaveSlot", saveSlot);
		PlayerPrefs.SetString("Name" +saveSlot.ToString(), charName);
		PlayerPrefs.SetInt("Loadgame", 0);
		Application.LoadLevel (goToScene);

}

function LoadData(){
		PlayerPrefs.SetInt("SaveSlot", saveSlot);
		//if(presave == 10){
			PlayerPrefs.SetInt("Loadgame", 10);
			Application.LoadLevel (goToScene);
		//}
}
