var MyGameLayer = cc.LayerColor.extend({
    ctor:function () {
        this._super();
	//init members
	this.background = null;
	this.batterySprite = null;
	this.candles=[];
	this.fires=[];
	this.plates=[];
	this.count = 0;
	this.batteryActivated=false;
	this.foucusCandle=null;
	this.isFinished= false;

        this.init();
	if('keyboard' in sys.capabilities){
	    this.setKeyboardEnabled(true);
	}
	if('mouse' in sys.capabilities){
	    this.setMouseEnabled(true);
	}
    },
    init:function () {
	//this._super(cc.c4b(255,255,255,255));
	/******** My Code ********/
	//init background
	this._super(cc.c4b(236,232,178,255));
	this.background = cc.Sprite.create(bg_img);
	this.background.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);
	this.addChild(this.background);
	//init menu
	this.initMenu();
	//init battery
	this.batterySprite = new BatterySprite;
	this.addChild(this.batterySprite);
	//init plates
	this.initPlates();
	//init candles
	for(var i = 0; i < 5; i++){
	    this.addCandle();
	}
	this.schedule(this.gameLogic,0);
	this.scheduleOnce(function(){//白天->黄昏
	    this.setBackground(afternoon_img);
	    gSharedEngine.playEffect(time_warn);
	},20);
	this.scheduleOnce(function(){//黄昏->夜晚
	    this.setBackground(night_img);
	    gSharedEngine.playEffect(time_warn);
	},40);
	this.scheduleOnce(function(){//黄昏->夜晚
	    if(!this.gameFinishCheck()){
		this.isFinished = true;
		this.showGameOver();
	    }
	},60);

        return true;
    },
    restart:function(){
	var scene = this.getParent();
	//this.removeAllChildren(true);
	this.removeFromParent(true);
	var mainLayer = new MyGameLayer();
	scene.addChild(mainLayer);
	gSharedEngine.playMusic(background_music);
	//alert("#" + this.plates.length + "#" + layer.plates.length + "#");
        //var nextScene = new MyGameScene;
        //cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, nextScene));

	//this.candles = [];
	//this.fires = [];
	//this.count = 0;
	//this.batterySprite=null;
	//this.plates=[];
	//this.batteryActivated=false;
	//this.foucusCandle=null;
	//this.isFinished = false;
	//this.removeAllChildren(true);
	//this.unscheduleAllCallbacks();
	//this.init();
    },
    setBackground:function(file){
	var action1 = cc.FadeOut.create(2)//cc.FadeTo.create(2,0.4);
	var action2 = cc.CallFunc.create(function(){
	    this.background.initWithFile(file);
	},this);
	var action3 = cc.FadeIn.create(2);//cc.FadeTo.create(2,0.8);
	//this.background.runAction(action2);
	this.background.runAction(cc.Sequence.create(action1,action2,action3));
    },
    gameLogic:function(){
	this.fireCandleCheck();
	if(this.gameFinishCheck() && !this.isFinished){
	    this.isFinished = true;
	    this.showGameWin();
	}
    },
    gameFinishCheck:function(){
	if(this.count == 15 || this.isFinished){
	    this.count = 0;
	    return true;
	} else return false;
    },
    addCandle:function(){
	if(this.count >= 11 || this.isFinished) return;
	var candleSprite = new CandleSprite;
	this.addChild(candleSprite);
	this.candles.push(candleSprite);
    },
    showGameWin:function(){
	this.unscheduleAllCallbacks();
	var _thisObj = this;
	var action = cc.Sequence.create(
	    cc.FadeTo.create(2,0.5),
	    cc.CallFunc.create(function(){
		_thisObj.batterySprite.removeFromParent(true);
	    })
	);
	this.batterySprite.runAction(action);

	gSharedEngine.playMusic(happy_birthday_audio);

	var cake = cc.Sprite.create(cake_img);
	cake.setPosition(this.batterySprite.getPosition().x,this.getContentSize().height);
	this.addChild(cake);
	//var jumpTo = cc.p(this.batterySprite.getPosition().x,this.batterySprite.getPosition().y + this.batterySprite.getContentSize().width/2 + cake.getContentSize().height);
	var jumpTo = this.batterySprite.getPosition();
	cake.runAction(cc.JumpTo.create(2,jumpTo,cake.getContentSize().height,4));
    },
    showGameOver:function(){
	this.unscheduleAllCallbacks();
	gSharedEngine.playEffect(game_over_audio);
	var result = cc.Sprite.create(game_over_img);
	result.setPosition(this.getContentSize().width/2,this.getContentSize().height/2);

	var action = cc.Spawn.create(cc.FadeIn.create(1),cc.ScaleTo.create(1,2),cc.RotateBy.create(1,360));
	result.runAction(action);
	
	this.addChild(result);
    },
    initMenu:function(){
	var itemStartGame = cc.MenuItemImage.create(
		restart_nor_btn,restart_down_btn,
	this.restart,
	this);
	var x =itemStartGame.getContentSize().width/2;
	var y = WIN_SIZE.height-itemStartGame.getContentSize().height/2;
	itemStartGame.setPosition(x,y);
	var menu = cc.Menu.create(itemStartGame);
	menu.setPosition(0,0);
	this.addChild(menu);
    },
    initPlates:function(){
	var oX = WIN_SIZE.width/2;
	var oY = WIN_SIZE.height/2;
	var loX = oX - 230;
	var loY = oY + 230;
	var roX = oX + 230;
	var roY = oY + 230;
	var boX = oX;
	var boY = oY - 230;

	//每个托盘之间的间距
	var angle = 30;
	var d = 100;
	var dx = 55;//d * 0.866;
	var dy = 15;//d * 0.5;

	var  plateSprite;
	//左边盘子
	plateSprite = new PlateSprite;//1
	plateSprite.setRotation(0);
	var x = loX;
	var y = loY;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//2
	plateSprite.setRotation(angle);
	var x = loX + dx;
	var y = loY - dy;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//3
	plateSprite.setRotation(45);
	var x = loX + dx*1.8;
	var y = loY - dy*3;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//4
	plateSprite.setRotation(-angle);
	var x = loX - dx;
	var y = loY - dy;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//5
	plateSprite.setRotation(-45);
	var x = loX - dx*1.8;
	var y = loY - dy*3;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	//右边的盘子
	plateSprite = new PlateSprite;//1
	plateSprite.setRotation(0);
	var x = roX;
	var y = roY;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//2
	plateSprite.setRotation(30);
	var x = roX + dx;
	var y = roY - dy;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//3
	plateSprite.setRotation(45);
	var x = roX + dx*1.8;
	var y = roY - dy*3;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//4
	plateSprite.setRotation(-30);
	var x = roX - dx;
	var y = roY - dy;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//5
	plateSprite.setRotation(-45);
	var x = roX - dx*1.8;
	var y = roY - dy*3;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	//下面的盘子
	plateSprite = new PlateSprite;//1
	plateSprite.setRotation(0);
	var x = boX;
	var y = boY;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//2
	plateSprite.setRotation(0);
	var x = boX + dx*1.2;
	var y = boY + dy*0.5;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//3
	plateSprite.setRotation(0);
	var x = boX + dx*2.3;
	var y = boY + dy*2;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//4
	plateSprite.setRotation(0);
	var x = boX - dx*1.2;
	var y = boY + dy*0.5;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
	plateSprite = new PlateSprite;//5
	plateSprite.setRotation(0);
	var x = boX - dx*2.3;
	var y = boY + dy*2;
	plateSprite.setPosition(cc.p(x,y));
	this.addChild(plateSprite);
	this.plates.push(plateSprite);
    },
    onKeyUp:function(key){
	if(key == cc.KEY.shift) {
	    this.batteryActivated = !this.batteryActivated;
	}
	return true;
    },
    onKeyDown:function(key){
	return true;
    },
    onMouseUp:function (event) {
	if(this.batteryActivated){
	    this.batteryFire(event.getLocation());
	} else{
	    //固定安置点与蜡烛碰撞检测
	    if(this.foucusCandle != null && !this.fixCandleCheck(this.foucusCandle)){//固定失败后蜡烛恢复自由移动
		this.foucusCandle.resumeSchedulerAndActions();
	    }
	    this.foucusCandle = null;
	}
	return true;
    },
    onMouseMoved:function(event){
	if(this.batteryActivated){
	    this.batteryRotate(event.getLocation());
	}
	return true;
    },
    onMouseDragged:function(event){
	if(cursor_point == null){
	    cursor_point = event.getLocation();
	}
	if(!this.batteryActivated){
	    for(var i in this.candles){
		var candle = this.candles[i];
		if(cc.rectContainsPoint(candle.getBoundingBox(),event.getLocation())){
		    if(this.foucusCandle == null){
			this.foucusCandle = candle;
			this.foucusCandle.pauseSchedulerAndActions();
		    }
		    this.foucusCandle.setPosition(event.getLocation());
		    break;
		}
	    }
	}
	return true;
    },
    batteryRotate:function(location){
	var oPoint = this.batterySprite.getPosition();
	var dx = location.x - oPoint.x;
	var dy = location.y - oPoint.y;
	var angle = Math.atan2(dy,dx) * (180 / Math.PI);
	this.batterySprite.setRotation(-angle);
    },
    batteryFire:function(location){
	gSharedEngine.playEffect(battery_fire_audio);
	/****set fire ***/
	var oPoint = this.batterySprite.getPosition();
	var dx = location.x - oPoint.x;
	var dy = location.y - oPoint.y;
	var dd = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	var rAngle = Math.atan2(dy,dx);//弧度
	var angle = rAngle * (180 / Math.PI);//角度
	//var angle = Math.atan2(dy,dx) * (180 / Math.PI);
    
	var fireSprite = cc.Sprite.create(fire_img);
	var dd1 = fireSprite.getContentSize().width/2 + this.batterySprite.getContentSize().width/2;
	var dx1 = dd1*(dx/dd);
	var dy1 = dd1*(dy/dd);
    
	var initX = oPoint.x + dx1;
	var initY = oPoint.y + dy1;
	fireSprite.setPosition(cc.p(initX,initY));
	fireSprite.setRotation(-angle);
	this.fires.push(fireSprite);
	this.addChild(fireSprite);
	/** make fire **/
	var aRAngle = Math.atan2(0-oPoint.y,0-oPoint.x);
	var bRAngle = Math.atan2(0-oPoint.y,WIN_SIZE.width-oPoint.x);
	var cRAngle = Math.atan2(WIN_SIZE.height-oPoint.y,WIN_SIZE.width-oPoint.x);
	var dRAngle = Math.atan2(WIN_SIZE.height-oPoint.y,0-oPoint.x);
	if(rAngle>aRAngle && rAngle<bRAngle){
	    dy1 = 0-oPoint.y;
	    dx1 = dx * (dy1/dy);
	    var aAngle = aRAngle * (180/Math.PI);
	    var bAngle = bRAngle * (180/Math.PI);
	} else if(rAngle>bRAngle && rAngle<cRAngle){
	    dx1 = WIN_SIZE.width - oPoint.x;
	    dy1 = dy *(dx1/dx);
	} else if(rAngle>cRAngle && rAngle<dRAngle){
	    dy1 = WIN_SIZE.height - oPoint.y;
	    dx1 = dx * (dy1/dy);
	} else{
	    dx1 = 0-oPoint.x;
	    dy1 = dy * (dx1/dx);
	}
	var endX = oPoint.x + dx1;
	var endY = oPoint.y + dy1;
	var velocity = 150;
	var actualDuration = Math.sqrt(Math.pow(dx1,2) + Math.pow(dy1,2))/velocity;
	var _thisObj = this;
	fireSprite.runAction(cc.Sequence.create(
		cc.MoveTo.create(actualDuration,cc.p(endX,endY)),
	cc.CallFunc.create(function(source){
	    source.removeFromParent(true);
	    cc.ArrayRemoveObject(_thisObj.fires,source);
	})
		));
    },
    fireCandleCheck:function(){
	for(var j in this.fires){
	    var fire = this.fires[j];
	    for(var i in this.candles){//普通浮动蜡烛
		var candle = this.candles[i];
		if(candle.isFired) continue;
		if(candle.fireCheck(fire)){
		    gSharedEngine.playEffect(fire_candle_audio);
		    candle.initWithFile(candle2_img);
		    candle.isFired = true;
		    fire.removeFromParent(true);
		    cc.ArrayRemoveObject(this.fires,fire);
		    break;
		}
	    }
	    for(var i in this.plates){//已经有蜡烛但未点燃的盘子碰撞检测
		var plate = this.plates[i];
		if(!plate.isEmpty && !plate.bindingCandle.isFired && plate.fireCheck(fire)){
		    gSharedEngine.playEffect(fire_candle_audio);
		    plate.setState3(null);
		    this.count++;
		    this.addCandle();
		    fire.removeFromParent(true);
		    cc.ArrayRemoveObject(this.fires,fire);
		    break;
		}
	    }
	}
    },

    fixCandleCheck:function(candle){
	var _thisObj = this;
	for(var i in this.plates){
	    var plate = this.plates[i];
	    if(plate.isEmpty && cc.rectIntersectsRect(plate.getBoundingBox(),candle.getBoundingBox())){
		gSharedEngine.playEffect(fix_candle_audio);
		candle.removeFromParent(true);
		cc.ArrayRemoveObject(this.candles,candle);
		if(candle.isFired){
		    plate.setState3(candle);
		    this.count++;
		    this.addCandle();
		} else{
		    plate.setState2(candle);
		    //已固定但未点着的蜡烛有时限
		    plate.scheduleOnce(function(){
			if(!candle.isFired) {
			    plate.setState1();
			    _thisObj.addChild(candle);
			    _thisObj.candles.push(candle);
			    candle.initRandMove();
			}
		    },UNIGNITED_FIXED_CANDLE_TIME_LIMIT);
		}
		return true;
	    }
	}
	return false;
    }
});

