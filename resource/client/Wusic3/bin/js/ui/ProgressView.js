var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ProgressView = (function (_super) {
    __extends(ProgressView, _super);
    function ProgressView() {
        var _this = _super.call(this) || this;
        _this.progress = 0;
        // Laya.timer.loop(30, this, this.onLoop);
        _this.update(1);
        return _this;
    }
    // private onLoop():void{
    //     this.progress++;
    //     if (this.progress > 100){
    //         this.progress = 100;
    //         this.tips.text = "游戏加载完毕，即将进入游戏。。。";
    //         Laya.timer.clearAll(this);
    //         this.removeSelf();
    //     }
    //     else{
    //         this.pro.value = this.progress / 100;
    //         this.tips.text = "游戏正在加载中，当前进度为：" + this.progress+"%!";
    //     }
    // }
    ProgressView.prototype.update = function (value) {
        this.progress = value;
        if (this.progress > 100) {
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏。。。";
        }
        else {
            this.pro.value = this.progress / 100;
            this.tips.text = "游戏正在加载中，当前进度为：" + this.progress + "%!";
        }
    };
    return ProgressView;
}(ui.ProgressUI));
//# sourceMappingURL=ProgressView.js.map