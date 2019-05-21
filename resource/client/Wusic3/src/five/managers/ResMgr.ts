//--------------------------------------------------------------------
// 文件名:      ResMgr.ts
// 内  容:      资源管理类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
class ResMgr{
    private static instance:ResMgr = null;
    public static GetInstance():ResMgr
    {
        if(ResMgr.instance == null)
        {
            ResMgr.instance = new ResMgr();
        }

        return ResMgr.instance;
    }
    constructor(){}
    //获取3d模型资源
    public Get3DUrl(value:string):string{
        var url: string = `res/3d/${value}/${value}.lh`;
        return url;
    }
}