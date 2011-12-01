


var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
//canvas.style = "position: absolute; z-index: 0";
canvas.style.position ="absolute";
canvas.style.zIndex = 0;
canvas.id = "bg";
canvas.width = document.documentElement.clientWidth;//400;
canvas.height = getDocHeight();//document.documentElement.clientHeight;//400;

		
var changText = true;

var Ptcl = function(){};
Ptcl.pt = Ptcl.prototype;
Ptcl.pt.x = 0;
Ptcl.pt.y = 0;
Ptcl.pt.vx = 0;
Ptcl.pt.vy = 0;
Ptcl.pt.r = 0;
Ptcl.pt.dt = 0;
Ptcl.pt.color = "black";
//Ptcl.pt.m_canvas = document.createElement('canvas');
Ptcl.pt.m_ctx = {};
var pause = false;
Math.srandom = function() {
	// body...
	return Math.random() * 2 - 1 ;
	//2
};

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
};

Ptcl.pt.init = function() {
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;
	this.vx = Math.srandom() * 5;
	this.vy = Math.srandom() * 5;
	this.r = rounded(Math.random() * 20 + 5);
	this.color = randomColor();
	this.m_canvas = document.createElement('canvas');
	this.m_canvas.width = this.r*2;
	this.m_canvas.height = this.r*2;
	this.m_ctx = this.m_canvas.getContext('2d');
	this.alpha = Math.random() * 2;
	this.ccolor = 'hsla(' + Math.floor(Math.random() * 360) + ',100%,50%,0.81)';
	this.cary = [];
	//this.color = "black";
	this.m_ctx.fillStyle = this.color;
	this.m_ctx.beginPath();
	this.m_ctx.arc(this.r, this.r, this.r, 0, Math.PI * 2, false);
	this.m_ctx.closePath();
	this.m_ctx.fill();
	//ctx.drawImage(this.m_canvas,this.x,this.y);
	
	
	
	//var self = this;
	//this.preDraw(self);
	//preDraw();
};

function rounded(n) {
	return (0.5 + n) | 0;
};

Ptcl.pt.preDraw = function() {

	//console.log(this.m_ctx);
	//console.log("predrawing");	
	self.color = "black";
	this.m_ctx.fillStyle = self.color;
	this.m_ctx.beginPath();
	this.m_ctx.arc(rounded(this.x), rounded(this.y), this.r, 0, Math.PI * 2, false);
	this.m_ctx.closePath();
	this.m_ctx.fill();
};

