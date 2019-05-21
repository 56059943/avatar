//--------------------------------------------------------------------
// 文件名:      CDMgr.ts
// 内  容:      冷却管理
// 说  明:
// 创建人:      liy
// 创建日期:    2018年10月23日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var managers;
    (function (managers) {
        var CDMgr = (function () {
            function CDMgr() {
                this.list = new Array();
            }
            CDMgr.GetInstance = function () {
                if (CDMgr.instance == null) {
                    CDMgr.instance = new CDMgr();
                }
                return CDMgr.instance;
            };
            CDMgr.prototype.clearAllCD = function () {
                var _this = this;
                this.stop();
                this.list.forEach(function (value, index) {
                    value.clear();
                    _this.list.splice(index, 1);
                });
            };
            /**
             * 特殊冷却
             * @param img 目标图片
             * @param seconds 冷却时间，秒
             * @param caller
             * @param finishedCallback
             */
            CDMgr.prototype.startCD = function (img, seconds, caller, finishedCallback) {
                for (var i = 0; i < this.list.length; ++i) {
                    if (this.list[i].equal(img)) {
                        this.list[i].reset(seconds, caller, finishedCallback);
                        return;
                    }
                }
                ;
                var item = new CDItem(img, seconds, caller, finishedCallback);
                this.list.push(item);
                this.start();
            };
            CDMgr.prototype.start = function () {
                this.lastFrameTime = Laya.timer.currTimer;
                Laya.timer.clearAll(this);
                Laya.timer.loop(1000 / 30, this, this.onLoop);
            };
            CDMgr.prototype.stop = function () {
                Laya.timer.clearAll(this);
            };
            CDMgr.prototype.onLoop = function () {
                var _this = this;
                var offsetTime = Laya.timer.currTimer - this.lastFrameTime;
                this.lastFrameTime = Laya.timer.currTimer;
                if (this.list.length == 0) {
                    this.stop();
                    return;
                }
                this.list.forEach(function (value, index) {
                    var rt = value.update(offsetTime);
                    if (rt > 0) {
                        _this.list.splice(index, 1);
                    }
                });
            };
            return CDMgr;
        }());
        CDMgr.instance = null;
        managers.CDMgr = CDMgr;
        var CDItem = (function () {
            function CDItem(img, seconds, caller, finishedCallback) {
                this.img = img;
                this.ms = seconds * 1000;
                this.caller = caller;
                this.finishedCallback = finishedCallback;
                this.mask = new Laya.Sprite();
                // this.mask.graphics.drawCircle(0, 0, 200, "#ff0000");
                this.mask.graphics.drawPie(0, 0, CDItem.RADIUS, -45, 270, "#ff0000");
                this.mask.pos(92 / 2, 92 / 2);
                img.mask = this.mask;
                // img.addChild(this.mask);
                this.img.visible = true;
                this.startTime = Laya.timer.currTimer;
                this.endTime = this.startTime + seconds * 1000;
            }
            CDItem.prototype.equal = function (img) {
                return this.img === img ? true : false;
            };
            CDItem.prototype.clear = function () {
                this.mask.graphics.clear();
            };
            CDItem.prototype.reset = function (seconds, caller, finishedCallback) {
                this.ms = seconds * 1000;
                this.startTime = Laya.timer.currTimer;
                this.endTime = this.startTime + this.ms;
                this.caller = caller;
                this.finishedCallback = finishedCallback;
                this.img.visible = true;
            };
            CDItem.prototype.update = function (delay) {
                this.startTime += delay;
                if (this.startTime >= this.endTime) {
                    this.mask.graphics.clear();
                    this.img.mask = undefined;
                    this.img.visible = false;
                    if (this.finishedCallback) {
                        this.finishedCallback.apply(this.caller);
                    }
                    return 1;
                }
                var p = (this.ms - (this.endTime - this.startTime)) / this.ms * 360;
                p -= 90;
                this.mask.graphics.clear();
                this.mask.graphics.drawPie(0, 0, CDItem.RADIUS, p, 270, "#ff0000");
                // console.log("[debug] cd item. p:", p);
                return 0;
            };
            return CDItem;
        }());
        CDItem.RADIUS = 100;
    })(managers = five.managers || (five.managers = {}));
})(five || (five = {}));
//# sourceMappingURL=CDMgr.js.map