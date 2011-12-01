//
//  canvasz1
//
//  Created by Oliver Oszko on 2011-11-29.
//  Copyright (c) 2011 __MyCompanyName__. All rights reserved.
//
var canvas2 = document.createElement('canvas');
var ctx2 = canvas2.getContext('2d');
document.body.appendChild(canvas2);
canvas2.style.position= "absolute";
canvas2.style.zIndex = 1;
canvas2.id = "fg";
canvas2.width = document.documentElement.clientWidth;//400;
canvas2.height = getDocHeight();//document.documentElement.clientHeight;//400;

draw2 = function() {
	//ctx2.font="54pt 'Poller One'";
	
	drawText();
	//window.setTimeout(drawText, 100);
	return;
	if (pause) return;
	ctx2.fillStyle = "black";
	ctx2.beginPath();
	ctx2.arc(100,100,50,0,Math.PI * 2, false);
	ctx2.closePath();
	ctx2.fill();
	//ctx2.pause = true;
	//console.log(ctx2);	
};

//font-family: 'Rammetto One', cursive;
drawText = function() {
	//console.log("drawtext");
	//if (!changText) return;
	ctx2.textAlign = "center";
	ctx2.font="54pt 'Poller One'";
	//ctx2.font="54pt Arial";
							
	ctx2.fillStyle = 'hsl(231,100%,53%)';

	ctx2.shadowOffsetX = 5;
	ctx2.shadowOffsetY = 5;
	ctx2.shadowBlur = 4;
	ctx2.shadowColor = 'hsl(210, 100%, 7%)';
	ctx2.fillText("OSZKO.NET", canvas2.width/2, canvas2.height/2)
	//changText= false;
};
