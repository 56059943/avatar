//--------------------------------------------------------------------
// 文件名:      RoleUtil.ts
// 内  容:      角色工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var utils;
    (function (utils) {
        var RoleUtil = (function () {
            function RoleUtil() {
            }
            //初始化主角3d模型组名字
            RoleUtil.initGroup = function (role3D) {
                role3D.getChildAt(0)._childs.forEach(function (value, index, array) {
                    var group = value._getGroup();
                    var name = value.name;
                    group = name.substr(1, 2);
                    value._setGroup(group);
                });
            };
            // 穿装备，裸模隐藏，方便还原
            RoleUtil.takeUpEquip = function (target3D, equip3D) {
                var targetGroup = equip3D.name.substr(1, 2);
                target3D.getChildAt(0)._childs.forEach(function (value, index, array) {
                    if (value._getGroup() == targetGroup) {
                        value.active = false;
                    }
                });
                equip3D.getChildAt(0)._childs.forEach(function (value, index, array) {
                    var node = Laya.SkinnedMeshSprite3D.instantiate(value);
                    node._setGroup(targetGroup);
                    target3D.getChildAt(0).addChild(node);
                });
            };
            // 脱装备，删除目标装备组，还原裸模
            RoleUtil.takeOutEquip = function (target3D, tragetGroup) {
                target3D.getChildAt(0)._childs.forEach(function (value, index, array) {
                    if (value.active && value._getGroup() == tragetGroup) {
                        value.parent.removeChild(value);
                        value.destroy();
                    }
                });
                target3D.getChildAt(0)._childs.forEach(function (value, index, array) {
                    if (value.active == false && value._getGroup() == tragetGroup) {
                        value.active = true;
                    }
                });
            };
            // 排序-y 
            RoleUtil.sortY = function (list) {
                if (list == undefined || list.length == 0)
                    return;
                var max = list[0].parent.numChildren - 1;
                var min = max - list.length;
                list.sort(function (a, b) {
                    if (a.y < b.y)
                        return -1;
                    if (a.y > b.y)
                        return 1;
                    return 0;
                });
                list.forEach(function (value, index, array) {
                    value.parent.setChildIndex(value, min + index);
                    //  Five.D.d("[debug] sort y.", value.name, value.y, min + index);
                });
            };
            // 排序-y 
            RoleUtil.sortY2D = function (list) {
                if (list == undefined || list.length == 0 || list[0].length == 0)
                    return;
                var p = list[0][0];
                var max = p.parent.numChildren - 1;
                // var ps = list.length * list[0].length;
                var ps = 0;
                var sortList = new Array();
                // p.parent.setChildIndex(p, min);
                list.forEach(function (arr, index, array) {
                    arr.forEach(function (value, index, array) {
                        sortList.push(value);
                        ++ps;
                    });
                });
                sortList.sort(function (a, b) {
                    if (a.y < b.y)
                        return -1;
                    if (a.y > b.y)
                        return 1;
                    return 0;
                });
                var min = max - ps;
                sortList.forEach(function (value, index, array) {
                    value.parent.setChildIndex(value, min + index);
                });
            };
            return RoleUtil;
        }()); //end class ResUtil
        RoleUtil.resArray = [];
        utils.RoleUtil = RoleUtil;
    })(utils = five.utils || (five.utils = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=RoleUtil.js.map