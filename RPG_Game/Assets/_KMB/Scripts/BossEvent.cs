using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BossEvent : MonoBehaviour
{
    public GameObject firebolt;
    private int count;
    public GameObject EventCamera;
    public AnimationClip attackAnimation;
    public AnimationClip castAnimation;
    public AnimationClip idleAnimation;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (EventCamera.activeSelf == true)
        {
            count++;
            if (count == 20 || count == 60)
            {
                GetComponent<Animation>().Play(attackAnimation.name);
            }
            else if (count == 100)
            {
                GetComponent<Animation>().Play(castAnimation.name);
            }
            else if (count == 140)
            {
                firebolt.SetActive(true);
            }
            else if (count == 250)
            {
                GetComponent<Animation>().Play(idleAnimation.name);
            }
            else if ( count== 300)
            {
                EventCamera.SetActive(false);
            }
        }
        

    }
}
