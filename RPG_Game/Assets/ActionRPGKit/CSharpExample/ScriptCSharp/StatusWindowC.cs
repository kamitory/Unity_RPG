using UnityEngine;
using System.Collections;
[RequireComponent (typeof (StatusC))]

public class StatusWindowC : MonoBehaviour {
	
	private bool  show = false;
	public GUIStyle textStyle;
	public GUIStyle textStyle2;
	
	//Icon for Buffs
	public Texture2D braveIcon;
	public Texture2D barrierIcon;
	public Texture2D faithIcon;
	public Texture2D magicBarrierIcon;
	
	void  Update (){
		if(Input.GetKeyDown("c")){
			ShowWindow();
		}
	}
	
	void  OnGUI (){
		StatusC stat = GetComponent<StatusC>();
		if(show){
			GUI.Box ( new Rect(180,140,240,320), "Status");
			GUI.Label ( new Rect(200, 180, 100, 50), "Level" , textStyle);
			GUI.Label ( new Rect(200, 210, 100, 50), "ATK" , textStyle);
			GUI.Label ( new Rect(200, 240, 100, 50), "DEF" , textStyle);
			GUI.Label ( new Rect(200, 270, 100, 50), "MATK" , textStyle);
			GUI.Label ( new Rect(200, 300, 100, 50), "MDEF" , textStyle);
			GUI.Label ( new Rect(200, 360, 100, 50), "EXP" , textStyle);
			GUI.Label ( new Rect(200, 390, 100, 50), "Next LV" , textStyle);
			GUI.Label ( new Rect(200, 420, 120, 50), "Status Point" , textStyle);
			//Close Window Button
			if (GUI.Button ( new Rect(380,145,30,30), "X")) {
				ShowWindow();
			}
			//Status
			int lv = stat.level;
			int atk = stat.atk;
			int def = stat.def;
			int matk = stat.matk;
			int mdef = stat.mdef;
			int exp = stat.exp;
			int next = stat.maxExp - exp;
			int stPoint = stat.statusPoint;
			
			GUI.Label ( new Rect(210, 180, 100, 50), lv.ToString() , textStyle2);
			GUI.Label ( new Rect(250, 210, 100, 50), atk.ToString() , textStyle2);
			GUI.Label ( new Rect(250, 240, 100, 50), def.ToString() , textStyle2);
			GUI.Label ( new Rect(250, 270, 100, 50), matk.ToString() , textStyle2);
			GUI.Label ( new Rect(250, 300, 100, 50), mdef.ToString() , textStyle2);
			GUI.Label ( new Rect(275, 360, 100, 50), exp.ToString() , textStyle2);
			GUI.Label ( new Rect(275, 390, 100, 50), next.ToString() , textStyle2);
			GUI.Label ( new Rect(275, 420, 100, 50), stPoint.ToString() , textStyle2);
			
			if (GUI.Button ( new Rect(380,210,25,25), "+") && stPoint > 0) {
				GetComponent<StatusC>().atk += 1;
				GetComponent<StatusC>().statusPoint -= 1;
				GetComponent<StatusC>().CalculateStatus();
			}
			if (GUI.Button ( new Rect(380,240,25,25), "+") && stPoint > 0) {
				GetComponent<StatusC>().def += 1;
				GetComponent<StatusC>().maxHealth += 5;
				GetComponent<StatusC>().statusPoint -= 1;
				GetComponent<StatusC>().CalculateStatus();
			}
			if (GUI.Button ( new Rect(380,270,25,25), "+") && stPoint > 0) {
				GetComponent<StatusC>().matk += 1;
				GetComponent<StatusC>().maxMana += 3;
				GetComponent<StatusC>().statusPoint -= 1;
				GetComponent<StatusC>().CalculateStatus();
			}
			if (GUI.Button ( new Rect(380,300,25,25), "+") && stPoint > 0) {
				GetComponent<StatusC>().mdef += 1;
				GetComponent<StatusC>().statusPoint -= 1;
				GetComponent<StatusC>().CalculateStatus();
			}
		}
		
		//Show Buffs Icon
		if(stat.brave){
			GUI.DrawTexture( new Rect(30,200,60,60), braveIcon);
		}
		if(stat.barrier){
			GUI.DrawTexture( new Rect(30,260,60,60), barrierIcon);
		}
		if(stat.faith){
			GUI.DrawTexture( new Rect(30,320,60,60), faithIcon);
		}
		if(stat.mbarrier){
			GUI.DrawTexture( new Rect(30,380,60,60), magicBarrierIcon);
		}
	}
	
	void  ShowWindow (){
		//Freeze Time Scale to 0 if Status Window is Showing
		if(!show && Time.timeScale != 0.0f){
			show = true;
			Time.timeScale = 0.0f;
			Screen.lockCursor = false;
		}else if(show){
			show = false;
			Time.timeScale = 1.0f;
			Screen.lockCursor = true;
		}
	}
	

}