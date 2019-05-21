using UnityEngine;
using UnityEditor;
using System.Xml;

public class LayaAir3D : EditorWindow
{
    private static string version;

    enum ConfigEnum
    {
        config1 = 0,
        config2 = 1,
        config3 = 2,
        config4 = 3,
        config5 = 4
    }

    enum TargetTextureTypeEnum
    {
        jpg = 0,
        png = 1 
    }

    enum TerrainToMeshResolution
    {
        VeryHeight = 2,
        Height = 4,
        Medium = 8,
        Low = 16,
        VeryLow = 32
    }

    private static ConfigEnum configEnum;
    public static int curConfigIndex = 1;
    private static int lastConfigIndex;

    private static int FirstlevelMenu;

    private static Vector2 ScrollPosition;

    private static bool MeshSetting;
    private static bool IgnoreVerticesTangent;
    private static bool IgnoreVerticesColor;

    private static bool TextureSetting;
    private static bool ConvertTexture;
    private static bool ConvertNonPNGAndJPG;
    private static bool ConvertLightMap;
    private static bool ConvertOriginPNG;
    private static bool ConvertOriginJPG;
    private static TargetTextureTypeEnum targetTextureTypeEnum;
    private static float ConvertQuality = 50.0f;
    private static float ConvertMaxQuality = 100.0f;

    private static bool AniSetting;
    private static bool SimplifyBone;
    private static float LsaniCompressValue = 5.0f;
    private static float LsaniCompressMaxValue = 10.0f;

    private static bool TerrainSetting;
    private static bool ConvertTerrain;
    private static TerrainToMeshResolution terrainToMeshResolution;

    private static bool GameObjectSetting;
    private static bool IgnoreNullGameObject;
    private static bool IgnoreNotActiveGameObject;
    private static bool OptimizeGameObject;
    private static bool BatchMade;

    private static bool OtherSetting;
    private static bool CoverOriginalFile;
    private static bool CustomizeDirectory;
    private static string CustomizeDirectoryName = "";
    private static bool AutoSave;

    private static string SAVEPATH = "";

    private static bool OptimizeMeshName = true;
    private static float ScaleFactor = 1.0f;

    [MenuItem("LayaAir3D/LayaAir Export")]
    static void initLayaExport()
    {
        LayaAir3D layaWindow = (LayaAir3D)EditorWindow.GetWindow(typeof(LayaAir3D));
        WWW w = new WWW("file://" + Application.dataPath + "/LayaAir3D/LayaTool/layabox.png");
        GUIContent titleContent = new GUIContent(" LayaAir3D", w.texture);
        layaWindow.titleContent = titleContent;
        layaWindow.Show(true);
        readConfiguration(true);
    }

    [MenuItem("LayaAir3D/LayaAir Tool/Switch to LayaAir3D Shader")]
    static void initLayaShader()
    {
        LayaExport.DataManager.SwitchToLayaShader();
    }

    [MenuItem("LayaAir3D/LayaAir Demo")]
    static void initLayaDemo()
    {
        Application.OpenURL("https://layaair.ldc.layabox.com/demo");
    }

    [MenuItem("LayaAir3D/LayaAir Study")]
    static void initLayaStudy()
    {
        Application.OpenURL("https://ldc.layabox.com/doc");
    }

    [MenuItem("LayaAir3D/LayaAir Answsers")]
    static void initLayaAsk()
    {
        Application.OpenURL("https://ask.layabox.com");
    }

    [MenuItem("LayaAir3D/About LayaAir")]
    static void initLayaAir()
    {
        Application.OpenURL("https://www.layabox.com");
    }

    [MenuItem("LayaAir3D/Version"+" 1.7.16 beta")]
    static void initVersion()
    {
    }

