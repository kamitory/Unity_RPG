using UnityEngine;
using System.Collections;

public class ItemC : MonoBehaviour {
	
	public int itemID = 0;
	public int itemQuantity = 1;
	
	public enum ItType {
		Usable = 0,
		Equipment = 1,
	}
	
	public ItType itemType = ItType.Usable; 
	
	public float duration = 30.0f;
	
	void  Start (){
		if(duration > 0){
			Destroy (gameObject, duration);
		}
	}
	
	void  OnTriggerEnter ( Collider other  ){
		//Pick up Item
		bool full = false;
		if (other.gameObject.tag == "Player") {
			if(itemType == ItType.Usable){
				full = other.GetComponent<InventoryC>().AddItem(itemID , itemQuantity);
			}else{
				full = other.GetComponent<InventoryC>().AddEquipment(itemID);
			}
			
			if(!full){
				Destroy (gameObject);
			}  	
		}
	}
	
	
	
	
	
}