//--------------------------------------------------------------------
// 文件名:      FiveEnum.ts
// 内  容:      枚举定义类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module Five
{

    //操作
    export enum Option {
        NONE,
        YES,
        NO,
    }

    //玩家行动
    export enum PlayerAction {
        DICE,//掷骰子
        MOVE,//移动棋子
        M_GROUP,//移动棋子,帮组队友
        SAY,//说话
        EXIT,//退出游戏
    }

    //玩家的位置
    export enum PlayerPosition {
        POS1,
        POS2,
        POS3,
        POS4,
    }

    /**
     * 玩家的颜色，同位置一致
     */
    export enum PlayerColor {
        RED,
        GREEN,
        YELLOW,
        BLUE,
    }

    //玩家的组队
    export enum PlayerGroup {
        NONE,
        A,
        B,
    }

    //玩家的状态，预留
    export enum PlayerStatus {
        NONE,
        MATCHING_SELF,//自己比赛
        MATCHING_GROUP,//帮助队友比赛
        FINISHED,
    }

    //棋子状态
   export enum TokenStatus {
        WAITING,//等待中
        FLYING,//飞行中
        LANDING,//降落中
        FINISHED,//完成
    }

    //朝向
    export enum Orientation {
        NONE,
        UP,
        LEFT,
        RIGHT,
        DOWN,
    }

    //对齐方式
    export enum Align {
        NONE,
        TOP,
        LEFT,
        RIGHT,
        BOTTOM,
        TOP_LEFT,
        TOP_RIGHT,
        BOTTOM_LEFT,
        BOTTOM_RIGHT,
        CENTER,
        CENTER_LEFT,
        CENTER_RIGHT,
        CENTER_TOP,
        CENTER_BOTTOM,
    }

    //单机还是网游
    export enum GameNetType {
        OFFLINE,//线下
        ONLINE,//线上
    }

    /**
     * 首先服务器通知所有客户端准备游戏
     * 接着，收到所有客户端准备好消息，开始指定一个玩家开始掷骰子
     * 轮流掷骰子和移动棋子
     * 判断胜利条件，通知所有客户端结束游戏
     */
    export enum MsgID {
        ERROR,              //错误
        READY,              //准备游戏，预留
        GO,                 //开局，预留
        REPAIR_PU,          //修复，预留
        DICE,               //掷骰子
        DICE_RT,            //掷骰子
        MOVE,               //移动棋子      
        MOVE_RT,            //移动棋子      
        MOVE_PU,            //移动推送      
        UPDATE_RANK,        //排行榜更新
        GAME_OVER,          //游戏结束
        EVENT_STREAM,       //事件流
        KICK_OUT,       //踢下线，限离线模式
        KICK_OUT_RT,    //踢下线，限离线模式
    }

}