//--------------------------------------------------------------------
// 文件名:      Step.ts
// 内  容:      步数，或者叫行动值
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
module five.components {
    export class Step extends Laya.Box {

        private static index: number = 0;
        private img:Laya.Image;
        private img_skin: string;
        private img_space: number;
        private img_align: number;

        //数据
        private list:Array<number>;

        constructor(img: Laya.Image, space: number, align: Five.Align)  {
            super();
            this.name = img.name == "" ? "Step" + Step.index++ : img.name;
            this.mouseEnabled = false;
            this.x = this.y = 0;
            this.img = img;
            this.img_skin = Five.StringUtil.getBaseSkinName(img.skin);
            this.img_space = space;
            this.img_align = align;
            if (img.parent) img.parent.removeChild(img);

            this.list = new Array<number>();
        }

        public clearAll():void{
            while(this.numChildren > 0)
            {
                this.removeChildAt(0);
            }
            this.list.splice(0);
        }
        public addStep(step:number):void{
            var img = new Laya.Image();
            img.y = this.img.y;
            img.scaleX = this.img.scaleX;
            img.scaleY = this.img.scaleY;
            img.skin = this.img_skin + step + ".png";
            img.name = step.toString();
            if (this.img_align == Five.Align.LEFT){
                img.x = this.img.x + this.numChildren * (this.img.width * this.img.scaleX + this.img_space);
            }
            else if (this.img_align == Five.Align.RIGHT){
                img.x = this.img.x - this.numChildren * (this.img.width * this.img.scaleX + this.img_space);
            }
            this.addChild(img);
            // Five.D.d("[debug]", img.x, img.y, img.skin);
            this.list.push(step);
        }

        public sort():void{
            this._childs.forEach((img:Laya.Image, index:number, arrray:Laya.Image[])=>{
                if (this.img_align == Five.Align.LEFT){
                    img.x = this.img.x + index * (this.img.width * this.img.scaleX + this.img_space);
                }
                else if (this.img_align == Five.Align.RIGHT){
                    img.x = this.img.x - index * (this.img.width * this.img.scaleX + this.img_space);
                }
            });
        }

        public removeStep(step):void{
            var idx = this.list.indexOf(step);
            if (idx == -1) return;
            this.list.splice(idx, 1);
            this.removeChildByName(step.toString());
            this.sort();
        }

        public getSteps(maxLimited:number = 6):Array<number>{
            var rt = new Array<number>();
            this.list.forEach((value:number, index:number, array:number[])=>{
                if (value <= maxLimited){
                    rt.push(value);
                }
            });
            return rt;
        }

        public update(list:Array<number>):void{
            this.clearAll();
            list.forEach((value:number, index:number, array:number[])=>{
                this.addStep(value);
            });
        }
    }//end class ResUtil
}//end module