//--------------------------------------------------------------------
// 文件名:      FiveEnum.ts
// 内  容:      枚举定义类
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
var Five;
(function (Five) {
    //操作
    var Option;
    (function (Option) {
        Option[Option["NONE"] = 0] = "NONE";
        Option[Option["YES"] = 1] = "YES";
        Option[Option["NO"] = 2] = "NO";
    })(Option = Five.Option || (Five.Option = {}));
    //玩家行动
    var PlayerAction;
    (function (PlayerAction) {
        PlayerAction[PlayerAction["DICE"] = 0] = "DICE";
        PlayerAction[PlayerAction["MOVE"] = 1] = "MOVE";
        PlayerAction[PlayerAction["M_GROUP"] = 2] = "M_GROUP";
        PlayerAction[PlayerAction["SAY"] = 3] = "SAY";
        PlayerAction[PlayerAction["EXIT"] = 4] = "EXIT";
    })(PlayerAction = Five.PlayerAction || (Five.PlayerAction = {}));
    //玩家的位置
    var PlayerPosition;
    (function (PlayerPosition) {
        PlayerPosition[PlayerPosition["POS1"] = 0] = "POS1";
        PlayerPosition[PlayerPosition["POS2"] = 1] = "POS2";
        PlayerPosition[PlayerPosition["POS3"] = 2] = "POS3";
        PlayerPosition[PlayerPosition["POS4"] = 3] = "POS4";
    })(PlayerPosition = Five.PlayerPosition || (Five.PlayerPosition = {}));
    /**
     * 玩家的颜色，同位置一致
     */
    var PlayerColor;
    (function (PlayerColor) {
        PlayerColor[PlayerColor["RED"] = 0] = "RED";
        PlayerColor[PlayerColor["GREEN"] = 1] = "GREEN";
        PlayerColor[PlayerColor["YELLOW"] = 2] = "YELLOW";
        PlayerColor[PlayerColor["BLUE"] = 3] = "BLUE";
    })(PlayerColor = Five.PlayerColor || (Five.PlayerColor = {}));
    //玩家的组队
    var PlayerGroup;
    (function (PlayerGroup) {
        PlayerGroup[PlayerGroup["NONE"] = 0] = "NONE";
        PlayerGroup[PlayerGroup["A"] = 1] = "A";
        PlayerGroup[PlayerGroup["B"] = 2] = "B";
    })(PlayerGroup = Five.PlayerGroup || (Five.PlayerGroup = {}));
    //玩家的状态，预留
    var PlayerStatus;
    (function (PlayerStatus) {
        PlayerStatus[PlayerStatus["NONE"] = 0] = "NONE";
        PlayerStatus[PlayerStatus["MATCHING_SELF"] = 1] = "MATCHING_SELF";
        PlayerStatus[PlayerStatus["MATCHING_GROUP"] = 2] = "MATCHING_GROUP";
        PlayerStatus[PlayerStatus["FINISHED"] = 3] = "FINISHED";
    })(PlayerStatus = Five.PlayerStatus || (Five.PlayerStatus = {}));
    //棋子状态
    var TokenStatus;
    (function (TokenStatus) {
        TokenStatus[TokenStatus["WAITING"] = 0] = "WAITING";
        TokenStatus[TokenStatus["FLYING"] = 1] = "FLYING";
        TokenStatus[TokenStatus["LANDING"] = 2] = "LANDING";
        TokenStatus[TokenStatus["FINISHED"] = 3] = "FINISHED";
    })(TokenStatus = Five.TokenStatus || (Five.TokenStatus = {}));
    //朝向
    var Orientation;
    (function (Orientation) {
        Orientation[Orientation["NONE"] = 0] = "NONE";
        Orientation[Orientation["UP"] = 1] = "UP";
        Orientation[Orientation["LEFT"] = 2] = "LEFT";
        Orientation[Orientation["RIGHT"] = 3] = "RIGHT";
        Orientation[Orientation["DOWN"] = 4] = "DOWN";
    })(Orientation = Five.Orientation || (Five.Orientation = {}));
    //对齐方式
    var Align;
    (function (Align) {
        Align[Align["NONE"] = 0] = "NONE";
        Align[Align["TOP"] = 1] = "TOP";
        Align[Align["LEFT"] = 2] = "LEFT";
        Align[Align["RIGHT"] = 3] = "RIGHT";
        Align[Align["BOTTOM"] = 4] = "BOTTOM";
        Align[Align["TOP_LEFT"] = 5] = "TOP_LEFT";
        Align[Align["TOP_RIGHT"] = 6] = "TOP_RIGHT";
        Align[Align["BOTTOM_LEFT"] = 7] = "BOTTOM_LEFT";
        Align[Align["BOTTOM_RIGHT"] = 8] = "BOTTOM_RIGHT";
        Align[Align["CENTER"] = 9] = "CENTER";
        Align[Align["CENTER_LEFT"] = 10] = "CENTER_LEFT";
        Align[Align["CENTER_RIGHT"] = 11] = "CENTER_RIGHT";
        Align[Align["CENTER_TOP"] = 12] = "CENTER_TOP";
        Align[Align["CENTER_BOTTOM"] = 13] = "CENTER_BOTTOM";
    })(Align = Five.Align || (Five.Align = {}));
    //单机还是网游
    var GameNetType;
    (function (GameNetType) {
        GameNetType[GameNetType["OFFLINE"] = 0] = "OFFLINE";
        GameNetType[GameNetType["ONLINE"] = 1] = "ONLINE";
    })(GameNetType = Five.GameNetType || (Five.GameNetType = {}));
    /**
     * 首先服务器通知所有客户端准备游戏
     * 接着，收到所有客户端准备好消息，开始指定一个玩家开始掷骰子
     * 轮流掷骰子和移动棋子
     * 判断胜利条件，通知所有客户端结束游戏
     */
    var MsgID;
    (function (MsgID) {
        MsgID[MsgID["ERROR"] = 0] = "ERROR";
        MsgID[MsgID["READY"] = 1] = "READY";
        MsgID[MsgID["GO"] = 2] = "GO";
        MsgID[MsgID["REPAIR_PU"] = 3] = "REPAIR_PU";
        MsgID[MsgID["DICE"] = 4] = "DICE";
        MsgID[MsgID["DICE_RT"] = 5] = "DICE_RT";
        MsgID[MsgID["MOVE"] = 6] = "MOVE";
        MsgID[MsgID["MOVE_RT"] = 7] = "MOVE_RT";
        MsgID[MsgID["MOVE_PU"] = 8] = "MOVE_PU";
        MsgID[MsgID["UPDATE_RANK"] = 9] = "UPDATE_RANK";
        MsgID[MsgID["GAME_OVER"] = 10] = "GAME_OVER";
        MsgID[MsgID["EVENT_STREAM"] = 11] = "EVENT_STREAM";
        MsgID[MsgID["KICK_OUT"] = 12] = "KICK_OUT";
        MsgID[MsgID["KICK_OUT_RT"] = 13] = "KICK_OUT_RT";
    })(MsgID = Five.MsgID || (Five.MsgID = {}));
})(Five || (Five = {}));
//# sourceMappingURL=FiveEnum.js.map