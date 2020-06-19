using UnityEngine;
using System.Collections;

public class DropItemC : MonoBehaviour {
	
	private int[] dropRate1;
	private int[] dropRate2;
	public int dropPercentMax= 100;
	[System.Serializable]
	public class ItemDr {
		public GameObject itemPrefab;
		public int dropRateMin;
		public int dropRateMax;
	}

	public ItemDr[] itemDrop = new ItemDr[3];
	
	void  Start (){
		//dropRate1 = new int[itemDrop.Length];
		//dropRate2 = new int[itemDrop.Length];
		
		int got= Random.Range(0,dropPercentMax);
		int gi= 0;
		while(gi < itemDrop.Length){
			if(got >= itemDrop[gi].dropRateMin && got <= itemDrop[gi].dropRateMax){
				Instantiate(itemDrop[gi].itemPrefab, transform.position , itemDrop[gi].itemPrefab.transform.rotation);
				gi = itemDrop.Length;
			}else{
				gi++;
			}
			
		}
		
	}
	
	void  Update (){
		
	}
}