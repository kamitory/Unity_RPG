using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RocksSet : MonoBehaviour
{
    public GameObject player;
    private Vector3 rocksPosition;
    private float curTime = 0f;

    public float setTime = 0f;
    public int setNumber = 1;


    // Start is called before the first frame update
    void Start()
    {
        rocksPosition = transform.position;
        transform.position = new Vector3(0, 500, 500);
    }

    // Update is called once per frame
    void Update()
    {
        
        if(player.GetComponent<StatusC>().level >= 5 )
        {
            curTime += Time.deltaTime;

            if( curTime > setTime * setNumber + 2f)
            {
                transform.position = rocksPosition;
            }
        }
    }
}
