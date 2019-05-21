//--------------------------------------------------------------------
// 文件名:      MathUtil.ts
// 内  容:      运算
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var utils;
    (function (utils) {
        var MathUtil = (function () {
            function MathUtil() {
            }
            //字符串分割
            /**范围内获取整数随机数*/
            MathUtil.getRandomInt = function (min, max) {
                var Range = max - min;
                var Rand = Math.random();
                return (min + Math.round(Rand * Range));
            };
            /**
             * 获取两点之间的距离
             * @param pt1
             * @param pt2
             */
            MathUtil.getDistance = function (pt1, pt2) {
                if (pt1 == undefined) {
                    return Number.MAX_VALUE;
                }
                return pt1.distance(pt2.x, pt2.y);
                // return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
            };
            /**
             * 约束数字
             * @param v 数字
             * @param min 最小（含）
             * @param max 最大（含）
             */
            MathUtil.between = function (v, min, max) {
                if (v < min)
                    return min;
                if (v > max)
                    return max;
                return v;
            };
            /**
             * 判断点在不在四边形内
             * @param pt
             * @param x
             * @param y
             * @param w
             * @param h
             */
            MathUtil.betweenRect = function (pt, x, y, w, h) {
                pt.x = pt.x < x ? x : pt.x;
                pt.x = pt.x > x + w ? x + w : pt.x;
                pt.y = pt.y < y ? y : pt.y;
                pt.y = pt.y > y + h ? y + h : pt.y;
                return pt;
            };
            /**
             * 获取地图转动角度
             * @param myPos
             * 棋盘固定，游戏时，自己永远显示在左下角，就需要这个旋转角度了
             */
            MathUtil.getMapRotation = function (myPos) {
                return -myPos * 90;
            };
            return MathUtil;
        }());
        //六边形每个边的弧度
        MathUtil.HEXAGON_ANGLE = 1 / 3 * Math.PI;
        utils.MathUtil = MathUtil;
    })(utils = five.utils || (five.utils = {}));
})(five || (five = {}));
//# sourceMappingURL=MathUtil.js.map