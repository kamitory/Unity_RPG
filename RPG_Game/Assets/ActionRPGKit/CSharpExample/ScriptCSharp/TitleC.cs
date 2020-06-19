using UnityEngine;
using System.Collections;

public class TitleC : MonoBehaviour {
	
	public Texture2D tip;
	public string goToScene = "Field1";
	
	private int page = 0;
	private int presave = 0;
	
	void  Awake (){
		presave = PlayerPrefs.GetInt("PreviousSave");
	}
	
	void  OnGUI (){
		if(page == 0){
			//Menu
			if (GUI.Button ( new Rect(Screen.width - 300,180 ,220 ,80), "Start Game")) {
				PlayerPrefs.SetInt("Loadgame", 0);
				Application.LoadLevel (goToScene);
			}
			if (GUI.Button ( new Rect(Screen.width - 300,300 ,220 ,80), "Load Game")) {
				//Check for previous Save Data
				print(presave);
				if(presave == 10){
					PlayerPrefs.SetInt("Loadgame", 10);
					Application.LoadLevel (goToScene);
				}
			}
			if (GUI.Button ( new Rect(Screen.width - 300,420 ,220 ,80), "How to Play")) {
				page = 1;
			}
		}
		
		if(page == 1){
			//Help
			GUI.Box ( new Rect(Screen.width /2 -250,85,500,400), tip);
			
			if (GUI.Button ( new Rect(Screen.width - 180, Screen.height -110,120 ,60), "Back")) {
				page = 0;
			}
		}
		
	}
}