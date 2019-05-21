//--------------------------------------------------------------------
// 文件名:      CDMgr.ts
// 内  容:      冷却管理
// 说  明:
// 创建人:      liy
// 创建日期:    2018年10月23日
//---------------------------------------------------------------------- 
module five.managers
{
    export class CDMgr{
        private list:Array<CDItem>;
        private lastFrameTime:number;
        private static instance:CDMgr = null;
        public static GetInstance():CDMgr
        {
            if(CDMgr.instance == null)
            {
                CDMgr.instance = new CDMgr();
            }

            return CDMgr.instance;
        }
        constructor(){
            this.list = new Array<CDItem>();
        }


        public clearAllCD():void{
            this.stop();
            this.list.forEach((value, index)=>{
                value.clear();
                this.list.splice(index, 1);
            });
        }

        /**
         * 特殊冷却
         * @param img 目标图片 
         * @param seconds 冷却时间，秒
         * @param caller  
         * @param finishedCallback  
         */
        public startCD(img:Laya.Image, seconds:number, caller:any, finishedCallback?:Function):void{
            for (var i = 0; i < this.list.length; ++i){
                if (this.list[i].equal(img)){
                    this.list[i].reset(seconds, caller, finishedCallback);       
                    return;
                }
            };

            var item = new CDItem(img, seconds, caller, finishedCallback);
            this.list.push(item);
            this.start();
        }

        private start():void{
            this.lastFrameTime = Laya.timer.currTimer;
            Laya.timer.clearAll(this);
            Laya.timer.loop(1000/30, this, this.onLoop);
        }

        private stop():void{
            Laya.timer.clearAll(this);
        }
        
        private onLoop():void{
            var offsetTime = Laya.timer.currTimer - this.lastFrameTime;
            this.lastFrameTime = Laya.timer.currTimer;

            if (this.list.length == 0){
                this.stop();
                return;
            }

            this.list.forEach((value, index)=>{
                var rt = value.update(offsetTime);
                if (rt > 0){
                    this.list.splice(index, 1);
                }
            });

        }
    }

    class CDItem{
        private static RADIUS:number = 100;
        private startTime:number;
        private endTime:number;
        private ms:number;
        private img:Laya.Image;
        private mask:Laya.Sprite;
        private caller?:Function;
        private finishedCallback?:Function;

        constructor(img:Laya.Image, seconds:number, caller:any, finishedCallback:Function){
            this.img = img;
            this.ms = seconds * 1000;
            this.caller = caller;
            this.finishedCallback = finishedCallback;

            this.mask = new Laya.Sprite();
            // this.mask.graphics.drawCircle(0, 0, 200, "#ff0000");
            this.mask.graphics.drawPie(0,0,CDItem.RADIUS,-45,270,"#ff0000");
            this.mask.pos(92/2, 92/2);
            img.mask = this.mask;
            // img.addChild(this.mask);
            this.img.visible = true;

            this.startTime = Laya.timer.currTimer;
            this.endTime = this.startTime + seconds * 1000;
        }
        public equal(img:Laya.Image):boolean{
           return this.img === img ? true : false;
        }

        public clear():void{
            this.mask.graphics.clear();
        }

        public reset(seconds:number, caller:any, finishedCallback:Function):void{
            this.ms = seconds * 1000;
            this.startTime = Laya.timer.currTimer;
            this.endTime = this.startTime + this.ms;
            this.caller = caller;
            this.finishedCallback = finishedCallback;
            this.img.visible = true;
        }

        public update(delay):number{
            
            this.startTime += delay;
            if (this.startTime >= this.endTime){
                this.mask.graphics.clear();
                this.img.mask = undefined;
                this.img.visible = false;
                if (this.finishedCallback){
                    this.finishedCallback.apply(this.caller);
                }
                return 1;
            }
            var p = (this.ms - (this.endTime - this.startTime)) / this.ms * 360;
            p -= 90;

            this.mask.graphics.clear();
            this.mask.graphics.drawPie(0,0,CDItem.RADIUS,p,270,"#ff0000");

            // console.log("[debug] cd item. p:", p);
            return 0;
        }
    }
}