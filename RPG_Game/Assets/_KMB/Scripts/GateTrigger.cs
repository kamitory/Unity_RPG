using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GateTrigger : MonoBehaviour
{
    public GameObject eventCamera;

    private void OnControllerColliderHit(ControllerColliderHit hit)
    {
        if(gameObject.GetComponent<HaveKey>().key == true && hit.gameObject.name == "GateTrigger")
        {
            eventCamera.SetActive(true);    
        }
    }
    
}
