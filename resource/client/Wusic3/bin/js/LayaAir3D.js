// 程序入口
var LayaAir3D = (function () {
    function LayaAir3D() {
        // var q = five.defs.Part3D.HEAD;
        // var v = Five.Part3D.HEAD;
        // Laya.AnimationContent;
        // console.log("q:"+q);
        // console.log("v:"+v);
        /*3D角色*/
        this.role3DRotation = new Laya.Vector3();
        /*****角色资源名数组******/
        // private roleArray: Array<any> = ["res/girl/girl.lh", "res/boy/boy.lh"];
        this.roleArray = ["res/girl/girl.lh"];
        /*当前场景中角色资源*/
        this.currentRole = "res/girl/girl.lh";
        /*当前场景中特效资源*/
        this.effectName = "LayaScene_effect/effect.lh";
        /*当前场景资源*/
        this.sceneName = "LayaScene_scene02/scene02.ls";
        /**
         * 默认角色动作
         * idle run walk
         */
        this.currentActive = Five.AnimatorDef.RUN;
        /**
         * 换装
         * 目标
         * targetName 需要更换的部位
         * 替换的套装
         * suitName （20700815 格子裙）（20700455 花裙）
         *
         */
        this.targetName = "20700001";
        this.suitName = "20700455";
        this.equipArray = [];
        //初始化引擎
        Laya3D.init(720, 1280, true);
        //Laya3D.init(1280, 720, true);
        Laya.Stat.show();
        //调试面板
        // Laya.init(720, 1280);
        // Laya.DebugPanel.init();
        //适配模式
        //SCALE_EXACTFIT SCALE_SHOWALL
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //加载2D界面资源
        // Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/comp2.atlas"], Laya.Handler.create(this, this.onUIComplete));
        Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(this, this.onUIComplete));
    }
    /*界面资源加载完成后*/
    LayaAir3D.prototype.onUIComplete = function () {
        this.roleArray.splice(0);
        this.roleArray.push(Five.ResUtil.get3DUrl("girl"));
        this.roleArray.push(Five.ResUtil.get3DUrl("20200279"));
        this.currentRole = this.roleArray[0];
        //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
        var urls = [{ url: this.sceneName },
            { url: this.effectName }
        ];
        this.roleArray.forEach(function (value, index, array) {
            urls.push(value);
        });
        Laya.loader.create(urls, Laya.Handler.create(this, this.onSceneOK), Laya.Handler.create(this, this.onSceneProgress));
        // //创建角色控制界面
        this.control = new ControlView();
        Laya.stage.addChild(this.control);
        //监听控制界面按钮信息
        this.control.on("btn_action", this, this.onBtnAction);
        this.control.on("btn_rotate", this, this.onBtnRotate);
        //创建资源载入界面
        // var assetLoad: ProgressView = new ProgressView();
        this.assetLoad = new ProgressView();
        Laya.stage.addChild(this.assetLoad);
    };
    LayaAir3D.prototype.onSceneProgress = function (value) {
        var progress = Math.floor(value * 100);
        this.assetLoad.update(progress);
    };
    LayaAir3D.prototype.onBtnRotate = function (action) {
        this.role3DRotation.y = action;
        //旋转摄像机角度
        this.role3D.transform.rotate(this.role3DRotation, true, false);
        // console.log("[debug] LayaAir3D onBtnRotate:", action, this.role3DRotation.y, this.role3D.transform.localRotation.y);
    };
    /*控制界面动作监听回调
 action:当前执行的控制名称
*/
    LayaAir3D.prototype.onBtnAction = function (action) {
        if (action == "change") {
            //切换角色
            this.changeRole();
        }
        else if (action == "playAni") {
            //播放当前动作
            this.roleAni.play(this.currentActive);
        }
        else if (action == "stopAni") {
            //停止动画
            this.roleAni.stop();
        }
        else if (action == "idle" || action == "run" || action == "idle" || action == "run") {
            //播放动作
            this.roleAni.play(action);
            this.currentActive = action;
        }
        else if (action == "changeAlbedo") {
            //切换反色率
            this.changeAlbedo();
        }
        else if (action == "resetAlbedo") {
            //还原反色率
            this.resetAlbedo();
        }
        else if (action == "changeSkin") {
            //切换贴图
            this.changeSkin();
        }
        else if (action == "resetSkin") {
            //还原贴图
            this.resetSkin();
        }
        else if (action == "resetSkin2") {
            //还原贴图
            this.resetSkin2();
        }
        else if (action == "changeBody") {
            //切换身体
            this.changeBody();
        }
        else if (action == "resetBody") {
            //还原身体
            this.resetBody();
        }
        else if (action == "scaleBody") {
            //缩放身体
            this.scaleBody();
        }
        else if (action == "cloneAnimator") {
            //克隆动作
            this.cloneAnimator();
        }
        else if (action == "resetHair") {
            //还原贴图
            this.resetHair();
        }
        else if (action == "changeHair") {
            //切换身体
            this.changeHair();
        }
    };
    /*还原身体*/
    LayaAir3D.prototype.resetHair = function () {
        var _this = this;
        var suitName = "20200279";
        var suitUrl = Five.ResUtil.get3DUrl(suitName);
        // this.role3D.getChildAt(0).removeChildByName(suitName);
        // Laya.loader.clearRes(suitUrl);
        this.role3D.getChildAt(0)._childs.forEach(function (value, index, array) {
            if (value._getGroup() == "02") {
                _this.role3D.getChildAt(0).removeChild(value);
            }
        });
    };
    /*切换身体*/
    LayaAir3D.prototype.changeHair = function () {
        //被替换部位
        var targetName = this.targetName;
        //替换套装
        var suitName = "20200279";
        var suitUrl = Five.ResUtil.get3DUrl(suitName);
        Laya.loader.create([{ url: suitUrl }
        ], Laya.Handler.create(this, this.onHairEquipOK, [targetName, suitName, suitUrl]));
    };
    /*装备资源加载完成后*/
    LayaAir3D.prototype.onHairEquipOK = function (targetName, suitName, suitUrl) {
        var _this = this;
        //创建加载场景
        var hair3D = Laya.loader.getRes(suitUrl);
        hair3D.transform.position = new Laya.Vector3(-3.5, 0, 1);
        hair3D.name = suitName;
        // this.role3D.getChildAt(0).addChild(hair3D);
        hair3D.getChildAt(0)._childs.forEach(function (value, index, array) {
            var node = Laya.SkinnedMeshSprite3D.instantiate(value);
            node._setGroup("02");
            _this.role3D.getChildAt(0).addChild(node);
        });
    };
    /*克隆动作*/
    LayaAir3D.prototype.cloneAnimator = function () {
        // var com:Laya.Animator = new Laya.Animator();
        // this.roleAni._cloneTo(com);
        // var s:Laya.Sprite3D = (this.equip3D.getChildAt(0) as Laya.Sprite3D);
        // s.componentsCount;
        // (this.equip3D.getChildAt(0) as Laya.Sprite3D).addComponent(com);
    };
    /*切换身体*/
    LayaAir3D.prototype.scaleBody = function () {
        if (this.equip3D == null || this.equip3D == undefined)
            return;
        if (this.equip3D.transform.scale.x > 1) {
            this.equip3D.transform.scale = new Laya.Vector3(1.0, 1.0, 1.0);
        }
        else {
            this.equip3D.transform.scale = new Laya.Vector3(1.5, 1.5, 1.5);
        }
    };
    /*切换身体*/
    LayaAir3D.prototype.changeBody = function () {
        //被替换部位
        var targetName = this.targetName;
        //替换套装
        var suitName = this.suitName;
        var suitUrl = Five.ResUtil.get3DUrl(this.suitName);
        Laya.loader.create([{ url: suitUrl }
        ], Laya.Handler.create(this, this.onEquipOK, [targetName, suitName, suitUrl]));
    };
    LayaAir3D.prototype.changeEquip = function (targetName, equip3D) {
        var _this = this;
        //targetName = "20700001";
        //suitName = this.suitName;
        var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildByName(targetName);
        if (skinedMeshSprite3D == null || skinedMeshSprite3D.active == false)
            return;
        var skinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender;
        // var rootBone = skinnedMeshRender._rootBone;
        // this.role3D.getChildAt(0).removeChildByName(targetName);
        skinedMeshSprite3D.active = false;
        // var handBip: Laya.Sprite3D = this.role3D.getChildAt(0).getChildByName("Bip01") as Laya.Sprite3D;
        // var node = this.role3D.getChildAt(0).addChild(equip3D.clone());
        // this.equipArray.push(node.name);
        //this.role3D.getChildAt(0).addChild(equipSkinedMeshSprite3D.clone());
        equip3D.getChildAt(0)._childs.forEach(function (value, index, array) {
            // var node:Laya.SkinnedMeshSprite3D = value.clone();
            var node = Laya.SkinnedMeshSprite3D.instantiate(value);
            _this.role3D.getChildAt(0).addChild(node);
            //node.skinnedMeshRender._setRootBone(rootBone);
            //this.roleAni.linkSprite3DToAvatarNode(node.skinnedMeshRender._rootBone, node);
            _this.equipArray.push(node.name);
        });
        //equipSkinedMeshSprite3D.transform.localScale = new Laya.Vector3(2.54, 2.54, 2.54);
    };
    /*装备资源加载完成后*/
    LayaAir3D.prototype.onEquipOK = function (targetName, suitName, suitUrl) {
        //创建加载场景
        this.equip3D = Laya.loader.getRes(suitUrl);
        this.equip3D.transform.position = new Laya.Vector3(-3.5, 0, 1);
        this.changeEquip(targetName, this.equip3D);
    };
    /*还原身体*/
    LayaAir3D.prototype.resetBody = function () {
        var _this = this;
        var targetName = this.targetName;
        var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildByName(targetName);
        if (skinedMeshSprite3D == null)
            return;
        skinedMeshSprite3D.active = true;
        this.equipArray.forEach(function (value, index, array) {
            var node = _this.role3D.getChildAt(0).removeChildByName(value);
            node.destroy();
        });
        this.equipArray.splice(0);
        var len = this.equipArray.length;
    };
    /*切换反色率*/
    LayaAir3D.prototype.changeAlbedo = function () {
        //移除角色 SkinnedMeshSprite3D
        var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
        var meshRender = meshSprite3D.meshRender;
        var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
        var skinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender;
        //从模型上获取共享材质
        var sharedMaterial = skinnedMeshRender.sharedMaterial;
        //修改材质的反射颜色，让模型偏红
        sharedMaterial.albedo = new Laya.Vector4(1, 0, 0, 1);
    };
    /*还原反色率*/
    LayaAir3D.prototype.resetAlbedo = function () {
        //移除角色 SkinnedMeshSprite3D
        var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
        var meshRender = meshSprite3D.meshRender;
        var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
        var skinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender;
        //从模型上获取共享材质
        var sharedMaterial = skinnedMeshRender.sharedMaterial;
        //修改材质的反射颜色，让模型偏红
        sharedMaterial.albedo = new Laya.Vector4(1, 1, 1, 1);
    };
    /*切换贴图*/
    LayaAir3D.prototype.changeSkin = function () {
        //创建标准材质
        var material = new Laya.StandardMaterial();
        //创建漫反射二维纹理贴图
        material.diffuseTexture = Laya.Texture2D.load("res/skin/10599999.png");
        //只有设置了渲染模式为透明混合类型才能达到透明效果
        //设置材质蓝色染色及30%半透明
        //material.albedo=new Laya.Vector4(1,1,2,0.3);
        //渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
        //material.renderMode=Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        //为box模型赋材质
        var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(1);
        var skinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender;
        if (this.defaultMaterial == undefined) {
            this.defaultMaterial = skinnedMeshRender.material;
        }
        skinnedMeshRender.material = material;
    };
    /*还原贴图*/
    LayaAir3D.prototype.resetSkin = function () {
        if (this.defaultMaterial != undefined) {
            var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(1);
            var skinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender;
            skinnedMeshRender.material = this.defaultMaterial;
        }
    };
    /*还原贴图*/
    LayaAir3D.prototype.resetSkin2 = function () {
        //创建标准材质
        var material = new Laya.StandardMaterial();
        //创建漫反射二维纹理贴图
        material.diffuseTexture = Laya.Texture2D.load("res/3d/girl/Assets/girl/Textures/20500001.jpg");
        //只有设置了渲染模式为透明混合类型才能达到透明效果
        //设置材质蓝色染色及30%半透明
        //material.albedo=new Laya.Vector4(1,1,2,0.3);
        //渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
        material.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
        //为box模型赋材质
        var skinedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(1);
        var skinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender;
        skinnedMeshRender.material = material;
    };
    /*切换角色*/
    LayaAir3D.prototype.changeRole = function () {
        //移除角色
        this.role3D.removeSelf();
        //移除所有事件监听
        this.roleAni.offAll();
        //当前角色索引
        var index = this.roleArray.indexOf(this.currentRole);
        //下一个角色
        index++;
        if (index > this.roleArray.length - 1) {
            index = 0;
        }
        this.currentRole = this.roleArray[index];
        //创建角色
        this.createRole3D();
    };
    /**
     * 场景角色加载完成后回调
     */
    LayaAir3D.prototype.onSceneOK = function () {
        var _this = this;
        this.assetLoad.update(100);
        Laya.timer.once(1000, null, function () {
            Laya.stage.removeChild(_this.assetLoad);
        });
        //创建加载场景
        this.scene = Laya.loader.getRes(this.sceneName);
        Laya.stage.addChild(this.scene);
        //设置场景在2D界面最后（最底层为第0层）
        Laya.stage.setChildIndex(this.scene, 0);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)
        var camera = new Laya.Camera(0, 0.1, 1000);
        //加载到场景
        this.scene.addChild(camera);
        //移动摄像机位置
        camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
        //设置摄像机视野范围（角度） 
        camera.fieldOfView = 33;
        //创建女孩
        // this.girl3D = Laya.loader.getRes(this.roleArray[0]);
        // this.boy3D = Laya.loader.getRes(this.roleArray[1]);
        //创建角色
        this.createRole3D();
        //创建特效
        this.createEffect3D();
        //默认有头发
        this.changeHair();
    };
    /*创建特效*/
    LayaAir3D.prototype.createEffect3D = function () {
        //创建特效
        this.effect3D = Laya.loader.getRes(this.effectName);
        this.scene.addChild(this.effect3D);
        //特效位置
        this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
        //特效缩放
        this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
    };
    /*创建角色并获取动画组件*/
    LayaAir3D.prototype.createRole3D = function () {
        //创建角色
        this.role3D = Laya.loader.getRes(this.currentRole);
        // Five.RoleUtil.InitGroup(this.role3D);
        //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
        this.roleAni = this.role3D.getChildAt(0).getComponentByType(Laya.Animator);
        //监听动画完成事件
        this.roleAni.on(Laya.Event.COMPLETE, this, this.onAniComplete);
        //播放上一个角色的当前动作
        this.roleAni.play(this.currentActive);
        //角色位置
        this.role3D.transform.position = new Laya.Vector3(-3, 0, 1);
        this.scene.addChild(this.role3D);
    };
    /*动画播放完成后回调*/
    LayaAir3D.prototype.onAniComplete = function () {
        //如果当前的完成动画剪辑名为“play”击球
        if (this.roleAni.currentPlayClip.name == "play") {
            //完成击球后播放准备动作动画
            this.roleAni.play("ready");
            this.currentActive = "ready";
        }
    };
    return LayaAir3D;
}());
new LayaAir3D();
//# sourceMappingURL=LayaAir3D.js.map