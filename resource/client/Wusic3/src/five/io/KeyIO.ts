//--------------------------------------------------------------------
// 文件名:      KeyIO.ts
// 内  容:      外部输入输出管理
// 说  明:
// 创建人:      liy
// 创建日期:    2018年10月23日
//---------------------------------------------------------------------- 
module five.io
{
    export class KeyIO{
        private static instance:KeyIO = null;
        public static GetInstance():KeyIO
        {
            if(KeyIO.instance == null)
            {
                KeyIO.instance = new KeyIO();
            }

            return KeyIO.instance;
        }

        constructor(){
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);


            // var txt = "福尔摩斯";
            // var isHanzi = Laya.RunDriver..test("");

            // var w = Laya.Browser.context.measureText(txt).width;
            // console.log("[debug] constructor", w);

        }

        private onMouseDown(e:Laya.Event):void{
            console.log("[debug] on mouse down", e.stageX, e.stageY);
        }

        private onMouseUp(e:Laya.Event):void{
            console.log("[debug] on mouse up", e.stageX, e.stageY);
        }

        private onMouseMove(e:Laya.Event):void{
            console.log("[debug] on mouse move", e.stageX, e.stageY);
        }

    }//end class
}//end module