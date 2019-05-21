//--------------------------------------------------------------------
// 文件名:      StringUtil.ts
// 内  容:      字符串工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var utils;
    (function (utils) {
        var StringUtil = (function () {
            function StringUtil() {
            }
            StringUtil.isEmpty = function (name) {
                if (name == null || name == undefined || name.length == 0)
                    return true;
                return false;
            };
            /**
             * 获取皮肤的名字前缀
             * @param name res/abc1.png
             * @return res/abc
             */
            StringUtil.getBaseSkinName = function (name) {
                if (StringUtil.isEmpty(name))
                    return name;
                var end = name.lastIndexOf(".") - 1;
                var rt = name.substring(0, end);
                return rt;
            };
            return StringUtil;
        }()); //end class ResUtil
        StringUtil.resArray = [];
        utils.StringUtil = StringUtil;
    })(utils = five.utils || (five.utils = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=StringUtil.js.map