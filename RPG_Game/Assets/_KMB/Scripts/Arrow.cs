using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Arrow : MonoBehaviour
{
    public float arrSpeed;
    float startY;
    bool arrUp = true;
    // Start is called before the first frame update
    void Start()
    {
        startY = transform.position.y;
    }

    // Update is called once per frame
    void Update()
    {
        if (transform.position.y > startY) arrUp = false;
        else if (transform.position.y < startY - 1f) arrUp = true;



        if(arrUp) transform.position += Vector3.up * arrSpeed * Time.deltaTime;
        else transform.position += Vector3.down * arrSpeed * Time.deltaTime;
    }
}
