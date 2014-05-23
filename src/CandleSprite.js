/* 
 * The MIT License
 *
 * Copyright 2014 卢伟标/Lu Weibiao <zheshiluwei@gmail.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var CandleSprite = cc.Sprite.extend({
    isFired:false,
    hasPlate:false,
    bindingPlate:null,
    ctor:function(){
	this._super();
	this.initWithFile(candle_img);
	var minX = this.getContentSize().width/2;
	var maxX = WIN_SIZE.width - this.getContentSize().width/2;
	var rangeX = maxX - minX;
	var minY = this.getContentSize().height/2;
	var maxY = WIN_SIZE.height - this.getContentSize().height/2;
	var rangeY = maxY - minY;
	var actualX = (Math.random() * rangeX) + minX;
	var actualY = (Math.random() * rangeY) + minY;
	this.setPosition(actualX,actualY);
	this.initRandMove();
	
    },
    initRandMove:function(){
    var action = cc.CallFunc.create(function(target){
	    var minX = target.getContentSize().width/2;
	    var maxX = WIN_SIZE.width - target.getContentSize().width/2;
	    var rangeX = maxX - minX;
	    var minY = target.getContentSize().height/2;
	    var maxY = WIN_SIZE.height - target.getContentSize().height/2;
	    var rangeY = maxY - minY;

	    var curPoint = target.getPosition();
	    var nextX,nextY;
	    var delayNum = 0;
	    do{//不能跑进炮台的实力范围
		var offsetX = Math.random() * rangeX;//相对minX
		//sleep(delayNum * 0.5);//延时
		var offsetY = Math.random() * rangeY;//相对minY
		nextX = offsetX + minX;
		nextY = offsetY + minY;
		var k = (nextX-curPoint.x)/(nextY-curPoint.y);//斜率
		d = Math.abs(k*(BATTERY_POSITION.y - nextY) - (BATTERY_POSITION.x - nextX))/Math.sqrt(k*k + 1);//炮台圆心到蜡烛运动路径所在直线的距离,点到直线距离公式
		delayNum = (delayNum + 1)%10;//每次取下一个目的地失败后延时再取
	    }while(false);
	    //}while(d< BATTERY_RADIUS);
	    var distance = cc.pDistance(target.getPosition(),cc.p(nextX,nextY));
	    var duration = distance /target.velocity;
	    target.runAction(cc.Sequence.create(cc.MoveTo.create(duration, cc.p(nextX,nextY)),action));
    });
	this.runAction(action);
    },
});

CandleSprite.prototype.velocity = 150;
CandleSprite.prototype.setPlate = function(plate){
    if(plate = null){
	this.bindingPlate = null;
	this.hasPlate = false;
    } else{
	this.bindingPlate = plate;
	this.hasPlate = true;
    }
};
CandleSprite.prototype.getPlate = function(){
    return this.bindingPlate;
};
//@depricated
CandleSprite.prototype.moveAction = cc.CallFunc.create(function(target){
    var minX = target.getContentSize().width/2;
    var maxX = WIN_SIZE.width - target.getContentSize().width/2;
    var rangeX = maxX - minX;
    var minY = target.getContentSize().height/2;
    var maxY = WIN_SIZE.height - target.getContentSize().height/2;
    var rangeY = maxY - minY;
    //var curX = target.getPositionX();
    //var curY = target.getPositionY();
    //var nextX = (Math.random() * rangeX) + minX;
    //var nextY = (Math.random() * rangeY) + minY;
    //var distance = Math.sqrt(Math.pow((nextX-curX),2) + Math.pow((nextY-curY),2));
    //var distance = Math.pow((nextX-curX),2) + Math.pow((nextY-curY),2);
    //var distance = cc.pLength(cc.p(offsetX,offsetY));
    var curPoint = target.getPosition();
    var nextX,nextY;
    do{//不能跑进炮台的实力范围
	var offsetX = Math.random() * rangeX;
	var offsetY = Math.random() * rangeY;
	nextX = offsetX + minX;
	nextY = offsetY + minY;
	var distance = cc.pDistance(cc.p(nextX,nextY),BATTERY_POSITION);
	//var distance = Math.sqrt((nextX-curX)^2 + (nextY-curY)^2);
    }while(distance<BATTERY_RADIUS);
    var distance = cc.pDistance(curPoint,cc.p(offsetX,offsetY));
    var duration = distance /target.velocity;
    target.runAction(cc.Sequence.create(cc.MoveTo.create(duration, cc.p(nextX,nextY)),target.moveAction));
    //candleSprite.runAction(cc.Sequence.create(cc.RotateBy.create(2,10,10),candleMove));
},this);
CandleSprite.prototype.fireCheck = function(fire){
    var triggerPoint = cc.p(this.getPositionX(),this.getPositionY() + 10);
    var firePoint = fire.getPosition();
    var r1 = 5,r2 = fire.getContentSize().width/2;
    var distance = cc.pDistance(triggerPoint,firePoint);
    if(distance< r1 + r2){
	return true;
    } else return false;
}

var CakeSprite = CandleSprite.extend({
    ctor:function(){
	this._super();
	this.initWithFile(cake_img);
    }
});