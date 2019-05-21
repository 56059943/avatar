//--------------------------------------------------------------------
// 文件名:      RoleUtil.ts
// 内  容:      角色工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module five.utils
{
    export class RoleUtil{
        private static resArray:Array<string> = [];
        //初始化主角3d模型组名字
        public static initGroup(role3D:Laya.Sprite3D):void{
            role3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
                var group = value._getGroup();
                var name = value.name;
                group = name.substr(1,2);
                value._setGroup(group);
            });
        }

        // 穿装备，裸模隐藏，方便还原
        public static takeUpEquip(target3D:Laya.Sprite3D, equip3D:Laya.Sprite3D):void{
            var targetGroup = equip3D.name.substr(1, 2);
            target3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
                if(value._getGroup() == targetGroup)
                {
                    value.active = false;
                }
            });

            equip3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
                var node:Laya.SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D.instantiate(value) as Laya.SkinnedMeshSprite3D;
                node._setGroup(targetGroup);
                target3D.getChildAt(0).addChild(node);
            });
        }

        // 脱装备，删除目标装备组，还原裸模
        public static takeOutEquip(target3D:Laya.Sprite3D, tragetGroup:string):void{
            target3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
                if( value.active && value._getGroup() == tragetGroup)
                {
                   value.parent.removeChild(value);
                   value.destroy();
                }
            });

            target3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
                if( value.active == false && value._getGroup() == tragetGroup)
                {
                    value.active = true;
                }
            });
        }

        // 排序-y 
        public static sortY(list:Array<Laya.Sprite>):void{
            if (list == undefined || list.length == 0) return;
            var max = list[0].parent.numChildren - 1;
            var min = max - list.length;
            list.sort((a:Laya.Sprite, b:Laya.Sprite)=>{
                if (a.y < b.y) return -1;
                if (a.y > b.y) return 1;
                return 0;
            });
            list.forEach((value:Laya.Sprite, index:number, array:Laya.Sprite[])=>{
                 value.parent.setChildIndex(value, min + index);
                //  Five.D.d("[debug] sort y.", value.name, value.y, min + index);
            });
        }

        // 排序-y 
        public static sortY2D(list:Array<Array<Laya.Sprite>>):void{
            if (list == undefined || list.length == 0 || list[0].length == 0) return;
            var p = list[0][0];
            var max = p.parent.numChildren - 1;
            // var ps = list.length * list[0].length;
            var ps = 0;
            var sortList:Array<Laya.Sprite> = new Array<Laya.Sprite>();
            // p.parent.setChildIndex(p, min);
            list.forEach((arr:Array<Laya.Sprite>, index:number, array:Array<Laya.Sprite>[])=>{
                arr.forEach((value:Laya.Sprite, index:number, array:Laya.Sprite[])=>{
                    sortList.push(value); 
                    ++ ps;
                });
            });
            
            sortList.sort((a:Laya.Sprite, b:Laya.Sprite)=>{
                if (a.y < b.y) return -1;
                if (a.y > b.y) return 1;
                return 0;
            });
            var min = max - ps;
            sortList.forEach((value:Laya.Sprite, index:number, array:Laya.Sprite[])=>{
                 value.parent.setChildIndex(value, min + index);
            });
        }

    }//end class ResUtil
}//end module