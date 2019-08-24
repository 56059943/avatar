class ControlView extends ui.ControlUI {

    private canRotate:boolean = false;
    private isTurnLeft:boolean = false;
    private beginRotatePos:Laya.Vector2 = new Laya.Vector2(0, 0);
    private lastRotatePos:Laya.Vector2 = new Laya.Vector2(0, 0);
    // private arr:Array<number> = [];
    constructor() {
        super();
        //监听UI鼠标点击事件
        this.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        this.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMoving);
        this.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
    }
    private onMouseDown(e:Laya.Event):void{
        //发送点击的组件名称
        this.event("btn_action",e.target.name);

        this.beginRotatePos.fromArray([e.stageX, e.stageY]);
        this.lastRotatePos.fromArray([e.stageX, e.stageY]);
        this.canRotate = true;
        this.isTurnLeft = false;
    }
    private onMouseMoving(e:Laya.Event):void{
        //发送点击的组件名称
        if (this.canRotate)
        {
            var isLeft = false;
            if (this.lastRotatePos.x > e.stageX){
                isLeft = true;
            }
            else if (this.lastRotatePos.x < e.stageX){
                isLeft = false;
            }
            this.lastRotatePos.fromArray([e.stageX, e.stageY]);

            if (this.isTurnLeft != isLeft){
                this.isTurnLeft = isLeft;
                this.beginRotatePos.x = e.stageX;
            }
            //  r = d > 0 ? 0.01 : -0.01;
           var d = this.beginRotatePos.x - e.stageX;
           //var r = (d / 360) * 2 * Math.PI;
           var r = (d / 360) * 280;
        this.event("btn_rotate", r);
        }
    }
    private onMouseUp(e:Laya.Event):void{
        //发送点击的组件名称
        // this.event("btn_rotate",e.target.name);
        this.canRotate = false;
    }
}