"use strict";

const width = 1600;
const height = 780;
var speed = 5;
var x = 50;
var y = -1000;
var pw = 32 * 2;
var ph = 32 * 2;
let gPlayer;
let map;
let gkey = [];
let gball;
var gBall = [];
var score = 0;
var life = 1000;
var gSE = [];
var Wgamestart;
var starttime = false;

class Ball
{
	constructor()
	{
		this.mx = width / 2;
		this.my = 32;
		let	a = Math.random() * 2.5 + ( Math.PI - 2.5 )
		this.mdx = Math.cos( a );
		this.mdy = Math.sin( a );
	}
	
	draw( g )
	{
		g.drawImage( gball, this.mx - 32, this.my - 32, 32, 32 );
	}

	key()
	{
		if( IsInRect( this.mx, this.my, x, y, 32 * 3.5, 32 * 3.5 ) ){
			
			gSE[ 2 ].currentTime = 0;
			gSE[ 2 ].play();
			life --;;
			return( true );
		}
		if( life == 0 ){
			this.mx = width / 2;
			this.my = 32;
			let a = Math.random() * 2.5 + ( Math.PI - 2.5 )
			this.mdx = Math.cos( a );
			this.mdy = Math.sin( a );
		}

		this.mx += this.mdx;
		this.my += this.mdy;
		
		if( this.mx < 32 || this.mx > width - 32 ){
			this.mdx = - this.mdx;
			this.mx += this.mdx
			score ++;
		}
		if( this.my < 32 || this.my > height - 320 ){
			this.mdy = - this.mdy;
			this.my += this.mdy
			score ++;
		}
			
		if( gkey[ 82 ] ){
			this.mx = width / 2;
			this.my = 32;
		}
		if( score == 50 ){
			this.mdx = 1.1;
			this.mdy = 1.1;
		}
		return( false );	
	}
}

function IsInRect( ax, ay, rx, ry, rw, rh )
{
	return( rx < ax && ax < rx + rw && ry < ay && ay < ry + rh )
}

function draw()
{
	let g = document.getElementById( "main" ).getContext( "2d" );

	if( life < 0 ){	
		g.drawImage( gPlayer, 0, 0, width, height );
		g.fillStyle = "#ffff00";
		g.fillText( "your score is " + score, width / 9, height / 3 );
		x = 300;
		y = 100;
		return;	
	}
	g.fillStyle = "#000000";
	g.fillRect( 0, 0, width, height );	

	g.drawImage( map, 0, 0, width, height  );

	g.fillStyle = "#ffffff";
	g.fillRect( 0, 400 + 32 * 2, width, 200 );

	g.drawImage( gPlayer, x, y, pw, ph);

	g.font = "40px monospace";
	g.fillStyle = "#000000";
	g.fillText( "score" + score, width / 9, height / 3 );
	g.fillText( "LIFE " + life, width / 2, height / 5 )

	for( let b of gBall ){
		b.draw( g );
	}
	speed ++;
	y += speed;

	if( y > 400 ){
		y = 400;
	}
	if( x < 0 ){
		x = 0;
	}
	if( x + 32 * 2 > width ){
		x = width - 32 * 2;
	}
//console.log(x);
}

function load()
{
	let s = [ "56a2f23ed57647d6361ddb20af883af1.mp3", "yukumo_0001.mp3","yukumo_0002.mp3", "start.mp3" ];
	for( let i = 0; i < s.length; i++ ){
		gSE[ i ] = new Audio();
		gSE[ i ].volume = 0.1;
		gSE[ i ].src = s[ i ];
	}
}

function start()
{
	if( life < 0 ){
		return;
	}
	for( let i = 0; i < 20; i++ ){
		gBall.push( new Ball() );
	}
}

function key()
{
	if( life < 0 ){
		return;
	}
	if( gkey[ 39 ] == true ) x += 9; ph = 32 * 2; //pw = 32 * 2;
	if( gkey[ 37 ] == true ) x -= 9; ph = 32 * 2; //pw = 32 * 2;
	if( gkey[ 40 ] == true && y == 400 ){
		ph = 32 / 2;
		y = 445; 
	}
	
	for( let i = 0; i < 3; i ++ ){
		for( let b of gBall ){
			if( b.key() ){
			}
		}
	}	
}

window.onkeydown = function( ev )
{
	gkey[ ev.keyCode ] = true;

	if( ev.keyCode == 40 && gkey[ ev.keyCode ] == true ){
		//gSE[ 1 ].currentTime = 0;
		//gSE[ 1 ].play();
	}
	if( ev.keyCode == 82 ){
		score = 0;
		life = 1000;
		x = 50;
		y = -1000;
		console.log(y);
	}
}

window.onkeyup = function( ev )
{
	gkey[ ev.keyCode ] = false;

	if( ev.keyCode == 38 && x <=  0 || ev.keyCode == 38 && x + 32 * 2 >= width || ev.keyCode == 38 && y == 400 ){
		speed = -20;
		gSE[ 0 ].currentTime = 0;
		gSE[ 0 ].play();
	}
	if( ev.keyCode == 40 && y == 450 ){
		ph = 32 * 2;
		pw = 32 * 2;
		y = 400; 
	}
}

function gamestart()
{
	if( Wgamestart == true ){
		return;
	}

	if( gkey[ 13 ] ){
		starttime = true;
		gPlayer = new Image();
    		gPlayer.src = "kurun.jpg";
		map = new Image();
    		map.src = "testmap.png";
		gball = new Image();
    		gball.src = "teki.png";
		setInterval( function(){ draw() }, 10 );
		setInterval( function(){ key() }, 10 );
		start();
		draw();
		Wgamestart = true;
	}
	
	if( starttime == true ){
		gSE[ 3 ].currentTime = 0;
		gSE[ 3 ].play();
	}
}


function startwindow()
{
	let i = 32;
	let g = document.getElementById( "main" ).getContext( "2d" );

		g.fillStyle = "#000000";
		g.fillRect( 0, 0, width, height );
		g.font = "36px monospace";
		g.fillStyle = "#ffff00";
		g.fillText( "PLS PUSH ENTERKEY", width / 3 + 100, height / 2 );
		g.fillStyle = "#ffffff";
		
		g.fillText( "key to retry", 32, i * 3 );
		g.fillText( "UP key to jump", 32, i * 4 );
		g.fillText( "right key to move right", 32, i * 5 );
		g.fillText( "left key to move left", 32, i * 6 );
}

window.onload = function()
{
	setInterval( function(){ gamestart() }, 10 );
	startwindow();
	load();
	//gamewindow();
}