Ptcl.pt.draw = function() {
	var self = this;
	//ctx.fillStyle = this.color;
	//ctx.beginPath();
	//ctx.arc(rounded(this.x), rounded(this.y), this.r, 0, Math.PI * 2, false);
	//ctx.closePath();
	//ctx.fill();
	//console.log("drawing");
	var pos = {};
	pos.x = rounded(this.x - this.r);
	pos.y = rounded(this.y - this.r);
	pos.cx = this.x + (this.r * 1.5 ) * Math.cos(this.alpha + (Math.PI * 2)/100 );			
	pos.cy = this.y + (this.r * 0.5 ) * Math.sin(this.alpha + (Math.PI * 2)/100 );
	//if (pos.cy < this.y) { 
		drawComet();
		drawImage();

	//} else {
	//	drawComet();
	//	drawImage();				
	//};
	
	function drawImage() {
		return;
		ctx.drawImage(self.m_canvas,pos.x,pos.y);	
	};
	
	function drawComet() {
		var csize = self.r*0.25;
		rendercomet(pos.cx,pos.cy,csize);
		
		
		function rendercomet(posx,posy,size) {
			ctx.fillStyle = self.ccolor; //"black";
			ctx.beginPath();
			ctx.arc(posx, posy, size, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.fill();
		};
		
		for(var i= 0;i<self.cary.length;i++) {
			//console.log(self.cary[i].x);
			rendercomet(self.cary[i].x,self.cary[i].y,csize*(i/self.cary.length));
		};
		
		var position = {};
		position.x = pos.cx;
		position.y = pos.cy;
		self.cary.push(position);
		
		if(self.cary.length>10) {
			self.cary.shift();
		}
	};
	//pause = true;
	// Draw comet
	this.alpha += Math.sqrt(this.vx * this.vx + this.vy * this.vy) * 0.05; 
};



Ptcl.pt.explosion = function(x,y) {
	var radius = 20;
	ctx.fillStyle = 'hsla(226,39%,83%,0.5)';
	ctx.strokeStyle = "hsl(306,64%,29%)"; 
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	function getY() {
		return (canvas.height-point.y)/canvas.height;
	};
	//	pause = true;			
};

Ptcl.pt.update = function(rest) {
	this.x += this.vx + this.dt;
	this.y += this.vy + this.dt;
	this.interact(rest);
	this.bound();
};

Ptcl.pt.bound = function() {
	if(this.x-this.r < 0) {this.x = 0 + this.r; this.vx *= -1;};
	if(this.y-this.r < 0) {this.y = 0 + this.r; this.vy *= -0.9;};
	if(this.x+this.r > canvas.width - 1) {this.x = canvas.width - 1 - this.r; this.vx *= -1;};
	if(this.y+this.r > canvas.height - 1) {this.y = canvas.height - 1 - this.r; this.vy *= -1;};
	//if(this.vx)
};

Ptcl.pt.interact = function(rest) {
	for(var i = 0; i < rest.length; i++) {
		var other = rest[i];
		if(this != other) {
			var dx = this.x - other.x;
			var dy = this.y - other.y;
			var d = Math.sqrt(dx*dx + dy*dy);
			if(d > 0) {
				var R = this.r + other.r;
				if(d < R) {
					
					// var add = 0;
					// var x1 = this.x; 
					// var x2 = other.x;
					// var y1 = this.y;
					// var y2 = other.y;
					// var x = x2-x1;
					// var y = y2-y1;
					// 
					// if (x<0) {
					// 	add = 180;
					// } else if (y<0) {
					// 	add = 360;
					// };
					
					var dR = R - d;
					var ux = dx / d;
					var uy = dy / d;
					// alert(hdx);

					
					this.vx += ux * dR * 0.1;
					this.vy += uy * dR * 0.1;
					other.vx += -ux * dR * 0.1;
					other.vy += -uy * dR * 0.1;
					// 
					// var u = Math.atan2((x2-x1),(y2-y1))/(Math.PI/180) + add;
					// 
					// 
					// var hdx = (this.r)* Math.cos(u*Math.PI/180);
					// var hdy = (this.r)* Math.sin(u*Math.PI/180);
					// 
					// var hdrad = (((this.r + other.r)-this.r)/(this.r + other.r));
					var hdpx = ((this.x - other.x)/2)* -1;
					var hdpy = ((this.y - other.y)/2)* -1;
					// var hdppx = (this.r - hdpx);
					// var hdppy = (this.r - hdpy);
					var hdx = hdpx + this.x;
					var hdy = hdpy + this.y;
					this.explosion(hdx,hdy);					


					//alert(hdx);
					//alert(hdy);
					// var hdx = Math.sqrt( dq * dq - other.y * other.y);
					// var hdy = Math.sqrt(((d - other.r)*(d - other.r)) - (this.x * this.x));
				};
			}; 
		};
	};
};
var ptcls = [];

function randomColor() {
	//return 'hsla(' + Math.floor(Math.random() * 360) + ',100%,50%,0.81)';
	return 'hsla(240,100%,' + Math.floor(Math.random() * 50 + 25) + '%,0.7)';
};

function addPtcls(n) {
	for(var i = 0; i < n; i++) {
		var p = new Ptcl();
		p.init();
		ptcls.push(p);
	};
};

function clearPtcls() {
	var n = ptcls.length;
	for(var i = 0; i < n; i++) {
		ptcls.pop();
	};
};
function loop() {
	if (pause) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var rest = clone(ptcls);
	for(var i = 0; i < ptcls.length; i++) {
		ptcls[i].update(rest);
		ptcls[i].draw();
		rest.shift();
	};
	//draw2();
	function clone(obj) {
		if (null == obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	};
	// for(var i = 0; i < ptcls.length; i++) {
	// 	ptcls[i].draw();
	// };
};

function loopDelegate() { 
	loop()
	};

(addPtcls(30),
	function animloop(){
      requestAnimFrame(animloop);
      loopDelegate();
})();

//var timer = setInterval(loopDelegate, 1000 / 60);
//var p = new Ptcl();

//p.init();
//p.draw();