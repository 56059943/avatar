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
        var ListExample = (function () {
            function ListExample(parent, isH, selectedCallback) {
                if (isH === void 0) { isH = true; }
                this.parent = parent;
                this.selectedCallback = selectedCallback;
                this.setup();
                this.setup2();
            }
            ListExample.prototype.setup2 = function () {
                var list = new Laya.List();
                list.itemRender = Item2;
                list.repeatX = 4;
                list.repeatY = 1;
                list.x = 0;
                list.y = (Laya.stage.height - Item.HEI * list.repeatY) / 2;
                // 使用但隐藏滚动条
                list.hScrollBarSkin = "";
                list.selectEnable = true;
                list.selectHandler = new Laya.Handler(this, this.onSelect2);
                list.renderHandler = new Laya.Handler(this, this.updateItem2);
                this.parent.addChild(list);
                // 设置数据项为对应图片的路径
                var data = [];
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                list.array = data;
            };
            ListExample.prototype.updateItem2 = function (cell, index) {
                cell.setImg(cell.dataSource);
            };
            ListExample.prototype.onSelect2 = function (index) {
                console.log("当前选择的索引：" + index);
            };
            ListExample.prototype.setup = function () {
                var list = new Laya.List();
                list.itemRender = Item;
                list.repeatX = 1;
                list.repeatY = 4;
                list.x = (Laya.stage.width - Item.WID) / 2;
                list.y = (Laya.stage.height - Item.HEI * list.repeatY) / 2;
                // 使用但隐藏滚动条
                list.vScrollBarSkin = "";
                list.selectEnable = true;
                list.selectHandler = new Laya.Handler(this, this.onSelect);
                list.renderHandler = new Laya.Handler(this, this.updateItem);
                this.parent.addChild(list);
                // 设置数据项为对应图片的路径
                var data = [];
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                data.push("common/info.png");
                list.array = data;
            };
            ListExample.prototype.updateItem = function (cell, index) {
                cell.setImg(cell.dataSource);
            };
            ListExample.prototype.onSelect = function (index) {
                console.log("当前选择的索引：" + index);
            };
            return ListExample;
        }()); //end class List
        controls.ListExample = ListExample;
        var Box = Laya.Box;
        var Image = Laya.Image;
        var Item = (function (_super) {
            __extends(Item, _super);
            function Item() {
                var _this = _super.call(this) || this;
                _this.size(Item.WID, Item.HEI);
                _this.img = new Image();
                _this.addChild(_this.img);
                return _this;
            }
            Item.prototype.setImg = function (src) {
                this.img.skin = src;
            };
            return Item;
        }(Box));
        Item.WID = 373;
        Item.HEI = 85;
        var Item2 = (function (_super) {
            __extends(Item2, _super);
            function Item2() {
                var _this = _super.call(this) || this;
                _this.size(Item2.WID, Item2.HEI);
                _this.img = new Image();
                _this.addChild(_this.img);
                return _this;
            }
            Item2.prototype.setImg = function (src) {
                this.img.skin = src;
            };
            return Item2;
        }(Box));
        Item2.WID = 119;
        Item2.HEI = 64;
    })(controls = five.controls || (five.controls = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=ListExample.js.map