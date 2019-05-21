//--------------------------------------------------------------------
// 文件名:      StringUtil.ts
// 内  容:      字符串工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
module five.utils {
    export class StringUtil {
        private static resArray: Array<string> = [];

        public static isEmpty(name: string): boolean {
            if (name == null || name == undefined || name.length == 0) return true;
            return false;
        }

        /**
         * 获取皮肤的名字前缀
         * @param name res/abc1.png
         * @return res/abc
         */
        public static getBaseSkinName(name: string): string {
            if (StringUtil.isEmpty(name)) return name;
            var end = name.lastIndexOf(".") - 1;
            var rt = name.substring(0, end);
            return rt;
        }

    }//end class ResUtil
}//end module