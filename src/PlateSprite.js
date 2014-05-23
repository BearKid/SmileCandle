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


var PlateSprite = cc.Sprite.extend({
    isEmpty:true,
    bindingCandle:null,
    isFinish:false,
    ctor:function(){
	this._super();
	this.initWithFile(plate_img);
    }
});
PlateSprite.prototype.setState1 = function(){
    this.initWithFile(plate_img);
    this.setDirty(true);
    this.isEmpty = true;
    if(this.bindingCandle != null){
	this.bindingCandle.isFire = false;
	this.bindingCandle.initWithFile(candle_img);
    }
};
PlateSprite.prototype.setState2 = function(bindingCandle){
    this.initWithFile(candle3_img);
    this.setDirty(true);
    this.isEmpty = false;
    this.bindingCandle = bindingCandle;
    bindingCandle.isFired = false;
};
PlateSprite.prototype.setState3 = function(bindingCandle){
    this.initWithFile(candle4_img);
    this.setDirty(true);
    this.isEmpty = false;
    if(bindingCandle != null){
	this.bindingCandle = bindingCandle;
    }
    this.bindingCandle.isFired = true;
    this.isFinish = true;
};
PlateSprite.prototype.fireCheck = function(fire){
    var triggerPoint = cc.p(this.getPositionX(),this.getPositionY() + 10);
    var firePoint = fire.getPosition();
    var r1 = 5,r2 = fire.getContentSize().width/2;
    var distance = cc.pDistance(triggerPoint,firePoint);
    if(distance< r1 + r2){
	return true;
    } else return false;
}