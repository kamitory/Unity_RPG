using UnityEngine;
using System.Collections;

public class AddCashC : MonoBehaviour {
	
	public int cashMin = 10;
	public int cashMax = 50;
	public float duration = 30.0f;
	
	void  Start (){
		if(duration > 0){
			Destroy (gameObject, duration);
		}
	}
	
	void  OnTriggerEnter ( Collider other  ){
		//Pick up Item
		if (other.gameObject.tag == "Player") {
			int gotCash= Random.Range(cashMin , cashMax);
			other.GetComponent<InventoryC>().cash += gotCash;
			Destroy (gameObject);
		}
	}
	
	
	
	
	
}