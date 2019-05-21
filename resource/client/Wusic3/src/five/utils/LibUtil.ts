//--------------------------------------------------------------------
// 文件名:      LibUtil.ts
// 内  容:      TS实验室
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module five.utils
{
    export class LibUtil{


        /**
         * 六边形网格测试
         * @param g 
         */
        public static hexagonCellTest(g:Laya.Graphics):void{
            var fillColor = "";
            var b = {x:200, y:200};
            var r = 20;
            var x1 = Math.abs(Math.cos(Five.MathUtil.HEXAGON_ANGLE) * r);
            var h = r + x1;
            var v = x1 / Math.tan(Five.MathUtil.HEXAGON_ANGLE / 2) * 2;
            for (var i = 0; i < 10; ++i){
                for (var j = 0; j < 10; ++j){
                    if (i % 2 == 0){
                        fillColor = "#00ffff";
                         b.y = 200;
                    }
                    else{
                        fillColor = "#00aa11";
                        b.y =  200 + v / 2;
                    }
                    Five.UIUtil.drawCell(g, b.x + h*i, b.y + v*j, r, fillColor, 0);
                    // this.drawCell(b.x + h*i, b.y + v*j, r, fillColor, 0);
                }
            }
        }

        /**
         * 分析函数的call与apply方法，应该如何使用
         * 感谢网友解惑
         * https://blog.csdn.net/xllily_11/article/details/51480723
         * 
         */
        public static callAndApplyTest():void{
                var cb:Function = LibUtil.add;
                var args:Array<number> = [1, 2, 3];
                Laya.timer.once(2000, LibUtil, LibUtil.add, args);

                cb(args);
                cb.apply(this, args);
                cb.call(this, args);
                cb.apply(args);
                cb.call(args);
        }


        private static add(a, b, c):void{
            if (a + b != c){
                Five.D.d("[debug] add failed.");
            }
            else{
                Five.D.d("[debug] add success. ", a, b, c);
            }
        }


        public static everyTest():void{
            var list:Array<number> = [1, 2, 3];
            list.every((value:number, index:number, array:number[])=>{
                if (value == 2){
                    //return false will quit the iteration
                    return false;
                }
                //return true will continue
                return true;
            });
        }


        public static callbackTest(caller:any, cb:Function = undefined, argArray?: any):void{
                if (cb) {
                    cb.apply(caller, argArray);
                }
        }
    }
}