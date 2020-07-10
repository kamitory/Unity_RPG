using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RocksSet : MonoBehaviour
{
    public GameObject effect;
    public GameObject eventCamera;
    public GameObject minimapCamera;
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

        if (player.GetComponent<StatusC>().level >= 5)
        {
            curTime += Time.deltaTime;

            if (setNumber == 1)
            {
                eventCamera.SetActive(true);
                minimapCamera.SetActive(false);

                player.GetComponent<CharacterMotorC>().enabled = false;
                player.GetComponent<HealthBarC>().enabled = false;
                player.GetComponent<AttackTriggerC>().enabled = false;
            }
            else if(setNumber == 8 && curTime > setTime * setNumber + 3f)
            {
                eventCamera.SetActive(false);
                minimapCamera.SetActive(true);

                player.GetComponent<CharacterMotorC>().enabled = true;
                player.GetComponent<HealthBarC>().enabled = true;
                player.GetComponent<AttackTriggerC>().enabled = true;
                gameObject.GetComponent<RocksSet>().enabled = false;
            }

            if (curTime > setTime * setNumber + 2f)
            {
                if (transform.position != rocksPosition) Instantiate(effect, rocksPosition, Quaternion.identity);
                transform.position = rocksPosition;
                if(setNumber <8) gameObject.GetComponent<RocksSet>().enabled = false;
            }
            
        }
    }
}
