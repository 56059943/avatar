//--------------------------------------------------------------------
// 文件名:      List.ts
// 内  容:      列表
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月19日
//---------------------------------------------------------------------- 
module five.controls
{
    export class ListExample{

        public parent:Laya.Node;
        public list:Laya.List;
        public selectedCallback:Function;

        constructor(parent:Laya.Node, isH:boolean = true, selectedCallback?:Function)
        {
            this.parent = parent;
            this.selectedCallback = selectedCallback;
           this.setup();
           this.setup2();
        }



        


        private setup2(): void {
            var list:Laya.List = new Laya.List();
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
            var data: Array<string> = [];                
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            list.array = data;
        }

        private updateItem2(cell: Item2, index: number): void {
            cell.setImg(cell.dataSource);
        }
        private onSelect2(index: number): void {
            console.log("当前选择的索引：" + index);
        }



        private setup(): void {
            var list:Laya.List = new Laya.List();
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
            var data: Array<string> = [];                
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            data.push("common/info.png");
            list.array = data;
        }

        private updateItem(cell: Item, index: number): void {
            cell.setImg(cell.dataSource);
        }
        private onSelect(index: number): void {
            console.log("当前选择的索引：" + index);
        }





    
    }//end class List

    import Box = Laya.Box;
    import Image = Laya.Image;
    class Item extends Box {
        public static WID: number = 373;
        public static HEI: number = 85;
        private img: Image;
        constructor(){
            super();
            this.size(Item.WID, Item.HEI);
            this.img = new Image();
            this.addChild(this.img);
        }
        public setImg(src: string): void {
            this.img.skin = src;
        }
    }

    

    class Item2 extends Box {
        public static WID: number = 119;
        public static HEI: number = 64;
        private img: Image;
        constructor(){
            super();
            this.size(Item2.WID, Item2.HEI);
            this.img = new Image();
            this.addChild(this.img);
        }
        public setImg(src: string): void {
            this.img.skin = src;
        }
    }
}//end module