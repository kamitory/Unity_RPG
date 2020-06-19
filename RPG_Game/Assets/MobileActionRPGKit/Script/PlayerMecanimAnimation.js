#pragma strict
private var player : GameObject;
private var mainModel : GameObject;
var animator : Animator;
private var controller : CharacterController;

var moveHorizontalState : String = "horizontal";
var moveVerticalState : String = "vertical";
var jumpState : String = "jump";
var hurtState : String = "hurt";
private var jumping : boolean = false;
private var attacking : boolean = false;
private var flinch : boolean = false;

var joyStick : GameObject;

function Start () {
	if(!player){
		player = this.gameObject;
	}
	if(!joyStick){
		joyStick = GameObject.FindWithTag("JoyStick");
	}
	mainModel = GetComponent(AttackTrigger).mainModel;
	if(!mainModel){
		mainModel = this.gameObject;
	}
	if(!animator){
		animator = mainModel.GetComponent(Animator);
	}
	controller = player.GetComponent(CharacterController);

}

function Update () {
	//Set attacking variable = isCasting in AttackTrigger
	attacking = GetComponent(AttackTrigger).isCasting;
	flinch = GetComponent(Status).flinch;
	//Set Hurt Animation
	animator.SetBool(hurtState , flinch);

	if(attacking || flinch){
		return;
	}
	
	if ((controller.collisionFlags & CollisionFlags.Below) != 0){
		if(Input.GetButton("Horizontal") || Input.GetButton("Vertical")){
			var h : float = Input.GetAxis("Horizontal");
			var v : float = Input.GetAxis("Vertical");
		}else if(joyStick){
			h = joyStick.GetComponent(MobileJoyStick).position.x;
			v = joyStick.GetComponent(MobileJoyStick).position.y;
		}
		
		animator.SetFloat(moveHorizontalState , h);
		animator.SetFloat(moveVerticalState , v);
		if(jumping){
			jumping = false;
			animator.SetBool(jumpState , jumping);
			//animator.StopPlayback(jumpState);
		}
        
	}else{
		jumping = true;
		animator.SetBool(jumpState , jumping);
		//animator.Play(jumpState);
	}

}

function AttackAnimation(anim : String){
	animator.SetBool(jumpState , false);
	animator.Play(anim);
}

function PlayAnim(anim : String){
	animator.Play(anim);

}


function SetWeaponType(val : int , idle : String){
	animator.SetInteger("weaponType" , val);
	animator.Play(idle);
}

@script RequireComponent (AttackTrigger)
