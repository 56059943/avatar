//--------------------------------------------------------------------
// 文件名:      FiveDefine.ts
// 内  容:      常量定义类，也叫非枚举定义
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
var Five;
(function (Five) {
    //示例
    // enum Students { zwq, zzz, zrt} ;
    //enum Modules {hair = 2, head = 5, body = 7, hand = 8, trousers = 13, shoes = 15};
    var Def = (function () {
        function Def() {
        }
        return Def;
    }());
    Def.IS_DEBUG = false;
    Five.Def = Def;
    var AnimatorDef = (function () {
        function AnimatorDef() {
        }
        return AnimatorDef;
    }());
    AnimatorDef.IDLE = "idle";
    AnimatorDef.WALK = "walk";
    AnimatorDef.RUN = "run";
    Five.AnimatorDef = AnimatorDef;
    var EquipDef = (function () {
        function EquipDef() {
        }
        return EquipDef;
    }());
    EquipDef.HAIR = "02";
    EquipDef.HEAD = "05";
    EquipDef.BODY = "07";
    EquipDef.HAND = "08";
    EquipDef.TROUSERS = "13";
    EquipDef.SHOES = "15";
    Five.EquipDef = EquipDef;
    var LoaderGroupDef = (function () {
        function LoaderGroupDef() {
        }
        return LoaderGroupDef;
    }());
    LoaderGroupDef.ALWAYS = "ALWAYS";
    LoaderGroupDef.TEMP = "TEMP";
    Five.LoaderGroupDef = LoaderGroupDef;
    var MsgTypeDef = (function () {
        function MsgTypeDef() {
        }
        return MsgTypeDef;
    }());
    MsgTypeDef.CLIENT_MSG = "c";
    MsgTypeDef.SERVER_MSG = "s";
    Five.MsgTypeDef = MsgTypeDef;
})(Five || (Five = {}));
//# sourceMappingURL=FiveDefine.js.map