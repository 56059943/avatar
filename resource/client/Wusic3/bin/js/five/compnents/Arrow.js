//--------------------------------------------------------------------
// 文件名:      Arrow.ts
// 内  容:      箭头提示
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月25日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var components;
    (function (components) {
        var Arrow = (function () {
            function Arrow(img, orient) {
                this.img = img;
                this.img.mouseEnabled = false;
                this.orient = orient;
                if (orient == Five.Orientation.UP) {
                    this.status = Five.Orientation.DOWN;
                    this.y_up_limit = img.y;
                    this.y_down_limit = img.y + 20;
                }
                else if (orient == Five.Orientation.DOWN) {
                    this.status = Five.Orientation.UP;
                    this.y_up_limit = img.y - 20;
                    this.y_down_limit = img.y;
                }
            }
            Arrow.prototype.pause = function () {
                Laya.timer.clear(this, this.loop);
                this.img.visible = false;
            };
            Arrow.prototype.play = function () {
                Laya.timer.clear(this, this.loop);
                Laya.timer.frameLoop(1, this, this.loop);
                this.img.visible = true;
            };
            Arrow.prototype.loop = function () {
                if (this.status == Five.Orientation.UP) {
                    this.img.y -= 1;
                    if (this.img.y < this.y_up_limit) {
                        this.img.y = this.y_up_limit;
                        this.status = Five.Orientation.DOWN;
                    }
                }
                else if (this.status == Five.Orientation.DOWN) {
                    this.img.y += 1;
                    if (this.img.y > this.y_down_limit) {
                        this.img.y = this.y_down_limit;
                        this.status = Five.Orientation.UP;
                    }
                }
            };
            return Arrow;
        }()); //end class ResUtil
        Arrow.index = 0;
        components.Arrow = Arrow;
    })(components = five.components || (five.components = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=Arrow.js.map