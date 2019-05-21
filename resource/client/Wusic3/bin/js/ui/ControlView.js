var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ControlView = (function (_super) {
    __extends(ControlView, _super);
    // private arr:Array<number> = [];
    function ControlView() {
        var _this = _super.call(this) || this;
        _this.canRotate = false;
        _this.beginRotatePos = new Laya.Vector2(0, 0);
        //监听UI鼠标点击事件
        _this.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseDown);
        _this.on(Laya.Event.MOUSE_MOVE, _this, _this.onMouseMoving);
        _this.on(Laya.Event.MOUSE_UP, _this, _this.onMouseUp);
        return _this;
    }
    ControlView.prototype.onMouseDown = function (e) {
        //发送点击的组件名称
        this.event("btn_action", e.target.name);
        this.beginRotatePos.x = e.stageX;
        this.beginRotatePos.y = e.stageY;
        this.canRotate = true;
    };
    ControlView.prototype.onMouseMoving = function (e) {
        //发送点击的组件名称
        if (this.canRotate) {
            var d = this.beginRotatePos.x - e.stageX;
            //var r = (d / 360) * 2 * Math.PI;
            var r = (d / 360) * 28;
            //  r = d > 0 ? 0.01 : -0.01;
            this.event("btn_rotate", r);
        }
    };
    ControlView.prototype.onMouseUp = function (e) {
        //发送点击的组件名称
        // this.event("btn_rotate",e.target.name);
        this.canRotate = false;
    };
    return ControlView;
}(ui.ControlUI));
//# sourceMappingURL=ControlView.js.map