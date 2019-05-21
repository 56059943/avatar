//--------------------------------------------------------------------
// 文件名:      DebugUtil.ts
// 内  容:      调试工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
module five.utils {
    export class DebugUtil {

        public static d(message?: any, ...optionalParams: any[]): void {
            // if (Five.Def.IS_DEBUG)
            console.log(message, optionalParams);
        }

        public static e(message?: any, ...optionalParams: any[]): void {
            console.log(message, optionalParams);
        }

        //调试服务器指令
        public static o(message?: any, ...optionalParams: any[]): void {
            if (Five.Def.IS_DEBUG)
            console.log(message, optionalParams);
        }


        public static printDeviceInfo(): void {
            var obj = {
                stateWidth:Laya.stage.width,
                stateHeight:Laya.stage.height,
                designWidth:Laya.stage.designWidth,
                designHeight:Laya.stage.designHeight,
                browserWidth:Laya.Browser.width,
                browserHeight:Laya.Browser.height,
                browserClientWidth:Laya.Browser.clientWidth,
                browserClientHeight:Laya.Browser.clientHeight,
            };
            console.log("[debug] debug util info. ",  obj);
            var str = JSON.stringify(obj);
            while (str.indexOf(",") != -1){
                str = str.replace(",", "\n\t");
            }
            str = "\t" + str;
            
            console.log("[debug] debug util info.\n",  str);
        }
    }//end class ResUtil
}//end module