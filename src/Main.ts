//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//

//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;



    /**
     * 创建游戏场景
     * Create a game scene
     */
     private IndexCong01 :　egret.Bitmap;
     private IndexCong02 :　egret.Bitmap ;
     private BeginPoint : egret.Point = new egret.Point();
     private EndPoint : egret.Point= new egret.Point();
     private _distance:egret.Point = new egret.Point();
     private Pages : number[] = [1,2];
     private CurrentPage = 0;
     private FinalPage = this.Pages.length -1;
     private _touchStatus = false;
     private PagesArray:egret.DisplayObjectContainer [];
     private dis  = 0;
     private SecondePagePictures : egret.Bitmap [];
     private PictureNum = 0;
     private SecondPagePicturesPoint : egret.Point [];
     private isSecondPage = false;
     private IndexStartingLoge : egret.Bitmap;

    private createGameScene():void {
        let Index:egret.DisplayObjectContainer=new egret.DisplayObjectContainer();
        Index.width = stageW;
        Index.height = stageH;
        Index.x = 0;
        Index.y = 0;

        let SecondPage:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        SecondPage.width = stageW;
        SecondPage.height = stageH;
        SecondPage.x = this.stage.stageWidth;
        SecondPage.y = 0;


        this.PagesArray =[Index,SecondPage]; 

        for(let n = this.PagesArray.length - 1;n >= 0;n--){
            this.addChild(this.PagesArray[n]);
        }




        var sky:egret.Bitmap = this.createBitmapByName("IndexBack_jpg");
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        Index.addChild(sky);

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        Index.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("Touxiang_png");
        icon.width = 140;
        icon.height = 140;
        Index.addChild(icon);
        icon.x = 15;
        icon.y = 50;

        var line = new egret.Shape();
        line.graphics.lineStyle(0.5,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        Index.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "自我介绍";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        Index.addChild(colorLabel);

        var textfield = new egret.TextField();
        Index.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;


        var MainTextMask :egret.Bitmap = this.createBitmapByName("MainBodyMask_png");
        MainTextMask.alpha = 0.5;
        MainTextMask.width = 5*stageW/7;
        MainTextMask.height = 0;
        MainTextMask.x = stageW/7;
        MainTextMask.y = 3*stageH/11;
        Index.addChild(MainTextMask);

        var MainText : egret.TextField = new egret.TextField();
        MainText.textColor = 0xdddddd;
        MainText.textAlign = "Left";
        MainText.size = 25;
        MainText.bold = true;
        MainText.text =  "姓名：韩沁儒\n\n学号：14081104\n\n性别：男\n\n自我介绍：\n\n\n\n  总感觉自我介绍，自我评论什么的好羞耻，就写点别的了，完成这个的时候还不知道怎么根据文件名称读取res中的文本信息，或者像项目里description那样的用法，无奈只能先写这么长的字符串，实在是不优雅_(:з」∠)_";
        MainText.width = 4*stageW/7;
        MainText.x = 40 + stageW/7;
        MainText.y = 90 + 3*stageH/11;
        MainText.alpha = 0;
        Index.addChild(MainText);

        var MainTextLine :egret.Bitmap = this.createBitmapByName("Line_png");
        MainTextLine.alpha = 0;
        MainTextLine.width = 0;
        MainTextLine.height = 280;
        MainTextLine.x = 40 + stageW/7;
        MainTextLine.y = 300 + 3*stageH/11;
        Index.addChild(MainTextLine);

        this.IndexCong01 = this.createBitmapByName("Cong_png")
        this.IndexCong01.width = 120;
        this.IndexCong01.height = 110;
        this.IndexCong01.anchorOffsetX = this.IndexCong01.width / 2;
        this.IndexCong01.anchorOffsetY = this.IndexCong01.height / 2 + 5;
        this.IndexCong01.x = stageW/7;
        this.IndexCong01.y = 3*stageH/11;
        this.IndexCong01.alpha = 0;
        Index.addChild(this.IndexCong01);

        this.IndexCong02 = this.createBitmapByName("Cong_png");
        this.IndexCong02.width = 120;
        this.IndexCong02.height = 110;
        this.IndexCong02.anchorOffsetX = this.IndexCong01.width / 2;
        this.IndexCong02.anchorOffsetY = this.IndexCong01.height / 2 + 5;
        this.IndexCong02.x = 6*stageW/7;
        this.IndexCong02.y = 3*stageH/11 + 5*stageH/8;
        this.IndexCong02.alpha = 0;
        Index.addChild(this.IndexCong02);

        this.IndexStartingLoge = this.createBitmapByName("IndexLogo_png");
        Index.addChild(this.IndexStartingLoge);
        this.IndexStartingLoge.width = 400;
        this.IndexStartingLoge.height = 400;
        this.IndexStartingLoge.anchorOffsetX = this.IndexStartingLoge.width / 2;
        this.IndexStartingLoge.anchorOffsetY = this.IndexStartingLoge.height / 2;
        this.IndexStartingLoge.x = stageW / 2;
        this.IndexStartingLoge.y = stageH / 2;
        this.IndexStartingLoge.touchEnabled = true;


        var sky02:egret.Bitmap = this.createBitmapByName("SecondBack_jpg");
        SecondPage.addChild(sky02);
        sky02.width = stageW;
        sky02.height = stageH;
        sky02.x = 0;
        sky02.y = 0;
        sky02.alpha = 0.6;

        var BlackMask02:egret.Bitmap = this.createBitmapByName("MainBodyMask_png");
        SecondPage.addChild(BlackMask02);
        BlackMask02.width = stageW;
        BlackMask02.height = stageH;
        BlackMask02.x = 0;
        BlackMask02.y = 0;
        BlackMask02.alpha = 0.2;

        


        var Picture01 : egret.Bitmap = this.createBitmapByName("01_jpg");
        SecondPage.addChild(Picture01);
        Picture01.width = 160;
        Picture01.height = 90;
        Picture01.x = 80;
        Picture01.y = 360;
        Picture01.touchEnabled = true;
        Picture01.alpha = 0;
        var temp1 = new egret.Point();
        temp1.x = Picture01.x;
        temp1.y = Picture01.y;
        this.PictureNum++;

        var Picture02 : egret.Bitmap = this.createBitmapByName("02_jpg");
        SecondPage.addChild(Picture02);
        Picture02.width = 160;
        Picture02.height = 90;
        Picture02.x = Picture01.x + Picture01.width;
        Picture02.y = Picture01.y;
        Picture02.touchEnabled = true;
        Picture02.alpha = 0;
        var temp2 = new egret.Point();
        temp2.x = Picture02.x;
        temp2.y = Picture02.y;
        this.PictureNum++;

        var Picture03 : egret.Bitmap = this.createBitmapByName("03_jpg");
        SecondPage.addChild(Picture03);
        Picture03.width = 160;
        Picture03.height = 90;
        Picture03.x = Picture02.x + Picture02.width;
        Picture03.y = Picture02.y;
        Picture03.touchEnabled = true;
        Picture03.alpha = 0;
        var temp3 = new egret.Point();
        temp3.x = Picture03.x;
        temp3.y = Picture03.y;
        this.PictureNum++;

        var Picture04 : egret.Bitmap = this.createBitmapByName("04_jpg");
        SecondPage.addChild(Picture04);
        Picture04.width = 160;
        Picture04.height = 90;
        Picture04.x = Picture01.x;
        Picture04.y = Picture01.y + Picture01.height +80;
        Picture04.touchEnabled = true;
        Picture04.alpha = 0;
        var temp4 = new egret.Point();
        temp4.x = Picture04.x;
        temp4.y = Picture04.y;
        this.PictureNum++;

        var Picture05 : egret.Bitmap = this.createBitmapByName("05_png");
        SecondPage.addChild(Picture05);
        Picture05.width = 160;
        Picture05.height = 90;
        Picture05.x = Picture04.x + Picture04.width;
        Picture05.y = Picture04.y;
        Picture05.touchEnabled = true;
        Picture05.alpha = 0;
        var temp5 = new egret.Point();
        temp5.x = Picture05.x;
        temp5.y = Picture05.y;
        this.PictureNum++;

        var Picture06 : egret.Bitmap = this.createBitmapByName("06_jpg");
        SecondPage.addChild(Picture06);
        Picture06.width = 160;
        Picture06.height = 90;
        Picture06.x = Picture05.x + Picture05.width;
        Picture06.y = Picture05.y;
        Picture06.touchEnabled = true;
        Picture06.alpha = 0;
        var temp6 = new egret.Point();
        temp6.x = Picture06.x;
        temp6.y = Picture06.y;
        this.PictureNum++;

        var Picture07 : egret.Bitmap = this.createBitmapByName("07_jpg");
        SecondPage.addChild(Picture07);
        Picture07.width = 160;
        Picture07.height = 90;
        Picture07.x = Picture04.x;
        Picture07.y = Picture04.y + Picture04.height +80;
        Picture07.touchEnabled = true;
        Picture07.alpha = 0;
        var temp7 = new egret.Point();
        temp7.x = Picture07.x;
        temp7.y = Picture07.y;
        this.PictureNum++;
        
        var Picture08 : egret.Bitmap = this.createBitmapByName("08_jpg");
        SecondPage.addChild(Picture08);
        Picture08.width = 160;
        Picture08.height = 90;
        Picture08.x = Picture07.x + Picture07.width;
        Picture08.y = Picture07.y;
        Picture08.touchEnabled = true;
        Picture08.alpha = 0;
        var temp8 = new egret.Point();
        temp8.x = Picture08.x;
        temp8.y = Picture08.y;
        this.PictureNum++;

        var Picture09 : egret.Bitmap = this.createBitmapByName("09_jpg");
        SecondPage.addChild(Picture09);
        Picture09.width = 160;
        Picture09.height = 90;
        Picture09.x = Picture08.x + Picture08.width;
        Picture09.y = Picture08.y;
        Picture09.touchEnabled = true;
        Picture09.alpha = 0;
        var temp9 = new egret.Point();
        temp9.x = Picture09.x;
        temp9.y = Picture09.y;

        var SecondPageMikuQiangJing :egret.Bitmap = this.createBitmapByName("MikuQiangjing_png");
        SecondPage.addChild(SecondPageMikuQiangJing);
        SecondPageMikuQiangJing.width = 150;
        SecondPageMikuQiangJing.height = 150;
        SecondPageMikuQiangJing.x = stageW;
        SecondPageMikuQiangJing.y = stageH;

        var BackPicture01:egret.Bitmap = this.createBitmapByName("MainBodyMask_png");
        SecondPage.addChild(BackPicture01);
        BackPicture01.width = stageW;
        BackPicture01.height = 360;
        BackPicture01.x = 0;
        BackPicture01.y = 0;
        BackPicture01.alpha = 0;
        BackPicture01.touchEnabled = true;

        var BackPicture02:egret.Bitmap = this.createBitmapByName("MainBodyMask_png");
        SecondPage.addChild(BackPicture02);
        BackPicture02.width = stageW;
        BackPicture02.height = stageH - Picture09.y;
        BackPicture02.x = 0;
        BackPicture02.y = Picture09.y + 90;
        BackPicture02.alpha = 0;
        BackPicture02.touchEnabled = true;

        this.SecondPagePicturesPoint = [temp1,temp2,temp3,temp4,temp5,temp6,temp7,temp8,temp9];
        this.SecondePagePictures = [Picture01,Picture02,Picture03,Picture04,Picture05,Picture06,Picture07,Picture08,Picture09];
        this.PictureNum++;


        var SecondPageTitleLine : egret.Bitmap = this.createBitmapByName("LineForOne_png");
        SecondPage.addChild(SecondPageTitleLine);
        SecondPageTitleLine.width = 0;
        SecondPageTitleLine.height = 5;
        SecondPageTitleLine.x = 50;
        SecondPageTitleLine.y = 200;

        var SecondPageTitleText : egret.TextField = new egret.TextField();
        SecondPage.addChild(SecondPageTitleText);
        SecondPageTitleText.textColor = 0x33c0b8;
        SecondPageTitleText.textAlign = "Left";
        SecondPageTitleText.size = 50;
        SecondPageTitleText.bold = true;
        SecondPageTitleText.text = "Picture Show";
        SecondPageTitleText.x = 50;
        SecondPageTitleText.y = 170 - SecondPageTitleText.height;
        SecondPageTitleText.alpha = 0;
        SecondPageTitleText.stroke = 5;
        SecondPageTitleText.strokeColor = 0x137564;

        SecondPage.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if( this.isSecondPage ){
              egret.Tween.get(SecondPageTitleText).to({alpha : 1},800);
              egret.Tween.get(SecondPageTitleLine).to({width : 400},800)
              let tw_Picture01 = egret.Tween.get(Picture01);
              let tw_Picture02 = egret.Tween.get(Picture02);
              let tw_Picture03 = egret.Tween.get(Picture03);
              let tw_Picture04 = egret.Tween.get(Picture04);
              let tw_Picture05 = egret.Tween.get(Picture05);
              let tw_Picture06 = egret.Tween.get(Picture06);
              let tw_Picture07 = egret.Tween.get(Picture07);
              let tw_Picture08 = egret.Tween.get(Picture08);
              let tw_Picture09 = egret.Tween.get(Picture09);
              let tw_MikuQiangJing = egret.Tween.get(SecondPageMikuQiangJing);
              tw_Picture01.wait(800);
              tw_Picture01.to({alpha : 1},800);
              tw_Picture02.wait(1200);
              tw_Picture02.to({alpha : 1},800);
              tw_Picture03.wait(1600);
              tw_Picture03.to({alpha : 1},800);
              tw_Picture04.wait(2000);
              tw_Picture04.to({alpha : 1},800);
              tw_Picture05.wait(2400);
              tw_Picture05.to({alpha : 1},800);
              tw_Picture06.wait(2800);
              tw_Picture06.to({alpha : 1},800);
              tw_Picture07.wait(3200);
              tw_Picture07.to({alpha : 1},800);
              tw_Picture08.wait(3600);
              tw_Picture08.to({alpha : 1},800);
              tw_Picture09.wait(4000);
              tw_Picture09.to({alpha : 1},800);
              tw_MikuQiangJing.wait(4800);
              tw_MikuQiangJing.to({x : stageW - SecondPageMikuQiangJing.width + 20 , y : stageH - SecondPageMikuQiangJing.height + 20},800);

              
        }
        },SecondPage);
        


        BackPicture01.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                egret.Tween.get(BlackMask02).to({alpha : 0.2 } , 400);
            for(let n = 0 ; n < this.PictureNum ; n++){
                egret.Tween.get(this.SecondePagePictures[n]).to({ x : this.SecondPagePicturesPoint[n].x , y : this.SecondPagePicturesPoint[n].y , width : 160 , height : 90},400)
            }
        },SecondPage );

        BackPicture02.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                egret.Tween.get(BlackMask02).to({alpha : 0.2 } , 400);
            for(let n = 0 ; n < this.PictureNum ; n++){
                egret.Tween.get(this.SecondePagePictures[n]).to({ x : this.SecondPagePicturesPoint[n].x , y : this.SecondPagePicturesPoint[n].y , width : 160 , height : 90},400)
            }
        },SecondPage );

        Picture01.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture01,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture01).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture02.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture02,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture02).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture03.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture03,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture03).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture04.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture04,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture04).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture05.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture05,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture05).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture06.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture06,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture06).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture07.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture07,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture07).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture08.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture08,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture08).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

        Picture09.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(Picture09,SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(Picture09).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );

 /*       for(let n = 0; n < this.CurrentPage - 1 ; n++){
            this.SecondePagePictures[n].addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                SecondPage.setChildIndex(this.SecondePagePictures[n],SecondPage.numChildren-1);
                egret.Tween.get(BlackMask02).to({alpha : 0.8 } , 400);
                egret.Tween.get(this.SecondePagePictures[n]).to({ x : 0 , y : 388 , width : 640 , height : 360},400)
            }, SecondPage );
        }
*/
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
/*        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt :egret.TouchEvent)=>{
            this.BeginPoint.x = evt.stageX;
            }, this );

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (evt :egret.TouchEvent)=>{
            this._distance.x = this.BeginPoint.x - evt.stageX ;
            for(let n = 0 ; n < this.FinalPage + 1 ; n++ ){
                this.PagesArray[n].x -= this._distance.x;
                }
            //Index.x -= this._distance.x/100;
            //SecondPage.x -= this._distance.x/100;
            }, this );

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, (evt :egret.TouchEvent)=>{
            this._distance.x = this.BeginPoint.x - evt.stageX;

            if(this.Pages[this.CurrentPage] == 1){
                if(this._distance.x <= stageW / 2){
                egret.Tween.get(Index).to({x : 0} , 400);
                egret.Tween.get(SecondPage).to({x : stageW} , 400);
                }
                else {
                      
                         for(let n = 0 ; n < this.FinalPage + 1 ; n++ ){
                          let Pdistance = this.PagesArray[n].x + this._distance.x - stageW ;
                          egret.Tween.get(this.PagesArray[n]).to({x : Pdistance} , 400);
                          }
                         this.CurrentPage++;
                      
                }
                
            }

            if(this.Pages[this.CurrentPage] == this.FinalPage + 1 ){
                if(this._distance.x >= - stageW / 2){
                egret.Tween.get(this.PagesArray[this.FinalPage - 1]).to({x : -stageW} , 400);
                egret.Tween.get(this.PagesArray[this.FinalPage]).to({x : 0} , 400);
                }
                else {
                      
                         for(let n = 0 ;n < this.FinalPage + 1 ;n++ ){
                             let Pdistance = this.PagesArray[n].x + this._distance.x + stageW;
                          egret.Tween.get(this.PagesArray[n]).to({x : Pdistance} , 400);
                          }
                         this.CurrentPage--;
                      
                }

            }
            }, this );
*/






        this.IndexStartingLoge.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            egret.Tween.get(this.IndexStartingLoge).to({alpha : 0} , 200);
            egret.Tween.get(MainTextMask).to({height : 5*stageH/8},900);
            let tw_MainText = egret.Tween.get(MainText);
            let tw_MainTextLine = egret.Tween.get(MainTextLine);
            let tw_IndexCong01 = egret.Tween.get(this.IndexCong01);
            let tw_IndexCong02 = egret.Tween.get(this.IndexCong02);
            tw_MainText.wait(950);
            tw_MainTextLine.wait(950);
            tw_IndexCong01.wait(950);
            tw_IndexCong02.wait(950);
            tw_MainText.to({alpha : 0.8},600);
            tw_MainTextLine.to({width : 4*stageW/7,alpha : 0.8},600);
            tw_IndexCong01.to({alpha : 1},300);
            tw_IndexCong02.to({alpha : 1},300);
        }, this );

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }



    private mouseDown(evt:egret.TouchEvent)
    {
        this._touchStatus = true;
        this.BeginPoint.x = evt.stageX;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
            this._distance.x = this.BeginPoint.x - evt.stageX ;
            for(let n = 0 ; n < this.FinalPage + 1 ; n++ ){
                this.PagesArray[n].x -= this._distance.x/100;
                }
            this.dis += this._distance.x/100;
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        this._touchStatus = false;


        this._distance.x = this.BeginPoint.x - evt.stageX;

            if(this.Pages[this.CurrentPage] == 1){          //第一页的情况
                if(this._distance.x <= this.stage.stageWidth / 2){
                egret.Tween.get(this.PagesArray[0]).to({x : 0} , 400);
                egret.Tween.get(this.PagesArray[1]).to({x : this.stage.stageWidth} , 400);
                this.dis = 0;
                }
                else {
                      
                         for(let n = 0 ; n < this.FinalPage + 1 ; n++ ){
                          let Pdistance = this.PagesArray[n].x + this.dis - this.stage.stageWidth;
                          egret.Tween.get(this.PagesArray[n]).to({x : Pdistance} , 400);
                          }
                         this.CurrentPage++;
                         this.isSecondPage = true;
                         this.dis = 0;
                      
                }
                
            }



            if( this.Pages[this.CurrentPage] > 1 && this.Pages[this.CurrentPage] < this.FinalPage + 1 ){//中间页的情况
                if(this._distance.x >= - this.stage.stageWidth / 2 && this._distance.x <= this.stage.stageWidth / 2){
                    egret.Tween.get(this.PagesArray[this.CurrentPage]).to({x : 0},400);
                    egret.Tween.get(this.PagesArray[this.CurrentPage - 1]).to({x : - this.stage.stageWidth},400);
                    egret.Tween.get(this.PagesArray[this.CurrentPage + 1]).to({x : this.stage.stageWidth},400);
                    this.dis = 0;
                }

                if(this._distance.x < - this.stage.stageWidth / 2){
                    for(let n = 0 ;n < this.FinalPage + 1 ;n++ ){
                             let Pdistance = this.PagesArray[n].x + this.dis + this.stage.stageWidth;
                          egret.Tween.get(this.PagesArray[n]).to({x : Pdistance} , 400);
                          }
                         this.CurrentPage--;
                         this.dis = 0;
                }

                if(this._distance.x > this.stage.stageWidth / 2){
                    for(let n = 0 ; n < this.FinalPage + 1 ; n++ ){
                          let Pdistance = this.PagesArray[n].x + this.dis - this.stage.stageWidth;
                          egret.Tween.get(this.PagesArray[n]).to({x : Pdistance} , 400);
                          }
                         this.CurrentPage++;
                         this.dis = 0;
                }
            }


            if(this.Pages[this.CurrentPage] == this.FinalPage + 1 ){     //最后一页的情况
                if(this._distance.x >= - this.stage.stageWidth / 2){
                egret.Tween.get(this.PagesArray[this.FinalPage - 1]).to({x : - this.stage.stageWidth} , 400);
                egret.Tween.get(this.PagesArray[this.FinalPage]).to({x : 0} , 400);
                this.dis = 0;
                }
                else {
                      
                         for(let n = 0 ;n < this.FinalPage + 1 ;n++ ){
                             let Pdistance = this.PagesArray[n].x + this.dis + this.stage.stageWidth;
                          egret.Tween.get(this.PagesArray[n]).to({x : Pdistance} , 400);
                          }
                         this.CurrentPage--;
                         this.isSecondPage = false;
                         this.dis = 0;
                      
                }

            }


        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */

    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };


        var CongRoated:Function = function(){
            let tw_IndexCong01 = egret.Tween.get(self.IndexCong01);
            let tw_IndexCong02 = egret.Tween.get(self.IndexCong02);
            tw_IndexCong01.to({rotation : 360},6000);
            tw_IndexCong02.to({rotation : -360},6000);
            tw_IndexCong01.call(CongRoated,self);
        }

        var IndexLogoRoated:Function = function(){
            let tw_IndexStartingLoge = egret.Tween.get(self.IndexStartingLoge);
            tw_IndexStartingLoge.to({rotation : -360},6500);
            tw_IndexStartingLoge.call(CongRoated,self);
        }


        change();
        CongRoated();
        IndexLogoRoated();
        
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


