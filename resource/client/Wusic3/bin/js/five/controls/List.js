var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//--------------------------------------------------------------------
// 文件名:      List.ts
// 内  容:      列表
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var controls;
    (function (controls) {
        var List = (function () {
            function List(list, isH, selectedCallback) {
                if (isH === void 0) { isH = true; }
                this.list = list;
                this.selectedCallback = selectedCallback;
                List.WID = 119;
                List.HEI = 40;
                var data = new Array();
                // while(list.numChildren > 0){
                //     var img = list.removeChildAt(0) as Laya.Image;
                //     if (img && img.skin && !Five.StringUtil.isEmpty(img.skin)){
                //         data.push(img.skin);
                //     }
                // }
                for (var i = 0; i < list.numChildren; ++i) {
                    var img = list.getChildAt(i);
                    if (img && img.skin && !Five.StringUtil.isEmpty(img.skin)) {
                        data.push(img.skin);
                    }
                }
                list.dataSource = new Array();
                list.itemRender = Item;
                if (isH) {
                    list.repeatX = data.length - 1;
                    list.repeatY = 1;
                    list.hScrollBarSkin = "";
                }
                else {
                    list.repeatX = 1;
                    list.repeatY = data.length - 1;
                    list.vScrollBarSkin = "";
                }
                list.selectEnable = true;
                list.selectHandler = new Laya.Handler(this, this.onSelect);
                list.renderHandler = new Laya.Handler(this, this.updateItem);
                list.array = data;
            }
            List.prototype.updateItem = function (cell, index) {
                cell.setImg(cell.dataSource);
            };
            List.prototype.onSelect = function (index) {
                console.log("当前选择的索引：" + index);
                if (this.selectedCallback) {
                    this.selectedCallback(index);
                }
            };
            return List;
        }()); //end class List
        List.WID = 119;
        List.HEI = 64;
        controls.List = List;
        var Item = (function (_super) {
            __extends(Item, _super);
            function Item() {
                var _this = _super.call(this) || this;
                _this.size(List.WID, List.HEI);
                _this.img = new Laya.Image();
                _this.addChild(_this.img);
                return _this;
            }
            Item.prototype.setImg = function (src) {
                this.img.skin = src;
            };
            return Item;
        }(Laya.Box));
    })(controls = five.controls || (five.controls = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=List.js.map