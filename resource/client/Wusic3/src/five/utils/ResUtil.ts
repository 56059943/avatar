//--------------------------------------------------------------------
// 文件名:      ResUtil.ts
// 内  容:      资源工具类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module five.utils
{
    export class ResUtil{
        private static resArray:Array<string> = [];
        //获取3d模型资源
        public static get3DUrl(value:string):string{
            var url: string = `res/3d/${value}/${value}.lh`;
            return url;
        }

        public static getDiceUrl(baseSkin:string, value:number):string{
            var url: string = baseSkin + value + ".png";
            return url;
        }

        public static getColorSkin(color:Five.PlayerColor):string{
            if (color == Five.PlayerColor.RED) return "creator/image_qizi_red.png";
            if (color == Five.PlayerColor.YELLOW) return "creator/image_qizi_yellow.png";
            if (color == Five.PlayerColor.GREEN) return "creator/image_qizi_green.png";
            if (color == Five.PlayerColor.BLUE) return "creator/image_qizi_blue.png";
            return "";
        }
        
        //获取头像框
        public static getIconFrameSkin(color:Five.PlayerColor):string{
            if (color == Five.PlayerColor.RED) return "photo/Fr_00.png";
            if (color == Five.PlayerColor.YELLOW) return "photo/Fr_01.png";
            if (color == Five.PlayerColor.GREEN) return "photo/Fr_02.png";
            if (color == Five.PlayerColor.BLUE) return "photo/Fr_03.png";
            return "";
        }
        
        public static getTokenSkin(color:Five.PlayerColor):string{
            if (color == Five.PlayerColor.RED) return "game/image_qizi_red.png";
            if (color == Five.PlayerColor.YELLOW) return "game/image_qizi_yellow.png";
            if (color == Five.PlayerColor.GREEN) return "game/image_qizi_green.png";
            if (color == Five.PlayerColor.BLUE) return "game/image_qizi_blue.png";
            return "";
        }

        
        
        public static getPaoPaoSkin(color:Five.PlayerColor):string{
            if (color == Five.PlayerColor.RED) return "game/bubble_red.png";
            if (color == Five.PlayerColor.YELLOW) return "game/bubble_yellow.png";
            if (color == Five.PlayerColor.GREEN) return "game/bubble_green.png";
            if (color == Five.PlayerColor.BLUE) return "game/bubble_blue.png";
            return "";
        }
        
        public static getRankSkin(rank:number):string{
            if (rank == 1) return "common/image_1st.png";
            if (rank == 2) return "common/image_2st.png";
            if (rank == 3) return "common/image_3st.png";
            if (rank == 4) return "common/image_4st.png";
            return "";
        }
        
        public static getStoreKey(value:any):string{
            return "data" + value;
        }
        // //加载资源，便于管理，方便统一卸载资源
        // public static Destory(num:number):void{
        //     ResUtil.resArray.forEach((value:string, index:number, array:string[])=>{
        //         Laya.loader.clearRes(value);
        //     });
        // }

        // //加载资源，便于管理，方便统一卸载资源
        // public static Load(url:string, caller: any, method: Function, args?: Array<any>, once?: boolean):void{
        //     ResUtil.resArray.push(url);
        //     Laya.loader.create([{ url: url }
        //     ], Laya.Handler.create(caller, method, args, once));
        // }

        // //批量加载资源
        // public static Loads(urls:Array<string>, caller: any, method: Function, args?: Array<any>, once?: boolean):void{
        //     urls.forEach((value:string, index:number, array:string[])=>{
        //         ResUtil.Load(value, caller, method, args, once);
        //     });
        // }

    }//end class ResUtil
}//end module