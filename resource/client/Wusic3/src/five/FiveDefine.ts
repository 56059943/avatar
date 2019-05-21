//--------------------------------------------------------------------
// 文件名:      FiveDefine.ts
// 内  容:      常量定义类，也叫非枚举定义
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module Five
{
                //示例
    // enum Students { zwq, zzz, zrt} ;

    //enum Modules {hair = 2, head = 5, body = 7, hand = 8, trousers = 13, shoes = 15};

    export class Def{
        public static IS_DEBUG: boolean = false;
    }

    export class AnimatorDef{
        public static IDLE: string = "idle";
        public static WALK: string = "walk";
        public static RUN: string = "run";
    }

    export class EquipDef{
        public static HAIR: string = "02";
        public static HEAD: string = "05";
        public static BODY: string = "07";
        public static HAND: string = "08";
        public static TROUSERS: string = "13";
        public static SHOES: string = "15";
        // constructor(){
        //     Define.HAIR_3D = "";
        // }
    }

    export class LoaderGroupDef{
        public static ALWAYS: string = "ALWAYS";
        public static TEMP: string = "TEMP";
    }

    export class MsgTypeDef{
        public static CLIENT_MSG: string = "c";
        public static SERVER_MSG: string = "s";
    }

}