//--------------------------------------------------------------------
// 文件名:      List.ts
// 内  容:      列表
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
module five.controls
{
    export class List{

        public list:Laya.List;
        public selectedCallback:Function;

        public static WID: number = 119;
        public static HEI: number = 64;
        constructor(list:Laya.List, isH:boolean = true, selectedCallback?:Function)
        {
            this.list = list;
            this.selectedCallback = selectedCallback;
            List.WID = 119;
            List.HEI = 40;

            var data:Array<string> = new Array<string>();
            // while(list.numChildren > 0){
            //     var img = list.removeChildAt(0) as Laya.Image;
            //     if (img && img.skin && !Five.StringUtil.isEmpty(img.skin)){
            //         data.push(img.skin);
            //     }
            // }
            
            for(var i = 0; i < list.numChildren; ++i){
                var img = list.getChildAt(i) as Laya.Image;
                if (img && img.skin && !Five.StringUtil.isEmpty(img.skin)){
                    data.push(img.skin);
                }
            }
            list.dataSource = new Array<string>();

            list.itemRender = Item;
            if (isH){
                list.repeatX = data.length - 1;
                list.repeatY = 1;
                list.hScrollBarSkin = "";

            }
            else{
                list.repeatX = 1;
                list.repeatY = data.length - 1;
                list.vScrollBarSkin = "";
            }

            list.selectEnable = true;
            list.selectHandler = new Laya.Handler(this, this.onSelect);
            list.renderHandler = new Laya.Handler(this, this.updateItem);
            list.array = data;
        }

        private updateItem(cell: Item, index: number): void {
           cell.setImg(cell.dataSource);
        }

        private onSelect(index: number): void {
            console.log("当前选择的索引：" + index);
            if (this.selectedCallback){
                this.selectedCallback(index);
            }
        }
    
    }//end class List

    
    class Item extends Laya.Box {
        private img: Laya.Image;
        constructor(){
            super();
            this.size(List.WID, List.HEI);
            this.img = new Laya.Image();
            this.addChild(this.img);
        }
        public setImg(src: string): void {
            this.img.skin = src;
        }
    }

}//end module