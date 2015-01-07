var endTime;
var bPaused;
function initForm()
{
  bPaused=false;
  var m = d3.select("#menu");
	m.selectAll("*").remove();
	m.append("input").attr("id", "timeinput").attr("value", "0:20:00");
	m.append("button").attr("onclick", "startTimer()").html("Neustart");
	m.append("button").attr("onclick", "pauseTimer()").html("Pause / Fortsetzen");
	m.append("input").attr("id", "timesize").attr("value", "400px").attr("onchange", "updateFontSize()");
	var t = d3.select("#timer");
	t.selectAll("*").remove();
	t.append("label").attr("id", "timelabel")
}


function startTimer()
{
	bPaused = false;
	updateFontSize();
	var t = d3.select("#timeinput")[0][0].value.split(":");
	setTime(t);
	animationTimer();
}
function setTime(t)
{
	endTime = new Date();
	endTime.setHours(endTime.getHours() + parseInt(t[0]));
	endTime.setMinutes(endTime.getMinutes() + parseInt(t[1]));
	endTime.setSeconds(endTime.getSeconds() + parseInt(t[2]));
}

function pauseTimer()
{
	if(bPaused)
	{
		bPaused = false;
		var t = d3.select("#timelabel")[0][0].innerHTML.split(":");
		if(t.length == 2)
		{
			t[2] = t[1];
			t[1] = t[0];
			t[0] = 0;
		}
		setTime(t);
		animationTimer();
	}
	else
    bPaused=true;
	}

function animationTimer()
{
	var d = new Date();
	if(d < endTime)
	{
		d.setHours(endTime.getHours() - d.getHours());
		d.setMinutes(endTime.getMinutes() - d.getMinutes());
		d.setSeconds(endTime.getSeconds() - d.getSeconds());
		var s = getFormatedTimeString(d);
		if (s == "02:00")
			playSound();
		d3.select("#timelabel")[0][0].innerHTML = getFormatedTimeString(d);
		if(!bPaused)
			requestAnimFrame(animationTimer);
	}
	else
	{
		d3.select("#timelabel")[0][0].innerHTML = "Ende";
		playSound();
	}

}
var audio = new Audio('Sounds/bell.mp3');
function playSound()
{
	if(audio.paused)
		audio.play();
}
function getFormatedTimeString(d)
{
	var s = "";
	if(d.getHours() != 0)
		s = d.getHours() + ":";
	if(d.getMinutes() < 10)
		s += "0";
	s += d.getMinutes() + ":";
	if(d.getSeconds() < 10)
		s += "0";
	s += d.getSeconds();
	return s;
}
function updateFontSize()
{
	var s = d3.select("#timesize")[0][0].value;
	d3.select("#timelabel").attr("style", "font-size: " + s);
}
