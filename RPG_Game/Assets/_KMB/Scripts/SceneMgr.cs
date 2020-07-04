using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneMgr : MonoBehaviour
{
    //씬매니저 싱글톤 만들기
    //씬매니저는 시작, 게임, 종료씬 모두를 관리해야한다
    //또한 씬매니저는 변경되도 삭제되면 안됨
    public static SceneMgr Instance;
    private void Awake()
    {
        //씬매니저가 존재하면 새로생성되는 매니져삭제하고 빠저나오기
        if (Instance)
        {
            DestroyImmediate(gameObject);
            return;
        }
        //인스턴스가 null인경우(없을때)
        Instance = this;
        DontDestroyOnLoad(gameObject);

        Instance = this;
    }
    public void loadScene(string value)
    {
        SceneManager.LoadScene(value);
    }
    public string GetSceneName()
    {
        return SceneManager.GetActiveScene().name;
    }
}
