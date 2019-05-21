var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var ControlUI = (function (_super) {
        __extends(ControlUI, _super);
        function ControlUI() {
            return _super.call(this) || this;
        }
        ControlUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ControlUI.uiView);
        };
        return ControlUI;
    }(View));
    ControlUI.uiView = { "type": "View", "props": { "width": 720, "name": "scaleBody", "height": 1280 }, "child": [{ "type": "Box", "props": { "y": 319, "width": 247, "right": -14, "height": 587, "gray": false, "disabled": false }, "child": [{ "type": "Button", "props": { "y": 31, "x": 27, "width": 192, "var": "change", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "change", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "更换角色", "height": 58, "gray": false, "disabled": true, "alpha": 0 } }, { "type": "Button", "props": { "y": 108, "x": 26, "width": 192, "var": "play", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "selected": false, "name": "playAni", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "播放动画", "height": 58 } }, { "type": "Button", "props": { "y": 185, "x": 26, "width": 192, "var": "stop", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "selected": false, "name": "stopAni", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "停止动画", "height": 58 } }, { "type": "Button", "props": { "y": 262, "x": 26, "width": 192, "var": "idle", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "idle", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "待机动画", "height": 58 } }, { "type": "Button", "props": { "y": 339, "x": 26, "width": 192, "var": "run", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "run", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "行走动画", "height": 58 } }, { "type": "Button", "props": { "y": 416, "x": 26, "width": 192, "var": "ready", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "ready", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "准备动画", "height": 58, "gray": false, "disabled": true, "alpha": 0 } }, { "type": "Button", "props": { "y": 493, "x": 26, "width": 192, "var": "playBall", "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "play", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "击球动画", "height": 58, "gray": false, "disabled": true, "cacheAsBitmap": false, "alpha": 0 } }] }, { "type": "Box", "props": { "y": 320, "x": 4, "width": 247, "height": 587, "gray": false, "disabled": true, "alpha": 0 }, "child": [{ "type": "Button", "props": { "y": 31, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "changeSkin", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "更换皮肤", "height": 58 } }, { "type": "Button", "props": { "y": 108, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "selected": false, "name": "resetSkin", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "还原皮肤", "height": 58 } }, { "type": "Button", "props": { "y": 185, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "selected": false, "name": "resetSkin2", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "还原皮肤2", "height": 58 } }, { "type": "Button", "props": { "y": 339, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "changeAlbedo", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "更换反射率", "height": 58 } }, { "type": "Button", "props": { "y": 262, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "resetAlbedo", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "还原反射率", "height": 58 } }, { "type": "Button", "props": { "y": 416, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "changeAmbient", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "更换环境色", "height": 58, "gray": true } }, { "type": "Button", "props": { "y": 493, "x": 20, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "resetAmbient", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "labelBold": true, "label": "还原环境色", "height": 58, "gray": true, "disabled": true } }] }, { "type": "HBox", "props": { "y": 1111, "x": -22 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "changeBody", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "label": "更换衣服", "height": 58 } }, { "type": "Button", "props": { "y": 0, "x": 192, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "resetBody", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "label": "还原衣服", "height": 58 } }, { "type": "Button", "props": { "y": 0, "x": 576, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "changeHair", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "label": "更换头发", "height": 58 } }, { "type": "Button", "props": { "y": 0, "x": 768, "width": 192, "skin": "comp/button.png", "sizeGrid": "0,29,0,27", "name": "resetHair", "labelSize": 30, "labelPadding": "-1", "labelFont": "SimHei", "label": "还原头发", "height": 58 } }] }] };
    ui.ControlUI = ControlUI;
})(ui || (ui = {}));
(function (ui) {
    var ProgressUI = (function (_super) {
        __extends(ProgressUI, _super);
        function ProgressUI() {
            return _super.call(this) || this;
        }
        ProgressUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ProgressUI.uiView);
        };
        return ProgressUI;
    }(View));
    ProgressUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "skin": "comp/img_blank.png", "sizeGrid": "6,7,6,6", "height": 1280 } }, { "type": "ProgressBar", "props": { "width": 640, "var": "pro", "skin": "comp/progress.png", "sizeGrid": "0,9,0,5", "height": 14, "centerY": 521, "centerX": 11 } }, { "type": "Label", "props": { "y": 1077, "x": 107, "width": 512, "var": "tips", "text": "资源正在加载中......", "height": 28, "fontSize": 28, "font": "SimHei", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 461, "width": 356, "text": "3D角色实例演示", "height": 62, "fontSize": 45, "font": "SimHei", "centerX": -5, "bold": true, "align": "center" } }] };
    ui.ProgressUI = ProgressUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map