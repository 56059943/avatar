//--------------------------------------------------------------------
// 文件名:      DebugUtil.ts
// 内  容:      调试工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var utils;
    (function (utils) {
        var DebugUtil = (function () {
            function DebugUtil() {
            }
            DebugUtil.d = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                // if (Five.Def.IS_DEBUG)
                console.log(message, optionalParams);
            };
            DebugUtil.e = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                console.log(message, optionalParams);
            };
            //调试服务器指令
            DebugUtil.o = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                if (Five.Def.IS_DEBUG)
                    console.log(message, optionalParams);
            };
            DebugUtil.printDeviceInfo = function () {
                var obj = {
                    stateWidth: Laya.stage.width,
                    stateHeight: Laya.stage.height,
                    designWidth: Laya.stage.designWidth,
                    designHeight: Laya.stage.designHeight,
                    browserWidth: Laya.Browser.width,
                    browserHeight: Laya.Browser.height,
                    browserClientWidth: Laya.Browser.clientWidth,
                    browserClientHeight: Laya.Browser.clientHeight,
                };
                console.log("[debug] debug util info. ", obj);
                var str = JSON.stringify(obj);
                while (str.indexOf(",") != -1) {
                    str = str.replace(",", "\n\t");
                }
                str = "\t" + str;
                console.log("[debug] debug util info.\n", str);
            };
            return DebugUtil;
        }()); //end class ResUtil
        utils.DebugUtil = DebugUtil;
    })(utils = five.utils || (five.utils = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=DebugUtil.js.map