//<![CDATA[
$(document).ready(function(){
	$("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				oga:"http://www.huongngo.com/site_sf/dreammachine/SITE_shortmix.ogg",
				mp3:"http://www.huongngo.com/site_sf/dreammachine/SITE_shortmix.mp3",
				wav:"http://www.huongngo.com/site_sf/dreammachine/SITE_shortmix.wav"
			});
			//$(this).jPlayer("play");
		},
		swfPath: "dreammachine",
		supplied: "oga, mp3, wav",
		wmode: "window"
	});
	
	$("#sounds").hover(function(){
		$("#page").show();
	});
	$("#sounds").mouseleave(function(){
		$("#page").hide();
	});
	
	
	var mouseX;
	var mouseY;
	$(document).mousemove( function(e) {
	   mouseX = e.pageX+20; 
	   mouseY = e.pageY-20;
	});  
	$("#sounds").mouseover(function(){
	  $('#page').css({'top':mouseY,'left':mouseX});
	});
	
	
	$("#sound").hover(function() {
		$("#soundinfo").stop().fadeTo(400,.4);
	}, function() {
		$("#soundinfo").stop().fadeTo(400,0);
	});
	
});
//]]>