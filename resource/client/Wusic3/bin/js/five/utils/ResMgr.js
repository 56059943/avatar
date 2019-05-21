//--------------------------------------------------------------------
// 文件名:      ResMgr.ts
// 内  容:      资源管理类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
var ResMgr = (function () {
    function ResMgr() {
    }
    ResMgr.GetInstance = function () {
        if (ResMgr.instance == null) {
            ResMgr.instance = new ResMgr();
        }
        return ResMgr.instance;
    };
    //获取3d模型资源
    ResMgr.prototype.Get3DUrl = function (value) {
        var url = "res/3d/" + value + "/" + value + ".lh";
        return url;
    };
    return ResMgr;
}());
ResMgr.instance = null;
//# sourceMappingURL=ResMgr.js.map