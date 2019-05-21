//--------------------------------------------------------------------
// 文件名:      Five.ts
// 内  容:      第五元素所有公共类定义，除了枚举和常量
// 说  明:
// 创建人:      liy
// 创建日期:    2018年9月10日
//---------------------------------------------------------------------- 
module Five {
    export class D extends five.utils.DebugUtil {}
    export class UIUtil extends five.utils.UIUtil {}
    export class LibUtil extends five.utils.LibUtil {}
    export class ResUtil extends five.utils.ResUtil {}
    export class RoleUtil extends five.utils.RoleUtil {}
    export class ArrayUtil extends five.utils.ArrayUtil {}
    export class MathUtil extends five.utils.MathUtil {}
    export class StringUtil extends five.utils.StringUtil {}

    export class Dice extends five.components.Dice {}
    export class Token extends five.components.Token {}
    export class Step extends five.components.Step {}
    export class Arrow extends five.components.Arrow {}

    export class List extends five.controls.List {}

    export class CDMgr extends five.managers.CDMgr {}

    export class KeyIO extends five.io.KeyIO {}
}