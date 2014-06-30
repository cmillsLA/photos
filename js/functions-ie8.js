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
	$('.city').animate({ opacity: 1 }, 500);
	$('#gallery').animate({ opacity: 1 }, 1000, function() {
		$('#gallery img').animate({"opacity": "1"}, 250);
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
	var noUrl = url.replace('url("','');
	var noQuotes = noUrl.replace('")','');
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
	var noUrl = url.replace('url("','');
	var noQuotes = noUrl.replace('")','');
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