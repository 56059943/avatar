//--------------------------------------------------------------------
// 文件名:      LibUtil.ts
// 内  容:      TS实验室
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var utils;
    (function (utils) {
        var LibUtil = (function () {
            function LibUtil() {
            }
            /**
             * 六边形网格测试
             * @param g
             */
            LibUtil.hexagonCellTest = function (g) {
                var fillColor = "";
                var b = { x: 200, y: 200 };
                var r = 20;
                var x1 = Math.abs(Math.cos(Five.MathUtil.HEXAGON_ANGLE) * r);
                var h = r + x1;
                var v = x1 / Math.tan(Five.MathUtil.HEXAGON_ANGLE / 2) * 2;
                for (var i = 0; i < 10; ++i) {
                    for (var j = 0; j < 10; ++j) {
                        if (i % 2 == 0) {
                            fillColor = "#00ffff";
                            b.y = 200;
                        }
                        else {
                            fillColor = "#00aa11";
                            b.y = 200 + v / 2;
                        }
                        Five.UIUtil.drawCell(g, b.x + h * i, b.y + v * j, r, fillColor, 0);
                    }
                }
            };
            /**
             * 分析函数的call与apply方法，应该如何使用
             * 感谢网友解惑
             * https://blog.csdn.net/xllily_11/article/details/51480723
             *
             */
            LibUtil.callAndApplyTest = function () {
                var cb = LibUtil.add;
                var args = [1, 2, 3];
                Laya.timer.once(2000, LibUtil, LibUtil.add, args);
                cb(args);
                cb.apply(this, args);
                cb.call(this, args);
                cb.apply(args);
                cb.call(args);
            };
            LibUtil.add = function (a, b, c) {
                if (a + b != c) {
                    Five.D.d("[debug] add failed.");
                }
                else {
                    Five.D.d("[debug] add success. ", a, b, c);
                }
            };
            LibUtil.everyTest = function () {
                var list = [1, 2, 3];
                list.every(function (value, index, array) {
                    if (value == 2) {
                        //return false will quit the iteration
                        return false;
                    }
                    //return true will continue
                    return true;
                });
            };
            LibUtil.callbackTest = function (caller, cb, argArray) {
                if (cb === void 0) { cb = undefined; }
                if (cb) {
                    cb.apply(caller, argArray);
                }
            };
            return LibUtil;
        }());
        utils.LibUtil = LibUtil;
    })(utils = five.utils || (five.utils = {}));
})(five || (five = {}));
//# sourceMappingURL=LibUtil.js.map