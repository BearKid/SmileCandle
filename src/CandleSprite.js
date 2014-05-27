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

	ctor:function(){
		this._super();
		this.initWithFile(candle_img);
		var minX = -this.getContentSize().width/2;
		var maxX = WIN_SIZE.width + this.getContentSize().width/2;
		var rangeX = maxX - minX;
		var minY = -this.getContentSize().height/2;
		var maxY = WIN_SIZE.height + this.getContentSize().height/2;
		var rangeY = maxY - minY;
		//var actualX = (Math.random() * rangeX) + minX;
		//var actualY = (Math.random() * rangeY) + minY;
		var actualX = 0,actualY = 0;
		var condition = Math.floor(Math.random() * 4);
		switch(condition){
			case 0:{
				actualX = (Math.random() * rangeX) + minX;
				actualY = minY;
				break;
			}
			case 1:{
				actualX = (Math.random() * rangeX) + minX;
				actualY = maxY;
				break;
			}
			case 2:{
				actualX = minX;
				actualY = (Math.random() * rangeY) + minY;
				break;
			}
			case 3:{
				actualX = maxX;
				actualY = (Math.random() * rangeY) + maxY;
				break;
			}
			default:break;
		}
		this.setPosition(actualX,actualY);
		this.initRandMove();

	},
	initRandMove:function(){
		var minX = this.getContentSize().width/2;
		var maxX = WIN_SIZE.width - this.getContentSize().width/2;
		var rangeX = maxX - minX;
		var minY = this.getContentSize().height/2;
		var maxY = WIN_SIZE.height - this.getContentSize().height/2;
		var rangeY = maxY - minY;

		var curPoint = this.getPosition();
		var nextPoint = new cc.Point(0,0);
		/*
		 * do{//不能跑进炮台的实力范围}while(d<BATTERY_RADIUS);//会导致阻塞
		 */
		var offsetX = Math.random() * rangeX;//相对minX
		var offsetY = Math.random() * rangeY;//相对minY
		nextPoint.x = offsetX + minX;
		nextPoint.y = offsetY + minY;
		var k = (nextPoint.x - curPoint.x)/(nextPoint.y - curPoint.y);//斜率
		d = Math.abs(k*(BATTERY_POSITION.y - nextPoint.y) - (BATTERY_POSITION.x - nextPoint.x))/Math.sqrt(k*k + 1);//炮台圆心到蜡烛运动路径所在直线的距离,点到直线距离公式
		if(d<BATTERY_RADIUS){
			nextPoint = curPoint;
		}
		var distance = cc.pDistance(curPoint,nextPoint);
		var duration = distance /this.velocity;
		var moveToAction = cc.MoveTo.create(duration,nextPoint);
		var callBack = cc.CallFunc.create(this.initRandMove,this);//不能缺少参数二,传入执行回调的对象
		this.runAction(cc.Sequence.create(moveToAction,callBack));
	},
	fireCheck:function(fire){
		var triggerPoint = cc.p(this.getPositionX(),this.getPositionY() + 10);
		var firePoint = fire.getPosition();
		var r1 = 5,r2 = fire.getContentSize().width/2;
		var distance = cc.pDistance(triggerPoint,firePoint);
		if(distance< r1 + r2){
			return true;
		} else return false;
	},
});
CandleSprite.prototype.velocity = 150;
