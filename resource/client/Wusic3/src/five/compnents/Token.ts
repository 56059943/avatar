//--------------------------------------------------------------------
// 文件名:      Token.ts
// 内  容:      棋子
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
module five.components
{
    export class Token extends Laya.Sprite{

        private static s_index:number = 0;
        
        
        public img:Laya.Image;
        private imgSelected:Laya.Image;
        private imgEffect:Laya.Image;
        //数据模型
        public status:Five.TokenStatus;
        public target_index:number;
        public executor:number;
        public eat:any;
        public cannotGoHome:boolean;
        public current_index:number;
        public get index():number{
            return this.current_index;
        }
        //初始化后，不会改变
        public token_index:number;
        public get id():number{
            return this.token_index;
        }

        public player_pos:number;

        public player_index:number;
        public get sid():number{
            return this.player_index;
        }

        public isHomeOpened:boolean;//是否可以回家


        public get isWaiting():boolean{
              return this.status == Five.TokenStatus.WAITING ? true : false;
        }

        public get isLanding():boolean{
              return this.status == Five.TokenStatus.LANDING ? true : false;
        }

        private color:Five.PlayerColor;
        public setColor(value:Five.PlayerColor):void{
            this.color = value;
            this.img.skin = Five.ResUtil.getTokenSkin(value);
        }
        
        public getColor():Five.PlayerColor{
            return this.color;
        }

        public getIsPlaying():boolean{
            return this.imgSelected.visible;
        }

        //联机对战模式，非自己不显示
        public canPlayEffect:boolean;


        constructor(img:Laya.Image)
        {
           super();
           this.canPlayEffect = true;
           this.cannotGoHome = false;
           this.mouseEnabled = true;
           this.name = img.name == "" ? "Token" + Token.s_index++ : img.name;
           this.x = img.x;
           this.y = img.y;
           this.img = img;
           this.img.anchorX = this.img.anchorY= 0.5;
           this.img.width = 38;
           this.img.height = 40;
           this.img.pivot(19, 20);
           
           if (img.parent) img.parent.removeChild(img);
           img.x = img.y = 0;
        //    img.x = 0-(img.width*img.scaleX)/2;
        //    img.y = 0-(img.height*img.scaleY);
           img.mouseEnabled = true;
           img.name = this.name;
           this.addChild(img);

           this.imgSelected = new Laya.Image("game/TokenSelected.png");
           this.imgSelected.width = this.imgSelected.height = 44;
           this.imgSelected.pivotX = this.imgSelected.pivotY = 44 / 2;
           this.imgSelected.visible = false;
           this.imgSelected.mouseEnabled = false;
           this.addChildAt(this.imgSelected, 0);

           

           this.imgEffect = new Laya.Image("game/TokenSelected.png");
           this.imgEffect.width = this.imgEffect.height = 44;
           this.imgEffect.pivotX = this.imgEffect.pivotY = 44 / 2;
           this.imgEffect.visible = false;
           this.imgEffect.mouseEnabled = false;
           this.imgEffect.alpha = 0.8;
           this.addChildAt(this.imgEffect, 0);
        }

        public pause():void{
            if (!this.canPlayEffect) return;
            Laya.timer.clear(this, this.loop);
            this.imgSelected.visible = false;
            this.imgEffect.visible = false;
            this.img.mouseEnabled = false;
            this.mouseEnabled = false;
        }

        public play():void{
            if (!this.canPlayEffect) return;
            Laya.timer.clear(this, this.loop);
            Laya.timer.frameLoop(1, this, this.loop);
            this.imgSelected.visible = true;
            this.imgEffect.visible = true;
            this.img.mouseEnabled = true;
            this.mouseEnabled = true;
        }

        private loop():void{
            this.imgSelected.rotation += 1;

            this.imgEffect.rotation -= 1;
            this.imgEffect.scaleX = this.imgEffect.scaleY = this.imgEffect.scaleY + 0.03;
            this.imgEffect.alpha -= 0.02;

            if(this.imgEffect.scaleX > 1.8){
                this.imgEffect.scaleX = this.imgEffect.scaleY = 0.8;
                this.imgEffect.alpha = 0.8;
            }
        }
    
    }//end class ResUtil
}//end module