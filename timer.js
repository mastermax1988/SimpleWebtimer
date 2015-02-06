var endTime;
var bPaused;
function initForm()
{
	bPaused = false;
	var m = d3.select("#menu");
	m.selectAll("*").remove();
	m.append("input").attr("id", "timeinput").attr("value", "0:20:00");
	m.append("button").attr("onclick", "startTimer()").html("Neustart");
	m.append("button").attr("onclick", "pauseTimer()").html("Pause / Fortsetzen");
	m.append("input").attr("id", "timesize").attr("value", "400").attr("onchange", "updateFontSizeAndCB()");
	m.append("label").html("Textbox zeigen");
	m.append("input").attr("type", "checkbox").attr("id", "sta").attr("onchange", "updateFontSizeAndCB()");
	var t = d3.select("#timer");
	t.selectAll("*").remove();
	t.append("textarea").attr("rows", "1").attr("cols", 20).attr("id", "ta");
	t.append("br");
	t.append("label").attr("id", "timelabel")
	updateFontSizeAndCB();
}


function startTimer()
{
	bPaused = false;
	updateFontSizeAndCB();
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
		bPaused = true;
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
function updateFontSizeAndCB()
{
	var s = d3.select("#timesize")[0][0].value;
	d3.select("#timelabel").attr("style", "font-size: " + s + "px");
	d3.select("#ta").attr("style", "font-size: " + s / 10 + "px");
	if(!d3.select("#sta")[0][0].checked)
		d3.select("#ta")[0][0].style = "display: none";
}

