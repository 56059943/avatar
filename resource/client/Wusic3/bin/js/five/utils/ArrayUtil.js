//--------------------------------------------------------------------
// 文件名:      ArrayUtil.ts
// 内  容:      数组
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var utils;
    (function (utils) {
        var ArrayUtil = (function () {
            function ArrayUtil() {
            }
            //清空数组
            ArrayUtil.clear = function (value) {
                value.splice(0);
            };
            //字符串分割
            ArrayUtil.split = function (value, separator) {
                if (separator === void 0) { separator = "_"; }
                var arr = value.split(separator);
                var rt = new Array();
                arr.forEach(function (value, index, array) {
                    rt.push(parseInt(value));
                });
                return rt;
            };
            /**
             * 旋转
             * @param list **list会被改变
             * @param count
             * @param isClockwise
             */
            ArrayUtil.turn = function (list, count, isClockwise) {
                var rt = new Array();
                var tmp;
                if (isClockwise) {
                    for (var j = 0; j < count; ++j) {
                        tmp = list[0];
                        for (var i = 0; i < list.length - 1; ++i) {
                            list[i] = list[i + 1];
                        }
                        list[i] = tmp;
                    }
                }
                else {
                    for (var j = 0; j < count; ++j) {
                        tmp = list[list.length - 1];
                        for (var i = list.length - 1; i > 0; --i) {
                            list[i - 1] = list[i];
                        }
                        list[i] = tmp;
                    }
                }
            };
            /**
             * 旋转
             * @param list **list会被改变
             * @param count
             * @param isClockwise
             * @param property
             */
            ArrayUtil.turnProperty = function (list, count, isClockwise, property) {
                var rt = new Array();
                var tmp;
                if (isClockwise) {
                    for (var j = 0; j < count; ++j) {
                        tmp = list[0][property];
                        for (var i = 0; i < list.length - 1; ++i) {
                            list[i][property] = list[i + 1][property];
                        }
                        list[i][property] = tmp;
                    }
                }
                else {
                    for (var j = 0; j < count; ++j) {
                        tmp = list[list.length - 1][property];
                        for (var i = list.length - 1; i > 0; --i) {
                            list[i - 1][property] = list[i][property];
                        }
                        list[i][property] = tmp;
                    }
                }
            };
            /**
             * 去重
             * @param list
             */
            ArrayUtil.duplicateRemoved = function (list) {
                var rt = new Array();
                list.forEach(function (value, index, array) {
                    if (rt.indexOf(value) == -1) {
                        rt.push(value);
                    }
                });
                return rt;
            };
            /**
             * 两两组合
             * 例如： 1, 2, 3, 4
             * 返回： 1+2, 1+3, 1+4, 2+3, 2+4, 3+4
             * 返回： {value:1+2, a:1, b:2}, ...
             * @param list
             */
            ArrayUtil.addDoubleCombination = function (list) {
                var rt = new Array();
                for (var i; i < list.length - 1; ++i) {
                    for (var j = i; j < list.length - 1; ++j) {
                        var obj = { x: list[j] + list[j + 1], a: list[j], b: list[j + 1] };
                        rt.push(obj);
                    }
                }
                return rt;
            };
            /**
             * 测试遍历数组过程中删除对象
             *
             */
            ArrayUtil.testForEachSplice = function () {
                var arr1 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
                var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                arr1.forEach(function (value, index, array) {
                    if (value % 2 == 0) {
                        arr1.splice(index, 1);
                    }
                });
                Five.D.d("[debug] arr1:", arr1.toString());
                arr2.forEach(function (value, index, array) {
                    if (value % 2 == 1) {
                        arr2.splice(index, 1);
                    }
                });
                Five.D.d("[debug] arr2:", arr2.toString());
            };
            return ArrayUtil;
        }());
        utils.ArrayUtil = ArrayUtil;
    })(utils = five.utils || (five.utils = {}));
})(five || (five = {}));
//# sourceMappingURL=ArrayUtil.js.map