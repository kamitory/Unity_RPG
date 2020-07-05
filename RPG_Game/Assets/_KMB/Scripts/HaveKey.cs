using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HaveKey : MonoBehaviour
{
    public bool key = false;

    private void OnControllerColliderHit(ControllerColliderHit hit)
    {
        if (hit.gameObject.tag == "Key")
        {
            key = true;
            Destroy(hit.gameObject);
        }
        
    }
}
