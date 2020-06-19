#pragma strict
var questId : int = 1;
var spawnPrefab : GameObject;
var progressAbove : int = 0;	//Will spawn your spawnPrefab if your progression of the quest greater than this.
var progressBelow : int = 9999;	//Will spawn your spawnPrefab if your progression of the quest lower than this.
private var player : GameObject;

function Start () {
		Spawn();
}

function Spawn(){
		player = GameObject.FindWithTag("Player");
		//The Function will automatic check If player have this quest(ID) in the Quest Slot or not.
		if(player){
			var qstat : QuestStat = player.GetComponent(QuestStat);
			if(qstat){
				var letSpawn : boolean = player.GetComponent(QuestStat).CheckQuestSlot(questId);
				var checkProgress : int = player.GetComponent(QuestStat).CheckQuestProgress(questId);
				
				if(letSpawn && checkProgress >= progressAbove && checkProgress < progressBelow){
					//Spawn your spawnPrefab if player have this quest in the quest slot.
					var m : GameObject = Instantiate(spawnPrefab , transform.position , transform.rotation);
					m.name = spawnPrefab.name;
				}
			}
		}
}
