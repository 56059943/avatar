var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//--------------------------------------------------------------------
// 文件名:      Token.ts
// 内  容:      棋子
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
var five;
(function (five) {
    var components;
    (function (components) {
        var Token = (function (_super) {
            __extends(Token, _super);
            function Token(img) {
                var _this = _super.call(this) || this;
                _this.canPlayEffect = true;
                _this.cannotGoHome = false;
                _this.mouseEnabled = true;
                _this.name = img.name == "" ? "Token" + Token.s_index++ : img.name;
                _this.x = img.x;
                _this.y = img.y;
                _this.img = img;
                _this.img.anchorX = _this.img.anchorY = 0.5;
                _this.img.width = 38;
                _this.img.height = 40;
                _this.img.pivot(19, 20);
                if (img.parent)
                    img.parent.removeChild(img);
                img.x = img.y = 0;
                //    img.x = 0-(img.width*img.scaleX)/2;
                //    img.y = 0-(img.height*img.scaleY);
                img.mouseEnabled = true;
                img.name = _this.name;
                _this.addChild(img);
                _this.imgSelected = new Laya.Image("game/TokenSelected.png");
                _this.imgSelected.width = _this.imgSelected.height = 44;
                _this.imgSelected.pivotX = _this.imgSelected.pivotY = 44 / 2;
                _this.imgSelected.visible = false;
                _this.imgSelected.mouseEnabled = false;
                _this.addChildAt(_this.imgSelected, 0);
                _this.imgEffect = new Laya.Image("game/TokenSelected.png");
                _this.imgEffect.width = _this.imgEffect.height = 44;
                _this.imgEffect.pivotX = _this.imgEffect.pivotY = 44 / 2;
                _this.imgEffect.visible = false;
                _this.imgEffect.mouseEnabled = false;
                _this.imgEffect.alpha = 0.8;
                _this.addChildAt(_this.imgEffect, 0);
                return _this;
            }
            Object.defineProperty(Token.prototype, "index", {
                get: function () {
                    return this.current_index;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Token.prototype, "id", {
                get: function () {
                    return this.token_index;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Token.prototype, "sid", {
                get: function () {
                    return this.player_index;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Token.prototype, "isWaiting", {
                get: function () {
                    return this.status == Five.TokenStatus.WAITING ? true : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Token.prototype, "isLanding", {
                get: function () {
                    return this.status == Five.TokenStatus.LANDING ? true : false;
                },
                enumerable: true,
                configurable: true
            });
            Token.prototype.setColor = function (value) {
                this.color = value;
                this.img.skin = Five.ResUtil.getTokenSkin(value);
            };
            Token.prototype.getColor = function () {
                return this.color;
            };
            Token.prototype.getIsPlaying = function () {
                return this.imgSelected.visible;
            };
            Token.prototype.pause = function () {
                if (!this.canPlayEffect)
                    return;
                Laya.timer.clear(this, this.loop);
                this.imgSelected.visible = false;
                this.imgEffect.visible = false;
                this.img.mouseEnabled = false;
                this.mouseEnabled = false;
            };
            Token.prototype.play = function () {
                if (!this.canPlayEffect)
                    return;
                Laya.timer.clear(this, this.loop);
                Laya.timer.frameLoop(1, this, this.loop);
                this.imgSelected.visible = true;
                this.imgEffect.visible = true;
                this.img.mouseEnabled = true;
                this.mouseEnabled = true;
            };
            Token.prototype.loop = function () {
                this.imgSelected.rotation += 1;
                this.imgEffect.rotation -= 1;
                this.imgEffect.scaleX = this.imgEffect.scaleY = this.imgEffect.scaleY + 0.03;
                this.imgEffect.alpha -= 0.02;
                if (this.imgEffect.scaleX > 1.8) {
                    this.imgEffect.scaleX = this.imgEffect.scaleY = 0.8;
                    this.imgEffect.alpha = 0.8;
                }
            };
            return Token;
        }(Laya.Sprite)); //end class ResUtil
        Token.s_index = 0;
        components.Token = Token;
    })(components = five.components || (five.components = {}));
})(five || (five = {})); //end module
//# sourceMappingURL=Token.js.map