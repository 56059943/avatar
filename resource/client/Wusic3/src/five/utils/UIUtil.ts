//--------------------------------------------------------------------
// 文件名:      UIUtil.ts
// 内  容:      界面工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
module five.utils {
    export class UIUtil {

        public static algin(target:Laya.Component, value : Five.Align): void {
            if (Five.Align.BOTTOM_RIGHT == value){
                target.x = Laya.stage.width - target.width;
                target.y = Laya.stage.height - target.height;
            } 
            else if (Five.Align.BOTTOM_LEFT == value){
                target.y = Laya.stage.height - target.height;
            } 
            else if (Five.Align.TOP_RIGHT == value){
                target.x = Laya.stage.width - target.width;
            } 
            else if (Five.Align.CENTER == value){
                target.x = Laya.stage.width / 2;
                target.y = Laya.stage.height / 2;
            } 
            else if (Five.Align.CENTER_RIGHT == value){
                target.x = Laya.stage.width - target.width;
                target.y = Laya.stage.height / 2;
            } 
            else if (Five.Align.RIGHT == value){
                target.x = Laya.stage.width - target.width;
            } 
            else if (Five.Align.LEFT == value){
                target.x = 0;
            } 
        }

        
        public static alginBackground(target:Laya.Component): void {
            target.width = Laya.stage.width;
            target.height = Laya.stage.height;
        }

        public static getImage(caller:any, name: string, index:number): Laya.Image  {
            return caller[name + index] as Laya.Image;
        }
        
        public static getComponent(caller:any, name: string, index:number): Laya.Component  {
            return caller[name + index] as Laya.Component;
        }

        public static drawCell(g:Laya.Graphics, x, y, r, fillColor = "#00ffff", lineWidth = 1):void{
            //路径集合，路径支持以下格式：[["moveTo",x,y],["lineTo",x,y,x,y,x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]。
            var brush = {fillStyle: fillColor};
            var pen = {strokeStyle:"#ffffff", lineWidth:lineWidth};
            var paths = [];
            var x1 = Math.abs(Math.cos(Five.MathUtil.HEXAGON_ANGLE) * r);
            var y1 = Math.abs(Math.sin(Five.MathUtil.HEXAGON_ANGLE) * r);
            paths.push(["moveTo", -r, 0]);
            paths.push(["lineTo", -x1, -y1]);
            paths.push(["lineTo", x1, -y1]);
            paths.push(["lineTo", r, 0]);
            paths.push(["lineTo", x1, y1]);
            paths.push(["lineTo", -x1, y1]);
            paths.push(["closePath"]);
            g.drawPath(x, y, paths, brush, lineWidth <= 0 ? undefined : pen);
            // console.log(paths.toString());
        }

    }//end class ResUtil
}//end module