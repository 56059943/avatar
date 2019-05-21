var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//--------------------------------------------------------------------
// 文件名:      Dice.ts
// 内  容:      骰子
// 说  明:      骰子使用一次后会被锁定，必须执行unlock解锁，否则无法使用。此法为了方式玩家连续点击
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var components;
    (function (components) {
        var Dice = (function (_super) {
            __extends(Dice, _super);
            function Dice(img) {
                var _this = _super.call(this) || this;
                _this.img = img;
                _this.mouseEnabled = true;
                _this.name = img.name == "" ? "Dice" + Dice.index++ : img.name;
                _this.x = img.x;
                _this.y = img.y;
                _this.skin = Five.StringUtil.getBaseSkinName(img.skin);
                if (img.parent)
                    img.parent.removeChild(img);
                img.x = img.y = 0;
                img.mouseEnabled = true;
                img.name = _this.name;
                _this.addChild(img);
                _this.sid = 0;
                _this.step = 1;
                _this.islock = true;
                return _this;
            }
            Object.defineProperty(Dice.prototype, "islocked", {
                //是否锁上
                get: function () {
                    return this.islock;
                },
                enumerable: true,
                configurable: true
            });
            Dice.prototype.playRandom = function (value, caller, cb, argArray, isDebug) {
                if (cb === void 0) { cb = undefined; }
                if (isDebug === void 0) { isDebug = false; }
                //playdiceAnim   res/atlas/diceAnim.atlas
                if (this.islock)
                    return;
                this.islock = true;
                this.step = value;
                this.img.skin = this.skin + this.step + ".png";
                this.img.visible = false;
                var Ani = new Laya.Animation();
                Ani.autoSize = true;
                Ani.pos(this.img.width / 2, this.img.height / 2);
                this.addChild(Ani);
                Ani.loadAnimation('playdiceAnim.ani', Laya.Handler.create(this, this.onload, [Ani, caller, cb, argArray]));
            };
            Dice.prototype.onload = function (Ani, caller, cb, argArray) {
                if (cb === void 0) { cb = undefined; }
                Ani.play(0, false);
                Ani.on(Laya.Event.COMPLETE, this, this.onCompleted, [Ani, caller, cb, argArray]);
            };
            Dice.prototype.onCompleted = function (Ani, caller, cb, argArray) {
                if (cb === void 0) { cb = undefined; }
                this.img.visible = true;
                this.islock = false;
                Ani.off(Laya.Event.COMPLETE, this, this.onCompleted);
                this.removeChild(Ani);
                if (cb) {
                    cb.apply(caller, argArray);
                }
            };
            // public playRandom(value:number, caller:any, cb:Function = undefined, argArray?: any, isDebug = false)
            // {
            //     if (this.islock) return;
            //     this.step = value;
            //     if (this.step == undefined || this.step <= 0){
            //         Five.D.e("[error] why step is undefined or less zero.");
            //     }
            //     if (isDebug){
            //         this.img.skin = this.skin + this.step + ".png";
            //         if (cb) {
            //             cb.apply(caller, argArray);
            //         }
            //         return;
            //     }
            //     this.islock = true;
            //     var delay = 50;
            //     var t = Dice.PLAY_TIME * 1000;
            //     this.count = t / delay;
            //     Laya.timer.clear(this, this.loop);
            //     Laya.timer.loop(delay, this, this.loop, [this.step, this.skin, caller, cb, argArray]);
            // }
            Dice.prototype.loop = function (step, skin, caller, cb, argArray) {
                --this.count;
                if (this.count < 0) {
                    this.img.skin = skin + step + ".png";
                    Laya.timer.clear(this, this.loop);
                    if (cb) {
                        cb.apply(caller, argArray);
                    }
                }
                else {
                    var i = Five.MathUtil.getRandomInt(1, 6);
                    var s = skin + i + ".png";
                    this.img.skin = s;
                }
            };
            Dice.prototype.random = function (caller, cb, argArray) {
                if (cb === void 0) { cb = undefined; }
                var v = Five.MathUtil.getRandomInt(1, 6);
                this.playRandom(v, caller, cb, argArray);
                return v;
            };
            Dice.prototype.unlock = function () {
                this.islock = false;
                ;
            };
            Dice.prototype.lock = function () {
                this.islock = true;
                ;
            };
            Object.defineProperty(Dice.prototype, "enabled", {
                set: function (value) {
                    this.img.mouseEnabled = value;
                    this.mouseEnabled = value;
                    if (value) {
                        this.img.skin = this.skin + this.step + ".png";
                    }
                    else {
                    }
                },
                enumerable: true,
                configurable: true
            });
            //回合开始
            Dice.prototype.roundStart = function (isSelf) {
                if (isSelf) {
                    this.img.skin = "game/diceself.png";
                }
                else {
                    this.img.skin = "game/diceother.png";
                }
            };
            return Dice;
        }(Laya.Sprite)); //end class ResUtil
        Dice.index = 0;
        //全局设置
        Dice.PLAY_TIME = 0.5; //多长时间播放一次随机，单位秒
        components.Dice = Dice;
    })(components = five.components || (five.components = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=Dice.js.map