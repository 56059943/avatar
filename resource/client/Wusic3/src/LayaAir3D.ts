// 程序入口

class LayaAir3D {
        /*****3D场景******/
    private scene: Laya.Scene;
    /*3D角色*/
    private role3D: Laya.Sprite3D;
        /*3D角色*/
    private role3DRotation: Laya.Vector3 = new Laya.Vector3();
    /*****角色控制界面******/
    private control: ControlView;
    /*****角色资源名数组******/
    // private roleArray: Array<any> = ["res/girl/girl.lh", "res/boy/boy.lh"];
    private roleArray: Array<any> = ["res/girl/girl.lh"];
    /*当前场景中角色资源*/
    private currentRole: string = "res/girl/girl.lh";
    /*当前场景中特效资源*/
    private effectName: string = "LayaScene_effect/effect.lh";
    /*当前场景资源*/
    private sceneName: string = "LayaScene_scene02/scene02.ls";

    /*当前角色动画组件*/
    private roleAni: Laya.Animator;
    /**
     * 默认角色动作
     * idle run walk
     */
    private currentActive: string = Five.AnimatorDef.RUN;
    /*3D特效*/
    private effect3D: Laya.Sprite3D;
     /*默认材质*/
    private defaultMaterial:Laya.BaseMaterial;

    /**
     * 换装
     * 目标
     * targetName 需要更换的部位
     * 替换的套装
     * suitName （20700815 格子裙）（20700455 花裙）
     * 
     */
    private targetName: string = "20700001";
    private suitName: string = "20700455";
    /*套装资源*/
    private equip3D: Laya.Sprite3D;
    private equipArray: Array<any> = [];
    private girl3D:Laya.Sprite3D;
    private boy3D:Laya.Sprite3D;
    
    //
    private assetLoad: ProgressView;

