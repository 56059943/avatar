var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//--------------------------------------------------------------------
// 文件名:      Step.ts
// 内  容:      步数，或者叫行动值
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var components;
    (function (components) {
        var Step = (function (_super) {
            __extends(Step, _super);
            function Step(img, space, align) {
                var _this = _super.call(this) || this;
                _this.name = img.name == "" ? "Step" + Step.index++ : img.name;
                _this.mouseEnabled = false;
                _this.x = _this.y = 0;
                _this.img = img;
                _this.img_skin = Five.StringUtil.getBaseSkinName(img.skin);
                _this.img_space = space;
                _this.img_align = align;
                if (img.parent)
                    img.parent.removeChild(img);
                _this.list = new Array();
                return _this;
            }
            Step.prototype.clearAll = function () {
                while (this.numChildren > 0) {
                    this.removeChildAt(0);
                }
                this.list.splice(0);
            };
            Step.prototype.addStep = function (step) {
                var img = new Laya.Image();
                img.y = this.img.y;
                img.scaleX = this.img.scaleX;
                img.scaleY = this.img.scaleY;
                img.skin = this.img_skin + step + ".png";
                img.name = step.toString();
                if (this.img_align == Five.Align.LEFT) {
                    img.x = this.img.x + this.numChildren * (this.img.width * this.img.scaleX + this.img_space);
                }
                else if (this.img_align == Five.Align.RIGHT) {
                    img.x = this.img.x - this.numChildren * (this.img.width * this.img.scaleX + this.img_space);
                }
                this.addChild(img);
                // Five.D.d("[debug]", img.x, img.y, img.skin);
                this.list.push(step);
            };
            Step.prototype.sort = function () {
                var _this = this;
                this._childs.forEach(function (img, index, arrray) {
                    if (_this.img_align == Five.Align.LEFT) {
                        img.x = _this.img.x + index * (_this.img.width * _this.img.scaleX + _this.img_space);
                    }
                    else if (_this.img_align == Five.Align.RIGHT) {
                        img.x = _this.img.x - index * (_this.img.width * _this.img.scaleX + _this.img_space);
                    }
                });
            };
            Step.prototype.removeStep = function (step) {
                var idx = this.list.indexOf(step);
                if (idx == -1)
                    return;
                this.list.splice(idx, 1);
                this.removeChildByName(step.toString());
                this.sort();
            };
            Step.prototype.getSteps = function (maxLimited) {
                if (maxLimited === void 0) { maxLimited = 6; }
                var rt = new Array();
                this.list.forEach(function (value, index, array) {
                    if (value <= maxLimited) {
                        rt.push(value);
                    }
                });
                return rt;
            };
            Step.prototype.update = function (list) {
                var _this = this;
                this.clearAll();
                list.forEach(function (value, index, array) {
                    _this.addStep(value);
                });
            };
            return Step;
        }(Laya.Box)); //end class ResUtil
        Step.index = 0;
        components.Step = Step;
    })(components = five.components || (five.components = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=Step.js.map