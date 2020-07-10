using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GateTrigger : MonoBehaviour
{
    public GameObject eventCamera;
    public GameObject bossDoor;

    private void OnControllerColliderHit(ControllerColliderHit hit)
    {
        if(gameObject.GetComponent<HaveKey>().key == true && hit.gameObject.name == "GateTrigger")
        {
            eventCamera.SetActive(true);
            Destroy(hit.gameObject);
            bossDoor.transform.Rotate(new Vector3(0, 90, 0));
            bossDoor.transform.position = new Vector3(bossDoor.transform.position.x + 1.5f, bossDoor.transform.position.y, bossDoor.transform.position.z + 2f);
        }
    }
    
}
