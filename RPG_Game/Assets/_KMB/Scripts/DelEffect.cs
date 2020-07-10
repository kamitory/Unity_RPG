using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DelEffect : MonoBehaviour
{
    public float delTime = 3.0f;
    private float curTime =0f;
    // Start is called before the first frame update
    void Start()
    {
        transform.rotation = Quaternion.Euler(0,90,0);
    }

    // Update is called once per frame
    void Update()
    {
        curTime += Time.deltaTime;

        if( delTime < curTime) { Destroy(gameObject); }
    }
}
