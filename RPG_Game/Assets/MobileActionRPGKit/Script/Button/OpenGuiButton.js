#pragma strict
var player : GameObject;
var posX : float = 20.0f;
var posY : float = 20.0f;
var size : float = 120.0f;

var downTexture : Texture2D;
private var originalTexture : Texture;
private var onMobile : boolean = false;

enum GuiType{
		Inventory = 0,
		Skill = 1,
		Status = 2,
		Quest = 3
}
var open : GuiType = GuiType.Inventory;

enum ButtonPos{
		TopLeft = 0,
		TopMiddle = 1,
		TopRight = 2,
		BottomLeft = 3,
		BottomMiddle = 4,
		BottomRight = 5,
		MiddleLeft = 6,
		MiddleRight = 7,
		Middle = 8
}
var alignment : ButtonPos = ButtonPos.TopLeft;

function Start () {
	if(!player){
		player = GameObject.FindWithTag("Player");
	}
	DontDestroyOnLoad (transform.gameObject);
	originalTexture = guiTexture.texture;
	SetPosition();
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
    	if(guiTexture.HitTest(touch.position) && touch.phase == TouchPhase.Began){
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

function Activate () {
	//Push Button
	if(open == GuiType.Inventory){
			player.GetComponent(Inventory).OnOffMenu();
	}else if(open == GuiType.Skill){
			player.GetComponent(SkillWindow).OnOffMenu();
	}else if(open == GuiType.Status){
			player.GetComponent(StatusWindow).OnOffMenu();
	}else if(open == GuiType.Quest){
			player.GetComponent(QuestStat).OnOffMenu();
	}

	if(downTexture){
		guiTexture.texture = downTexture;
		yield WaitForSeconds(0.1);
		guiTexture.texture = originalTexture;
	}
		
}

function SetPosition(){
		//Set GUI Texture Position up to Alignment you choose.
		if(alignment == ButtonPos.TopLeft){
			//Top Left
			guiTexture.pixelInset = Rect (posX, -size -posY, size, size);
		}else if(alignment == ButtonPos.TopMiddle){
			//Top Middle
			guiTexture.pixelInset = Rect (Screen.width /2 -size /2 + posX, -size -posY, size, size);
		}else if(alignment == ButtonPos.TopRight){
			//Top Right
			guiTexture.pixelInset = Rect (Screen.width -size - posX, -size -posY, size, size);
		}else if(alignment == ButtonPos.BottomLeft){
			//Buttom Left
			guiTexture.pixelInset = Rect (posX, -Screen.height +posY, size, size);
		}else if(alignment == ButtonPos.BottomMiddle){
			//Buttom Middle
			guiTexture.pixelInset = Rect (Screen.width /2 -size /2 + posX, -Screen.height +posY, size, size);
		}else if(alignment == ButtonPos.BottomRight){
			//Buttom Right
			guiTexture.pixelInset = Rect (Screen.width -size - posX, -Screen.height +posY, size, size);
		}else if(alignment == ButtonPos.MiddleLeft){
			//Middle Left
			guiTexture.pixelInset = Rect (posX, -Screen.height /2 -posY, size, size);
		}else if(alignment == ButtonPos.MiddleRight){
			//Middle Right
			guiTexture.pixelInset = Rect (Screen.width -size - posX, -Screen.height /2 -posY, size, size);
		}else if(alignment == ButtonPos.Middle){
			//Middle
			guiTexture.pixelInset = Rect (Screen.width /2 -size /2 + posX, -Screen.height /2 -posY, size, size);
		}
		

}