var MyGameScene = cc.Scene.extend({
    onEnter:function () {
	this._super();
    
	var mainLayer = new MyGameLayer();
	this.addChild(mainLayer);

    }
});
var WelcomeScene = cc.Scene.extend({
    onEnter:function(){
	this._super();
	var mainLayer = cc.LayerColor.create();
	mainLayer.init(cc.c4b(236,232,178,255));

	gSharedEngine.setMusicVolume(1);
	gSharedEngine.setEffectsVolume(1);
	gSharedEngine.playMusic(background_music,true);
	//开始按钮
	var startButton = cc.MenuItemImage.create(
		start_nor_btn,
	start_down_btn,
	this.startGame,
	this);
	startButton.setPosition(WIN_SIZE.width/2, WIN_SIZE.height/2+startButton.getContentSize().height/2);//startButton.getContentSize().height);
	var menu = cc.Menu.create(startButton);
	menu.setPosition(0,0);
	mainLayer.addChild(menu);
	//logo
	var logo = cc.Sprite.create(logo_img);
	logo.setPosition(WIN_SIZE.width/2,WIN_SIZE.height/2 + logo.getContentSize().height/2 + 100);
	mainLayer.addChild(logo);
	//说明
	var instruction = cc.Sprite.create(instruction_img);
	//instruction.setPosition(;
	var instructionPoint = cc.p(WIN_SIZE.width/2,WIN_SIZE.height/2 -instruction.getContentSize().height/2);
	mainLayer.addChild(instruction);
	var action = cc.JumpTo.create(2,instructionPoint,instruction.getContentSize().height,3);
	instruction.runAction(action);

	this.addChild(mainLayer);

    },
    startGame:function(sender){
        gSharedEngine.playEffect(button_click_audio);
        var nextScene = new MyGameScene;
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, nextScene));
    },
});