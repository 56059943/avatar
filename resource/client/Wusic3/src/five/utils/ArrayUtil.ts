//--------------------------------------------------------------------
// 文件名:      ArrayUtil.ts
// 内  容:      数组
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module five.utils
{
    export class ArrayUtil{
        //清空数组
        public static clear(value:Array<any>):void{
            value.splice(0);
        }

        //字符串分割
        public static split(value:string, separator:string = "_"):Array<number>{
            var arr:string[] = value.split(separator);
            var rt:Array<number> = new Array<number>();
            arr.forEach((value:string, index:number, array:string[]) => {
                rt.push(parseInt(value)); 
            });
            return rt;
        }
        
        /**
         * 旋转
         * @param list **list会被改变
         * @param count 
         * @param isClockwise
         */
        public static turn(list, count, isClockwise):void{
            var rt = new Array<number>();
            var tmp;
            if (isClockwise){
                for (var j = 0; j < count; ++j){
                    tmp = list[0];
                    for (var i = 0; i < list.length - 1; ++i){
                        list[i] = list[i+1];
                    }
                    list[i] = tmp;
                }
            }
            else {
                for (var j = 0; j < count; ++j){
                    tmp = list[list.length - 1];
                    for (var i = list.length - 1; i > 0; --i){
                        list[i-1] = list[i];
                    }
                    list[i] = tmp;
                }
            }
        }


        /**
         * 旋转
         * @param list **list会被改变
         * @param count 
         * @param isClockwise
         * @param property
         */
        public static turnProperty(list, count, isClockwise, property):void{
            var rt = new Array<number>();
            var tmp;
            if (isClockwise){
                for (var j = 0; j < count; ++j){
                    tmp = list[0][property];
                    for (var i = 0; i < list.length - 1; ++i){
                        list[i][property] = list[i+1][property];
                    }
                    list[i][property] = tmp;
                }
            }
            else {
                for (var j = 0; j < count; ++j){
                    tmp = list[list.length - 1][property];
                    for (var i = list.length - 1; i > 0; --i){
                        list[i-1][property] = list[i][property];
                    }
                    list[i][property] = tmp;
                }
            }
        }
        
        /**
         * 去重
         * @param list 
         */
        public static duplicateRemoved(list):Array<number>{
            var rt = new Array<number>();
            list.forEach((value:number, index:number, array:number[])=>{
                if (rt.indexOf(value) == -1){
                    rt.push(value);
                }
            });
            return rt;
        }

        
        
        /**
         * 两两组合
         * 例如： 1, 2, 3, 4
         * 返回： 1+2, 1+3, 1+4, 2+3, 2+4, 3+4
         * 返回： {value:1+2, a:1, b:2}, ...
         * @param list 
         */
        public static addDoubleCombination(list):Array<any>{
            var rt = new Array<any>();
            for (var i; i < list.length - 1; ++i){
                for (var j = i; j < list.length - 1; ++j){
                    var obj = {x:list[j]+list[j+1], a:list[j], b:list[j+1]};
                    rt.push(obj);
                    // rt.push(list[j] + list[j+1]);
                }
            }
            return rt;
        }

        /**
         * 测试遍历数组过程中删除对象
         * 
         */
        private static testForEachSplice():void{
            var arr1:Array<number> = new Array<number>(1,2,3,4,5,6,7,8,9,10);
            var arr2:number[] =[1,2,3,4,5,6,7,8,9,10];

            arr1.forEach((value:number, index:number, array:number[])=>{
                if (value % 2 == 0){
                    arr1.splice(index, 1);
                } 
            });
            Five.D.d("[debug] arr1:", arr1.toString());

            arr2.forEach((value:number, index:number, array:number[])=>{
                if (value % 2 == 1){
                    arr2.splice(index, 1);
                } 
            });
            Five.D.d("[debug] arr2:", arr2.toString());
        }
    }
}