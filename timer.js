var endTime;
function initForm()
{
	var m = d3.select("#menu");
	m.selectAll("*").remove();
	m.append("input").attr("id", "timeinput").attr("value", "0:20:00");
  m.append("button").attr("onclick","startTimer()").html("Start");
	m.append("input").attr("id", "timesize").attr("value", "400px").attr("onchange", "updateFontSize()");
	var t = d3.select("#timer");
	t.selectAll("*").remove();
	t.append("label").attr("id", "timelabel")
}

function startTimer()
{
	updateFontSize();
	var t = d3.select("#timeinput")[0][0].value.split(":");
	endTime = new Date();
	endTime.setHours(endTime.getHours() + parseInt(t[0]));
	endTime.setMinutes(endTime.getMinutes() + parseInt(t[1]));
	endTime.setSeconds(endTime.getSeconds() + parseInt(t[2]));
  animationTimer();
}

function animationTimer()
{
	var d = new Date();
	if(d < endTime)
	{
		d.setHours(endTime.getHours()-d.getHours());
		d.setMinutes(endTime.getMinutes()-d.getMinutes());
		d.setSeconds(endTime.getSeconds()-d.getSeconds());
		d3.select("#timelabel")[0][0].innerHTML = getFormatedTimeString(d);
		requestAnimFrame(animationTimer);
	}
	else
		d3.select("#timelabel")[0][0].innerHTML = "Ende";

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