    constructor() {
        // var q = five.defs.Part3D.HEAD;
        // var v = Five.Part3D.HEAD;
        // Laya.AnimationContent;
        // console.log("q:"+q);
        // console.log("v:"+v);

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
    private onUIComplete(): void {
        this.roleArray.splice(0);
        this.roleArray.push(Five.ResUtil.get3DUrl("girl"));//女孩模型
        this.roleArray.push(Five.ResUtil.get3DUrl("20200279"));//女孩
        this.currentRole = this.roleArray[0];

        //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
        var urls:any = [{ url: this.sceneName },
        { url: this.effectName }
        ];
        this.roleArray.forEach((value:string, index:number, array:string[]) =>{
            urls.push(value);
        });
        Laya.loader.create(urls, Laya.Handler.create(this, this.onSceneOK), Laya.Handler.create(this, this.onSceneProgress, null, false));
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
    }

    private onSceneProgress(value:number):void{
        var progress = Math.floor(value * 100);
        this.assetLoad.update(progress);
    }

    
    private onBtnRotate(action: number): void {
       this.role3DRotation.y = action;
        //旋转摄像机角度
        this.role3D.transform.rotate(this.role3DRotation, true, false);

        // console.log("[debug] LayaAir3D onBtnRotate:", action, this.role3DRotation.y, this.role3D.transform.localRotation.y);

    }

        /*控制界面动作监听回调
     action:当前执行的控制名称
    */
    private onBtnAction(action: string): void {
        if (action == "change") {
            //切换角色
            this.changeRole();
        } else if (action == "playAni") {
            //播放当前动作
            this.roleAni.play(this.currentActive);
        } else if (action == "stopAni") {
            //停止动画
            this.roleAni.stop();
        } else if (action == "idle" || action == "run" || action == "idle" || action == "run") {
            //播放动作
            this.roleAni.play(action);
            this.currentActive = action;
        }else if (action == "changeAlbedo") {
            //切换反色率
            this.changeAlbedo();
        } else if (action == "resetAlbedo") {
            //还原反色率
            this.resetAlbedo();
        } else if (action == "changeSkin") {
            //切换贴图
            this.changeSkin();
        } else if (action == "resetSkin") {
            //还原贴图
            this.resetSkin();
        }else if (action == "resetSkin2") {
            //还原贴图
            this.resetSkin2();
        }else if (action == "changeBody") {
            //切换身体
            this.changeBody();
        } else if (action == "resetBody") {
            //还原身体
            this.resetBody();
        }else if (action == "scaleBody") {
            //缩放身体
            this.scaleBody();
        }else if (action == "cloneAnimator") {
            //克隆动作
            this.cloneAnimator();
        }else if (action == "resetHair") {
            //还原贴图
            this.resetHair();
        }else if (action == "changeHair") {
            //切换身体
            this.changeHair();
        } 

    }

    /*还原身体*/
    private resetHair(): void {
        var suitName = "20200279";
        var suitUrl: string = Five.ResUtil.get3DUrl(suitName);
        // this.role3D.getChildAt(0).removeChildByName(suitName);
        // Laya.loader.clearRes(suitUrl);
        this.role3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
            if (value._getGroup() == "02")
            {
                this.role3D.getChildAt(0).removeChild(value);
            }
         });
    }
    /*切换身体*/
    private changeHair(): void {
        //被替换部位
        var targetName = this.targetName;
        //替换套装
       var suitName = "20200279";
        var suitUrl: string = Five.ResUtil.get3DUrl(suitName);
        Laya.loader.create([{ url: suitUrl }
        ], Laya.Handler.create(this, this.onHairEquipOK, [targetName, suitName, suitUrl]));
    }

        /*装备资源加载完成后*/
    private onHairEquipOK(targetName, suitName, suitUrl): void {
        //创建加载场景
        var hair3D:Laya.Sprite3D = Laya.loader.getRes(suitUrl) as Laya.Sprite3D;
        hair3D.transform.position = new Laya.Vector3(-3.5, 0, 1);
        hair3D.name = suitName;
        // this.role3D.getChildAt(0).addChild(hair3D);

        hair3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
            var node:Laya.SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D.instantiate(value) as Laya.SkinnedMeshSprite3D;
            node._setGroup("02");
            this.role3D.getChildAt(0).addChild(node);
         });
    }

     /*克隆动作*/
    private cloneAnimator(): void {
        // var com:Laya.Animator = new Laya.Animator();
        // this.roleAni._cloneTo(com);
        // var s:Laya.Sprite3D = (this.equip3D.getChildAt(0) as Laya.Sprite3D);
        // s.componentsCount;
        // (this.equip3D.getChildAt(0) as Laya.Sprite3D).addComponent(com);
        
    }
        /*切换身体*/
    private scaleBody(): void {
        if (this.equip3D == null || this.equip3D == undefined) return;
        if (this.equip3D.transform.scale.x > 1)
        {
            this.equip3D.transform.scale = new Laya.Vector3(1.0, 1.0, 1.0);
        }
        else
        {
            this.equip3D.transform.scale = new Laya.Vector3(1.5, 1.5, 1.5);
        }
        
    }
    /*切换身体*/
    private changeBody(): void {
        //被替换部位
        var targetName = this.targetName;
        //替换套装
        var suitName: string = this.suitName;
        var suitUrl: string = Five.ResUtil.get3DUrl(this.suitName);
        Laya.loader.create([{ url: suitUrl }
        ], Laya.Handler.create(this, this.onEquipOK, [targetName, suitName, suitUrl]));

    }
    private changeEquip(targetName, equip3D:Laya.Sprite3D): void {
        //targetName = "20700001";
        //suitName = this.suitName;
        var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildByName(targetName) as Laya.SkinnedMeshSprite3D;
        if (skinedMeshSprite3D == null || skinedMeshSprite3D.active == false) return;
        var skinnedMeshRender:Laya.SkinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender as Laya.SkinnedMeshRender;
        // var rootBone = skinnedMeshRender._rootBone;
        // this.role3D.getChildAt(0).removeChildByName(targetName);
        skinedMeshSprite3D.active = false;

        // var handBip: Laya.Sprite3D = this.role3D.getChildAt(0).getChildByName("Bip01") as Laya.Sprite3D;

        // var node = this.role3D.getChildAt(0).addChild(equip3D.clone());
        // this.equipArray.push(node.name);

         //this.role3D.getChildAt(0).addChild(equipSkinedMeshSprite3D.clone());
         equip3D.getChildAt(0)._childs.forEach((value:Laya.SkinnedMeshSprite3D, index: number, array: Laya.SkinnedMeshSprite3D[]) => {
            // var node:Laya.SkinnedMeshSprite3D = value.clone();
            var node:Laya.SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D.instantiate(value) as Laya.SkinnedMeshSprite3D;
            this.role3D.getChildAt(0).addChild(node);
           //node.skinnedMeshRender._setRootBone(rootBone);
            //this.roleAni.linkSprite3DToAvatarNode(node.skinnedMeshRender._rootBone, node);
            this.equipArray.push(node.name);
         });


        //equipSkinedMeshSprite3D.transform.localScale = new Laya.Vector3(2.54, 2.54, 2.54);
    }

    /*装备资源加载完成后*/
    private onEquipOK(targetName, suitName, suitUrl): void {
        //创建加载场景
        this.equip3D = Laya.loader.getRes(suitUrl);
        this.equip3D.transform.position = new Laya.Vector3(-3.5, 0, 1);
        this.changeEquip(targetName, this.equip3D);
    }

    /*还原身体*/
    private resetBody(): void {
        var targetName = this.targetName;
        var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildByName(targetName) as Laya.SkinnedMeshSprite3D;
        if (skinedMeshSprite3D == null) return;
        skinedMeshSprite3D.active = true;

        this.equipArray.forEach((value:string, index: number, array: string[]) => {
            var node = this.role3D.getChildAt(0).removeChildByName(value);
            node.destroy();
         });
        this.equipArray.splice(0);
        var len = this.equipArray.length;
    }

    /*切换反色率*/
    private changeAlbedo(): void {
        //移除角色 SkinnedMeshSprite3D
        var meshSprite3D:Laya.MeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
        var meshRender:Laya.MeshRender = meshSprite3D.meshRender as Laya.MeshRender;

        var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D;
        var skinnedMeshRender:Laya.SkinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender as Laya.SkinnedMeshRender;
        //从模型上获取共享材质
        var sharedMaterial:Laya.StandardMaterial =  skinnedMeshRender.sharedMaterial as Laya.StandardMaterial;
        //修改材质的反射颜色，让模型偏红
        sharedMaterial.albedo=new Laya.Vector4(1,0,0,1);   
    }

    /*还原反色率*/
    private resetAlbedo(): void {
        //移除角色 SkinnedMeshSprite3D
        var meshSprite3D:Laya.MeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
        var meshRender:Laya.MeshRender = meshSprite3D.meshRender as Laya.MeshRender;

        var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D;
        var skinnedMeshRender:Laya.SkinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender as Laya.SkinnedMeshRender;
        //从模型上获取共享材质
        var sharedMaterial:Laya.StandardMaterial =  skinnedMeshRender.sharedMaterial as Laya.StandardMaterial;
        //修改材质的反射颜色，让模型偏红
        sharedMaterial.albedo=new Laya.Vector4(1,1,1,1);   
    }

        /*切换贴图*/
    private changeSkin(): void {
           //创建标准材质
            var material:Laya.StandardMaterial = new Laya.StandardMaterial();
            //创建漫反射二维纹理贴图
            material.diffuseTexture = Laya.Texture2D.load("res/skin/10599999.png");     
            //只有设置了渲染模式为透明混合类型才能达到透明效果
            //设置材质蓝色染色及30%半透明
            //material.albedo=new Laya.Vector4(1,1,2,0.3);
            //渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
            //material.renderMode=Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
            //为box模型赋材质
            var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(1) as Laya.SkinnedMeshSprite3D;
            var skinnedMeshRender:Laya.SkinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender as Laya.SkinnedMeshRender;
            if (this.defaultMaterial == undefined)
            {
                this.defaultMaterial = skinnedMeshRender.material;
            }
            skinnedMeshRender.material = material;
    }

    /*还原贴图*/
    private resetSkin(): void {
            if (this.defaultMaterial != undefined)
            {
                var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(1) as Laya.SkinnedMeshSprite3D;
                var skinnedMeshRender:Laya.SkinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender as Laya.SkinnedMeshRender;
                skinnedMeshRender.material = this.defaultMaterial;
            }
    }

        /*还原贴图*/
    private resetSkin2(): void {
           //创建标准材质
            var material:Laya.StandardMaterial = new Laya.StandardMaterial();
            //创建漫反射二维纹理贴图
            material.diffuseTexture = Laya.Texture2D.load("res/3d/girl/Assets/girl/Textures/20500001.jpg");     
            //只有设置了渲染模式为透明混合类型才能达到透明效果
            //设置材质蓝色染色及30%半透明
            //material.albedo=new Laya.Vector4(1,1,2,0.3);
            //渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
            material.renderMode=Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;
            //为box模型赋材质
            var skinedMeshSprite3D:Laya.SkinnedMeshSprite3D = this.role3D.getChildAt(0).getChildAt(1) as Laya.SkinnedMeshSprite3D;
            var skinnedMeshRender:Laya.SkinnedMeshRender = skinedMeshSprite3D.skinnedMeshRender as Laya.SkinnedMeshRender;
            skinnedMeshRender.material = material;
    }
    
    
    /*切换角色*/
    private changeRole(): void {
        //移除角色
        this.role3D.removeSelf();
        //移除所有事件监听
        this.roleAni.offAll();
        //当前角色索引
        var index: number = this.roleArray.indexOf(this.currentRole);
        //下一个角色
        index++;
        if (index > this.roleArray.length - 1) {
            index = 0;
        }
        this.currentRole = this.roleArray[index];
        //创建角色
        this.createRole3D();
    }
    /**
     * 场景角色加载完成后回调
     */
    private onSceneOK(): void {
        this.assetLoad.update(100);
        Laya.timer.once(1000, null, ()=>{
            Laya.stage.removeChild(this.assetLoad);
        })


        //创建加载场景
        this.scene = Laya.loader.getRes(this.sceneName);
        Laya.stage.addChild(this.scene);
        //设置场景在2D界面最后（最底层为第0层）
        Laya.stage.setChildIndex(this.scene, 0);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)
        var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
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
    }
    /*创建特效*/
    private createEffect3D(): void {
        //创建特效
        this.effect3D = Laya.loader.getRes(this.effectName);
        this.scene.addChild(this.effect3D);
        //特效位置
        this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
        //特效缩放
        this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
    }
    /*创建角色并获取动画组件*/
    private createRole3D(): void {
        //创建角色
        this.role3D = Laya.loader.getRes(this.currentRole);
        // Five.RoleUtil.InitGroup(this.role3D);

        //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
        this.roleAni = (this.role3D.getChildAt(0) as Laya.Sprite3D).getComponentByType(Laya.Animator) as Laya.Animator;
        //监听动画完成事件
        this.roleAni.on(Laya.Event.COMPLETE, this, this.onAniComplete);
          //播放上一个角色的当前动作
        this.roleAni.play(this.currentActive);

        //角色位置
        this.role3D.transform.position = new Laya.Vector3(-3, 0, 1);
        this.scene.addChild(this.role3D);
    }
    /*动画播放完成后回调*/
    private onAniComplete(): void {
        //如果当前的完成动画剪辑名为“play”击球
        if (this.roleAni.currentPlayClip.name == "play") {
            //完成击球后播放准备动作动画
            this.roleAni.play("ready");
            this.currentActive = "ready";
        }
    }
}
new LayaAir3D();