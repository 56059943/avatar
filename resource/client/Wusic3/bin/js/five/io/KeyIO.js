//--------------------------------------------------------------------
// 文件名:      KeyIO.ts
// 内  容:      外部输入输出管理
// 说  明:
// 创建人:      liy
// 创建日期:    2018年10月23日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var io;
    (function (io) {
        var KeyIO = (function () {
            function KeyIO() {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                // var txt = "福尔摩斯";
                // var isHanzi = Laya.RunDriver..test("");
                // var w = Laya.Browser.context.measureText(txt).width;
                // console.log("[debug] constructor", w);
            }
            KeyIO.GetInstance = function () {
                if (KeyIO.instance == null) {
                    KeyIO.instance = new KeyIO();
                }
                return KeyIO.instance;
            };
            KeyIO.prototype.onMouseDown = function (e) {
                console.log("[debug] on mouse down", e.stageX, e.stageY);
            };
            KeyIO.prototype.onMouseUp = function (e) {
                console.log("[debug] on mouse up", e.stageX, e.stageY);
            };
            KeyIO.prototype.onMouseMove = function (e) {
                console.log("[debug] on mouse move", e.stageX, e.stageY);
            };
            return KeyIO;
        }()); //end class
        KeyIO.instance = null;
        io.KeyIO = KeyIO;
    })(io = five.io || (five.io = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=KeyIO.js.map