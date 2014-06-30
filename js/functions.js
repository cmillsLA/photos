$(document).ready(function() {
	// hover effect
	$(".img a").hover(
		function() {
			$(this).stop().animate({"opacity": "0"}, 250);
			$(this).siblings('canvas').fadeOut(250);
		},
		function() {
			$(this).stop().animate({"opacity": "1"}, 250);
			$(this).siblings('canvas').fadeIn(250);
		});
		$("#gallery a").one(function() {
			$("#gallery img").show();
		});
});

function canvasOverlays() {
	// create canvas overlays
	var imgContainer = document.getElementById('gallery');
	var imgs = imgContainer.getElementsByTagName('img');
	for(var i=0; i<imgs.length; i++) {
		var imgId = imgs[i].id;
		var spanId = 'span_' + i;
		var img = document.getElementById(imgId);
		var imgW = img.width;
		var imgH = img.height;
		var canvasId = 'grayscale_' + i;
		//var canvasDelay = i * 60;
		$("#" + imgId).parent().append('<canvas id="' + canvasId + '" width="' + imgW + '" height="' + imgH + '"></canvas>');
		var c=document.getElementById(canvasId);
		var ctx=c.getContext("2d");
		ctx.drawImage(img, 0, 0, imgW, imgH);
		var imgd = ctx.getImageData(0, 0, imgW, imgH);
		var pix = imgd.data;
		for (var j = 0, n = pix.length; j < n; j += 4) {
			var grayscale = pix[j  ] * .3 + pix[j+1] * .59 + pix[j+2] * .11;
				pix[j  ] = grayscale;   // red
				pix[j+1] = grayscale;   // green
				pix[j+2] = grayscale;   // blue
		}
		ctx.putImageData(imgd, 0, 0);
		$("#" + canvasId).show();
		$("#" + spanId).animate({opacity: 1});
		$("#" + imgId).animate({opacity: 1});
	}
}

$(window).load(function() {
	// sort images into columns
	var appendId;
	$('#load .img').each(function(i) {
		var shortestDiv = Math.min($('#img_row_1').height(),$('#img_row_2').height(),$('#img_row_3').height(),$('#img_row_4').height(),$('#img_row_5').height(),$('#img_row_6').height(),$('#img_row_7').height());
		$('#gallery .img_row').each(function() {
			if($(this).height() == shortestDiv) {
				appendId = $(this).prop('id');
			}
		});
		$('#' + appendId).append($(this));
	});
	if($.browser.msie == true && $.browser.version < 9) { // IE <9
		$("#gallery img").css('opacity',1);
		$("#gallery a").css('opacity',1);
	} else { // real browsers that understand canvas
		canvasOverlays();
	}
	$('.city').animate({ opacity: 1 }, 500);
	$('#gallery').animate({ opacity: 1 }, 1000, function() {
		$('#loading').fadeOut(1000);	
	});
});

// Modifications to slimbox2 bc its a POS and doesn't give a developer version
function shiftBox(h, w) {
	var W = parseInt(w);
	var H = parseInt(h);
	var newW = W + 20;
	var newH = H + 20;
	$('#imgWrap').css('width',w + 'px').css('height',h + 'px');
	$('#lbCenter').css('width',newW + 'px').css('height',newH + 'px');
}

function prevImg() {
	var url = $('#lbImage').css('background-image');
	if($.browser.mozilla) {
		var noQuotes = url.substring(5, url.length - 2);
	} else {
		var noQuotes = url.substring(4, url.length - 1);
	}
	$('#gallery a').each(function() {
		var thisHref = $(this).prop('href');
		if(thisHref == noQuotes) {
			var current = $(this).prop('id');
			var currSplit = current.split('_');
			var currId = parseInt(currSplit[1]);
			var prevId = 'span_' + (currId - 1);
			if($('#' + prevId)) {
				var bgImgUrl = $('#' + prevId).prop('href');
				var imgH = $('#' + prevId).data('imgh');
				var imgW = $('#' + prevId).data('imgw');
				$('#lbImage').css('background-image','url(' + bgImgUrl + ')');
				shiftBox(imgH, imgW);
			} else {
				var prevId = $('#gallery a:last_child').prop('id');
				var imgH = $('#' + prevId).data('imgh');
				var imgW = $('#' + prevId).data('imgw');
				$('#lbImage').css('background-image',$('#' + prevId).prop('href'));
				shiftBox(imgH, imgW);
			}
			return false;
		}
	});
}

function nextImg() {
	var url = $('#lbImage').css('background-image');
	if($.browser.mozilla) {
		var noQuotes = url.substring(5, url.length - 2);
	} else {
		var noQuotes = url.substring(4, url.length - 1);
	}
	$('#gallery a').each(function() {
		var thisHref = $(this).prop('href');
		if(thisHref == noQuotes) {
			var current = $(this).prop('id');
			var currSplit = current.split('_');
			var currId = parseInt(currSplit[1]);
			var nextId = 'span_' + (currId + 1);
			if($('#' + nextId)) {
				var bgImgUrl = $('#' + nextId).prop('href');
				var imgH = $('#' + nextId).data('imgh');
				var imgW = $('#' + nextId).data('imgw');
				$('#lbImage').css('background-image','url(' + bgImgUrl + ')');
				shiftBox(imgH, imgW);
			} else {
				var imgH = $('#span_0').data('imgh');
				var imgW = $('#span_0').data('imgw');
				$('#lbImage').css('background-image',$('#span_0').prop('href'));
				shiftBox(imgH, imgW);
			}
			return false;
		}
	});
}

$('#lbPrevLink2').live('click', function() { prevImg(); });

$('#lbNextLink2').live('click', function() { nextImg(); });

$(document).live('keypress',function(e) {
	if(e.keyCode == 37) {
		prevImg();
	}
	if(e.keyCode == 39) {
		nextImg();
	}
});