    void OnGUI()
    {
        GUILayout.BeginHorizontal();
        GUILayout.Label("", GUILayout.Width(10));
        FirstlevelMenu = GUILayout.Toolbar(FirstlevelMenu, new string[] { "Scene", "Sprite3D" }, GUILayout.Height(30));
        configEnum = (ConfigEnum)EditorGUILayout.EnumPopup("", configEnum, GUILayout.Width(60));
        

        GUILayout.EndHorizontal();

        ScrollPosition = GUILayout.BeginScrollView(ScrollPosition);

        GUILayout.Box("", GUILayout.Height(3), GUILayout.ExpandWidth(true));

        //---------------------------------------MeshSetting------------------------------------------
        MeshSetting = GUILayout.Toggle(MeshSetting, " Mesh Setting");

        if (MeshSetting)
        {
            GUILayout.BeginVertical(GUILayout.ExpandWidth(true));

            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            IgnoreVerticesTangent = GUILayout.Toggle(IgnoreVerticesTangent, " Ignore Vertices Tangent");
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            IgnoreVerticesColor = GUILayout.Toggle(IgnoreVerticesColor, " Ignore Vertices Color");
            GUILayout.EndHorizontal();

            GUILayout.EndVertical();
        }
        //---------------------------------------MeshSetting------------------------------------------

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));

        //---------------------------------------TextureSetting------------------------------------------
        TextureSetting = GUILayout.Toggle(TextureSetting, " Texture Setting");

        if (TextureSetting)
        {
            if (TextureSetting)
            {
                GUILayout.BeginHorizontal();
                GUILayout.Label("", GUILayout.Width(10));
                GUILayout.Label(" Original Texture Type");
                GUILayout.EndHorizontal();
                
                GUILayout.BeginHorizontal();
                GUILayout.Label("", GUILayout.Width(30));
                ConvertNonPNGAndJPG = GUILayout.Toggle(ConvertNonPNGAndJPG, " Non-PNG|JPG");
                ConvertOriginPNG = GUILayout.Toggle(ConvertOriginPNG, " PNG");
                ConvertOriginJPG = GUILayout.Toggle(ConvertOriginJPG, " JPG");

                if (FirstlevelMenu == 0)
                {
                    ConvertLightMap = GUILayout.Toggle(ConvertLightMap, " LightMap");
                }
                GUILayout.EndHorizontal();

                GUILayout.BeginHorizontal();
                GUILayout.Label("", GUILayout.Width(10));
                GUILayout.Label(" Target Texture Type");
                GUILayout.EndHorizontal();

                GUILayout.BeginHorizontal();
                GUILayout.Label("", GUILayout.Width(30));
                targetTextureTypeEnum = (TargetTextureTypeEnum)EditorGUILayout.EnumPopup("", targetTextureTypeEnum, GUILayout.MaxWidth(60));
                if (targetTextureTypeEnum == TargetTextureTypeEnum.jpg)
                {
                    //ConvertToPNG = false;
                    GUILayout.Label("CompressQuality", GUILayout.Width(101));
                    ConvertQuality = EditorGUILayout.Slider(ConvertQuality, 0.0f, ConvertMaxQuality, GUILayout.MinWidth(100));
                }
                GUILayout.EndHorizontal();
            }
        }
        //---------------------------------------TextureSetting------------------------------------------

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));

        //---------------------------------------AnimationSetting------------------------------------------

        AniSetting = GUILayout.Toggle(AniSetting, " Animation Setting");
        if (AniSetting)
        {
            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            SimplifyBone = GUILayout.Toggle(SimplifyBone, " Optimize Bones");
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            GUILayout.Label("CompressLsani");
            LsaniCompressValue = EditorGUILayout.Slider(LsaniCompressValue, 0.0f, LsaniCompressMaxValue);
            GUILayout.EndHorizontal();
        }
        //---------------------------------------AnimationSetting------------------------------------------

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));

        //---------------------------------------TerrainSetting------------------------------------------

        TerrainSetting = GUILayout.Toggle(TerrainSetting, " Terrain Setting");
        if (TerrainSetting)
        {
            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            ConvertTerrain = GUILayout.Toggle(ConvertTerrain, " Convert Terrain To Mesh");
            GUILayout.EndHorizontal();

            if (ConvertTerrain)
            {
                GUILayout.BeginHorizontal();
                GUILayout.Label("", GUILayout.Width(30));
                terrainToMeshResolution = (TerrainToMeshResolution)EditorGUILayout.EnumPopup(" Resolution", terrainToMeshResolution);
                GUILayout.EndHorizontal();
            }
        }
        //---------------------------------------TerrainSetting------------------------------------------

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));

        //---------------------------------------GameObjectSetting------------------------------------------
        GameObjectSetting = GUILayout.Toggle(GameObjectSetting, " GameObject Setting");
        if (GameObjectSetting)
        {
            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
            IgnoreNullGameObject = GUILayout.Toggle(IgnoreNullGameObject, " Ignore Null Game Objects");
            IgnoreNotActiveGameObject = GUILayout.Toggle(IgnoreNotActiveGameObject, " Ignore Not Active Game Objects");
            OptimizeGameObject = GUILayout.Toggle(OptimizeGameObject, " Optimize Game Objects");
            if (FirstlevelMenu == 1)
            {
                BatchMade = GUILayout.Toggle(BatchMade, " Batch Make The First Level Game Objects");
            }
            GUILayout.EndVertical();
            GUILayout.EndHorizontal();
        }

        //---------------------------------------GameObjectSetting------------------------------------------

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));

        //---------------------------------------OtherSetting------------------------------------------
        OtherSetting = GUILayout.Toggle(OtherSetting, " Other Setting");
        if (OtherSetting)
        {
            GUILayout.BeginHorizontal();
            GUILayout.Label("", GUILayout.Width(15));
            GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
            CoverOriginalFile = GUILayout.Toggle(CoverOriginalFile, " Cover Original Export Files");
            GUILayout.BeginHorizontal();
            CustomizeDirectory = GUILayout.Toggle(CustomizeDirectory, " Customize Export Root Directory Name",GUILayout.Width(250));
            if (CustomizeDirectory)
                CustomizeDirectoryName = GUILayout.TextField(CustomizeDirectoryName);
            GUILayout.EndHorizontal();
            AutoSave = GUILayout.Toggle(AutoSave, " Automatically Save The Configuration");
            GUILayout.EndVertical();
            GUILayout.EndHorizontal();
        }

        //---------------------------------------OtherSetting------------------------------------------

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));
        GUILayout.EndScrollView();

        GUILayout.BeginHorizontal();
        GUILayout.Label("Save Path", GUILayout.Width(65));
        SAVEPATH = GUILayout.TextField(SAVEPATH, GUILayout.Height(21));
        if (GUILayout.Button("Browse", GUILayout.MaxWidth(100), GUILayout.Height(22)))
        {
            SAVEPATH = EditorUtility.SaveFolderPanel("LayaUnityPlugin", "Assets", "");
        }
        GUILayout.EndHorizontal();

        GUILayout.Box("", GUILayout.Height(3), GUILayout.ExpandWidth(true));

        GUILayout.BeginHorizontal();
        GUILayout.Space(2f);
        if (GUILayout.Button("Clear Config", GUILayout.Height(22)))
        {
            clearConfiguration();
        }

        if (GUILayout.Button("Revert Config", GUILayout.Height(22)))
        {
            readConfiguration(false);
        }

        if (GUILayout.Button("Save Config", GUILayout.Height(22)))
        {
            saveConfiguration();
        }
        GUILayout.EndHorizontal();
        GUILayout.Space(2f);

        GUILayout.Box("", GUILayout.Height(1), GUILayout.ExpandWidth(true));

        GUILayout.Space(2f);
        GUILayout.BeginHorizontal();
        if (GUILayout.Button("LayaAir Run", GUILayout.Height(26)))
        {
            exportResource(true);
            runLayaDemo();
        }
        if (GUILayout.Button("LayaAir Export", GUILayout.Height(26)))
        {
            exportResource(false);
        }
        if (GUILayout.Button("Help?", GUILayout.Width(45), GUILayout.Height(26)))
        {
            Application.OpenURL("https://ask.layabox.com/question/4242");
        }
        GUILayout.EndHorizontal();
        GUILayout.Space(10f);
    }

    private void Update()
    {
        version = LayaExport.DataManager.VERSION;

        if (configEnum == ConfigEnum.config1)
            curConfigIndex = 1;
        else if(configEnum == ConfigEnum.config2)
            curConfigIndex = 2;
        else if (configEnum == ConfigEnum.config3)
            curConfigIndex = 3;
        else if (configEnum == ConfigEnum.config4)
            curConfigIndex = 4;
        else if (configEnum == ConfigEnum.config5)
            curConfigIndex = 5;

        if(lastConfigIndex != curConfigIndex)
        {
            readConfiguration(false);
            lastConfigIndex = curConfigIndex;
        }
    }

    private static void exportResource(bool isDebug)
    {
        Debug.Log(" -- LayaAir3D UnityPlugin " + version + " -- ");
        //Debug.Log(Application.unityVersion);

        if (SAVEPATH != null && SAVEPATH.Length != 0 || isDebug)
        {
            if (AutoSave)
            {
                saveConfiguration();
            }

            LayaExport.DataManager.Type = FirstlevelMenu;

            LayaExport.DataManager.IgnoreTangent = IgnoreVerticesTangent;
            LayaExport.DataManager.IgnoreColor = IgnoreVerticesColor;

            LayaExport.DataManager.ConvertNonPNGAndJPG = ConvertNonPNGAndJPG;
            LayaExport.DataManager.ConvertOriginPNG = ConvertOriginPNG;
            LayaExport.DataManager.ConvertOriginJPG = ConvertOriginJPG;
            LayaExport.DataManager.ConvertLightMap = ConvertLightMap;

            if (targetTextureTypeEnum == TargetTextureTypeEnum.jpg)
            {
                LayaExport.DataManager.ConvertToPNG = false;
                LayaExport.DataManager.ConvertToJPG = true;
            }
            else
            {
                LayaExport.DataManager.ConvertToPNG = true;
                LayaExport.DataManager.ConvertToJPG = false;
            }

            LayaExport.DataManager.ConvertQuality = ConvertQuality;

            LayaExport.DataManager.SimplifyBone = SimplifyBone;

            LayaExport.DataManager.ConvertTerrainToMesh = ConvertTerrain;
            LayaExport.DataManager.TerrainToMeshResolution = (int)terrainToMeshResolution;

            LayaExport.DataManager.IgnoreNullGameObject = IgnoreNullGameObject;
            LayaExport.DataManager.IgnoreNotActiveGameObject = IgnoreNotActiveGameObject;
            LayaExport.DataManager.OptimizeGameObject = OptimizeGameObject;
            LayaExport.DataManager.BatchMade = BatchMade;

            LayaExport.DataManager.CoverOriginalFile = CoverOriginalFile;
            LayaExport.DataManager.CustomizeDirectory = CustomizeDirectory;
            LayaExport.DataManager.CustomizeDirectoryName = CustomizeDirectoryName;

            LayaExport.DataManager.OptimizeMeshName = OptimizeMeshName;
            LayaExport.DataManager.ScaleFactor = ScaleFactor;
            if (isDebug)
            {
                LayaExport.DataManager.ConvertNonPNGAndJPG = true;
                LayaExport.DataManager.ConvertLightMap = true;
                LayaExport.DataManager.ConvertToPNG = true;
                LayaExport.DataManager.ConvertToJPG = false;

                LayaExport.DataManager.SAVEPATH = Application.dataPath + "/WebPlayerTemplates/LayaDemo/res";
                LayaExport.DataManager.BatchMade = false;
            }
            else
            {
                LayaExport.DataManager.SAVEPATH = SAVEPATH;
            }

            LayaExport.DataManager.getData();
        }
        else
        {
            Debug.LogWarning("LayaUnityPlugin : Please check exporting path !");
        }
    }

    private static void clearConfiguration()
    {
        FirstlevelMenu = 0;

        MeshSetting = false;
        IgnoreVerticesTangent = false;
        IgnoreVerticesColor = false;

        TextureSetting = false;
        ConvertTexture = false;
        ConvertNonPNGAndJPG = false;
        ConvertOriginPNG = false;
        ConvertOriginJPG = false;
        ConvertLightMap = false;
        targetTextureTypeEnum = TargetTextureTypeEnum.jpg;
        ConvertQuality = 50.0f;

        AniSetting = false;
        SimplifyBone = false;
        LsaniCompressValue = 5.0f;

        TerrainSetting = false;
        ConvertTerrain = false;
        terrainToMeshResolution = TerrainToMeshResolution.Medium;

        GameObjectSetting = false;
        IgnoreNullGameObject = true;
        IgnoreNotActiveGameObject = false;
        OptimizeGameObject = false;
        BatchMade = false;

        OtherSetting = false;
        CoverOriginalFile = true;
        CustomizeDirectory = false;
        CustomizeDirectoryName = "";
        AutoSave = true;

        SAVEPATH = "";

        ScrollPosition.y = 0.0f;
    }

    private static void readConfiguration(bool readConfig)
    {

        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load("Assets/LayaAir3D/LayaTool/Configuration.xml");
        XmlNode xn = xmlDoc.SelectSingleNode("LayaExportSetting");
        XmlNodeList xnList = xn.ChildNodes;

        if (readConfig)
        {
            switch (int.Parse(xnList[0].InnerText))
            {
                case 1:
                    configEnum = ConfigEnum.config1;
                    break;
                case 2:
                    configEnum = ConfigEnum.config2;
                    break;
                case 3:
                    configEnum = ConfigEnum.config3;
                    break;
                case 4:
                    configEnum = ConfigEnum.config4;
                    break;
                case 5:
                    configEnum = ConfigEnum.config5;
                    break;
                default:
                    break;
            }
            lastConfigIndex = curConfigIndex = int.Parse(xnList[0].InnerText);
        }

        FirstlevelMenu = int.Parse(xnList[curConfigIndex].SelectSingleNode("FirstlevelMenu").InnerText);

        MeshSetting = bool.Parse(xnList[curConfigIndex].SelectSingleNode("MeshSetting").InnerText);
        IgnoreVerticesTangent = bool.Parse(xnList[curConfigIndex].SelectSingleNode("IgnoreVerticesTangent").InnerText);
        IgnoreVerticesColor = bool.Parse(xnList[curConfigIndex].SelectSingleNode("IgnoreVerticesColor").InnerText);

        TextureSetting = bool.Parse(xnList[curConfigIndex].SelectSingleNode("TextureSetting").InnerText);
        ConvertTexture = bool.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertTexture").InnerText);
        ConvertNonPNGAndJPG = bool.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertNonPNGAndJPG").InnerText);
        ConvertOriginPNG = bool.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertOriginPNG").InnerText);
        ConvertOriginJPG = bool.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertOriginJPG").InnerText);
        ConvertLightMap = bool.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertLightMap").InnerText);
        targetTextureTypeEnum = int.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertToType").InnerText) == 0 ? TargetTextureTypeEnum.jpg : TargetTextureTypeEnum.png;
        ConvertQuality = float.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertQuality").InnerText);

        AniSetting = bool.Parse(xnList[curConfigIndex].SelectSingleNode("AniSetting").InnerText);
        SimplifyBone = bool.Parse(xnList[curConfigIndex].SelectSingleNode("SimplifyBone").InnerText);
        LsaniCompressValue = float.Parse(xnList[curConfigIndex].SelectSingleNode("LsaniCompressValue").InnerText);

        TerrainSetting = bool.Parse(xnList[curConfigIndex].SelectSingleNode("TerrainSetting").InnerText);
        ConvertTerrain = bool.Parse(xnList[curConfigIndex].SelectSingleNode("ConvertTerrain").InnerText);
        switch (int.Parse(xnList[curConfigIndex].SelectSingleNode("TerrainToMeshResolution").InnerText))
        {
            case 2:
                terrainToMeshResolution = TerrainToMeshResolution.VeryHeight;
                break;
            case 4:
                terrainToMeshResolution = TerrainToMeshResolution.Height;
                break;
            case 8:
                terrainToMeshResolution = TerrainToMeshResolution.Medium;
                break;
            case 16:
                terrainToMeshResolution = TerrainToMeshResolution.Low;
                break;
            case 32:
                terrainToMeshResolution = TerrainToMeshResolution.VeryLow;
                break;
            default:
                terrainToMeshResolution = TerrainToMeshResolution.Medium;
                break;
        }

        GameObjectSetting = bool.Parse(xnList[curConfigIndex].SelectSingleNode("GameObjectSetting").InnerText);
        IgnoreNullGameObject = bool.Parse(xnList[curConfigIndex].SelectSingleNode("IgnoreNullGameObject").InnerText);
        IgnoreNotActiveGameObject = bool.Parse(xnList[curConfigIndex].SelectSingleNode("IgnoreNotActiveGameObject").InnerText);
        OptimizeGameObject = bool.Parse(xnList[curConfigIndex].SelectSingleNode("OptimizeGameObject").InnerText);
        BatchMade = bool.Parse(xnList[curConfigIndex].SelectSingleNode("BatchMade").InnerText);

        OtherSetting = bool.Parse(xnList[curConfigIndex].SelectSingleNode("OtherSetting").InnerText);
        CoverOriginalFile = bool.Parse(xnList[curConfigIndex].SelectSingleNode("CoverOriginalFile").InnerText);
        CustomizeDirectory = bool.Parse(xnList[curConfigIndex].SelectSingleNode("CustomizeDirectory").InnerText);
        CustomizeDirectoryName = xnList[curConfigIndex].SelectSingleNode("CustomizeDirectoryName").InnerText;
        AutoSave = bool.Parse(xnList[curConfigIndex].SelectSingleNode("AutoSave").InnerText);

        SAVEPATH = xnList[curConfigIndex].SelectSingleNode("SavePath").InnerText;

        ScrollPosition.y = float.Parse(xnList[curConfigIndex].SelectSingleNode("ScrollPositionY").InnerText);
    }

    private static void saveConfiguration()
    {
        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load("Assets/LayaAir3D/LayaTool/Configuration.xml");
        XmlNode xn = xmlDoc.SelectSingleNode("LayaExportSetting");
        XmlNodeList xnList = xn.ChildNodes;

        xnList[0].InnerText = curConfigIndex.ToString(); ;

        xnList[curConfigIndex].SelectSingleNode("FirstlevelMenu").InnerText = FirstlevelMenu.ToString();

        xnList[curConfigIndex].SelectSingleNode("MeshSetting").InnerText = MeshSetting.ToString();
        xnList[curConfigIndex].SelectSingleNode("IgnoreVerticesTangent").InnerText = IgnoreVerticesTangent.ToString();
        xnList[curConfigIndex].SelectSingleNode("IgnoreVerticesColor").InnerText = IgnoreVerticesColor.ToString();

        xnList[curConfigIndex].SelectSingleNode("TextureSetting").InnerText = TextureSetting.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertTexture").InnerText = ConvertTexture.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertNonPNGAndJPG").InnerText = ConvertNonPNGAndJPG.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertOriginPNG").InnerText = ConvertOriginPNG.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertOriginJPG").InnerText = ConvertOriginJPG.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertLightMap").InnerText = ConvertLightMap.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertToType").InnerText = (targetTextureTypeEnum == TargetTextureTypeEnum.jpg ? 0 : 1).ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertQuality").InnerText = ConvertQuality.ToString();

        xnList[curConfigIndex].SelectSingleNode("AniSetting").InnerText = AniSetting.ToString();
        xnList[curConfigIndex].SelectSingleNode("SimplifyBone").InnerText = SimplifyBone.ToString();
        xnList[curConfigIndex].SelectSingleNode("LsaniCompressValue").InnerText = LsaniCompressValue.ToString();

        xnList[curConfigIndex].SelectSingleNode("TerrainSetting").InnerText = TerrainSetting.ToString();
        xnList[curConfigIndex].SelectSingleNode("ConvertTerrain").InnerText = ConvertTerrain.ToString();
        if (terrainToMeshResolution == TerrainToMeshResolution.VeryHeight)
        {
            xnList[curConfigIndex].SelectSingleNode("TerrainToMeshResolution").InnerText = 2.ToString();
        }
        else if (terrainToMeshResolution == TerrainToMeshResolution.Height)
        {
            xnList[curConfigIndex].SelectSingleNode("TerrainToMeshResolution").InnerText = 4.ToString();
        }
        else if (terrainToMeshResolution == TerrainToMeshResolution.Medium)
        {
            xnList[curConfigIndex].SelectSingleNode("TerrainToMeshResolution").InnerText = 8.ToString();
        }
        else if (terrainToMeshResolution == TerrainToMeshResolution.Low)
        {
            xnList[curConfigIndex].SelectSingleNode("TerrainToMeshResolution").InnerText = 16.ToString();
        }
        else if (terrainToMeshResolution == TerrainToMeshResolution.VeryLow)
        {
            xnList[curConfigIndex].SelectSingleNode("TerrainToMeshResolution").InnerText = 32.ToString();
        }

        xnList[curConfigIndex].SelectSingleNode("GameObjectSetting").InnerText = GameObjectSetting.ToString();
        xnList[curConfigIndex].SelectSingleNode("IgnoreNullGameObject").InnerText = IgnoreNullGameObject.ToString();
        xnList[curConfigIndex].SelectSingleNode("IgnoreNotActiveGameObject").InnerText = IgnoreNotActiveGameObject.ToString();
        xnList[curConfigIndex].SelectSingleNode("OptimizeGameObject").InnerText = OptimizeGameObject.ToString();
        xnList[curConfigIndex].SelectSingleNode("BatchMade").InnerText = BatchMade.ToString();

        xnList[curConfigIndex].SelectSingleNode("OtherSetting").InnerText = OtherSetting.ToString();
        xnList[curConfigIndex].SelectSingleNode("CoverOriginalFile").InnerText = CoverOriginalFile.ToString();
        xnList[curConfigIndex].SelectSingleNode("CustomizeDirectory").InnerText = CustomizeDirectory.ToString();
        xnList[curConfigIndex].SelectSingleNode("CustomizeDirectoryName").InnerText = CustomizeDirectoryName;
        xnList[curConfigIndex].SelectSingleNode("AutoSave").InnerText = AutoSave.ToString();

        xnList[curConfigIndex].SelectSingleNode("SavePath").InnerText = SAVEPATH;

        xnList[curConfigIndex].SelectSingleNode("ScrollPositionY").InnerText = ScrollPosition.y.ToString();

        xmlDoc.Save("Assets/LayaAir3D/LayaTool/Configuration.xml");
    }

    private static void runLayaDemo()
    {
        #if UNITY_STANDALONE_OSX
            Application.OpenURL(Application.dataPath + "/WebPlayerTemplates/startServer_mac.sh"); 
        #endif

        #if UNITY_STANDALONE_WIN
            Application.OpenURL(Application.dataPath + "/WebPlayerTemplates/startServer_win.bat");
        #endif

        Application.OpenURL("http://127.0.0.1:9999");
    }
}
