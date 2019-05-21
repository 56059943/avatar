//--------------------------------------------------------------------
// 文件名:      Arrow.ts
// 内  容:      箭头提示
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
module five.components {
    export class Arrow {

        private static index: number = 0;
        private img:Laya.Image;
        private orient: Five.Orientation;
        private status:number;
        private y_up_limit:number;
        private y_down_limit:number;

        constructor(img: Laya.Image, orient: Five.Orientation)  {
            this.img = img;
            this.img.mouseEnabled = false;
            this.orient = orient;
            
            if (orient == Five.Orientation.UP){
                this.status = Five.Orientation.DOWN;
                this.y_up_limit = img.y;
                this.y_down_limit = img.y + 20;
            }
            else if (orient == Five.Orientation.DOWN){
                this.status = Five.Orientation.UP;
                this.y_up_limit = img.y - 20;
                this.y_down_limit = img.y;
            }

        }

        public pause():void{
            Laya.timer.clear(this, this.loop);
            this.img.visible = false;
        }

        public play():void{
            Laya.timer.clear(this, this.loop);
            Laya.timer.frameLoop(1, this, this.loop);
            this.img.visible = true;
        }

        private loop():void{
            if (this.status == Five.Orientation.UP){
                this.img.y -= 1;
                if (this.img.y < this.y_up_limit){
                    this.img.y = this.y_up_limit;
                    this.status = Five.Orientation.DOWN;
                }
            }
            else if (this.status == Five.Orientation.DOWN){
                this.img.y += 1;
                if (this.img.y > this.y_down_limit){
                    this.img.y = this.y_down_limit;
                    this.status = Five.Orientation.UP;
                }
            }
        }
    }//end class ResUtil
}//end module