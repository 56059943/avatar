//--------------------------------------------------------------------
// 文件名:      Dice.ts
// 内  容:      骰子
// 说  明:      骰子使用一次后会被锁定，必须执行unlock解锁，否则无法使用。此法为了方式玩家连续点击
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
module five.components
{
    export class Dice extends Laya.Sprite{

        private static index:number = 0;
        private skin:string;
        public img:Laya.Image;
        private islock:boolean;
        //是否锁上
        public get islocked():boolean{
            return this.islock;
        }
        //数据
        public sid:number;
        public step:number;
        private count:number;

        //全局设置
        public static PLAY_TIME:number = 0.5;//多长时间播放一次随机，单位秒

        constructor(img:Laya.Image)
        {
           super();
           this.img = img;
           this.mouseEnabled = true;
           this.name = img.name == "" ? "Dice" + Dice.index++ : img.name;
           this.x = img.x;
           this.y = img.y;
           this.skin = Five.StringUtil.getBaseSkinName(img.skin);
           
           if (img.parent) img.parent.removeChild(img);
           img.x = img.y = 0;
           img.mouseEnabled = true;
           img.name = this.name;
           this.addChild(img);

           this.sid = 0;
           this.step = 1;
           this.islock = true;

        }

        public playRandom(value:number, caller:any, cb:Function = undefined, argArray?: any, isDebug = false){
            //playdiceAnim   res/atlas/diceAnim.atlas
                if (this.islock) return;
                this.islock = true;
                this.step = value;
                this.img.skin = this.skin + this.step + ".png";
                this.img.visible = false;
                let Ani: Laya.Animation = new Laya.Animation();
                Ani.autoSize = true;
                Ani.pos(this.img.width / 2, this.img.height / 2);
                this.addChild(Ani);

                Ani.loadAnimation('playdiceAnim.ani', Laya.Handler.create(this, this.onload, [Ani, caller, cb, argArray]));
        }

        private onload(Ani: Laya.Animation, caller:any, cb:Function = undefined, argArray?: any){
                Ani.play(0, false);
                Ani.on(Laya.Event.COMPLETE, this, this.onCompleted, [Ani, caller, cb, argArray]);
        }

        private onCompleted(Ani: Laya.Animation, caller:any, cb:Function = undefined, argArray?: any){
                this.img.visible = true;
                this.islock = false;
                Ani.off(Laya.Event.COMPLETE, this, this.onCompleted);
                this.removeChild(Ani);
                 if (cb) {
                    cb.apply(caller, argArray);
                }
        }
        
        // public playRandom(value:number, caller:any, cb:Function = undefined, argArray?: any, isDebug = false)
        // {
        //     if (this.islock) return;
        //     this.step = value;
        //     if (this.step == undefined || this.step <= 0){
        //         Five.D.e("[error] why step is undefined or less zero.");
        //     }
        //     if (isDebug){
        //         this.img.skin = this.skin + this.step + ".png";
        //         if (cb) {
        //             cb.apply(caller, argArray);
        //         }
        //         return;
        //     }
        //     this.islock = true;
        //     var delay = 50;
        //     var t = Dice.PLAY_TIME * 1000;
        //     this.count = t / delay;
        //     Laya.timer.clear(this, this.loop);
        //     Laya.timer.loop(delay, this, this.loop, [this.step, this.skin, caller, cb, argArray]);
        // }

        private loop(step:number, skin:string, caller:any, cb:Function, argArray?: any):void{
            --this.count;
            if (this.count < 0)
            {
                this.img.skin = skin + step + ".png";
                Laya.timer.clear(this, this.loop);
                if (cb) {
                    cb.apply(caller, argArray);
                }
            }
            else
            {
                var i = Five.MathUtil.getRandomInt(1, 6);
                var s = skin + i + ".png";
                this.img.skin = s;
            }
        }

        public random(caller:any, cb:Function = undefined, argArray?: any):number
        {
            var v = Five.MathUtil.getRandomInt(1, 6);
            this.playRandom(v, caller, cb, argArray);
            return v;
        }

        public unlock():void{
            this.islock = false;;
        }

        public lock():void{
            this.islock = true;;
        }

        public set enabled(value:boolean)
        {
            this.img.mouseEnabled = value;
            this.mouseEnabled = value;
            if (value){
                this.img.skin = this.skin+this.step+".png";
            }
            else{

                // this.img.skin = this.skin+"0.png";
            }
        }

        //回合开始
        public roundStart(isSelf:boolean){
            if (isSelf){
                this.img.skin = "game/diceself.png";
            }
            else{
                this.img.skin = "game/diceother.png";
            }
        }
    }//end class ResUtil
}//end module