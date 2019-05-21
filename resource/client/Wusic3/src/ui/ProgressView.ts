class ProgressView extends ui.ProgressUI{
    private progress:number = 0;
    constructor(){
        super();
        // Laya.timer.loop(30, this, this.onLoop);
        this.update(1);
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

    public update(value:number):void{
        this.progress = value;
        if (this.progress > 100){
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏。。。";
        }
        else{
            this.pro.value = this.progress / 100;
            this.tips.text = "游戏正在加载中，当前进度为：" + this.progress+"%!";
        }
    }
}