<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Travel Photos | Prague, Czech Republic | by Chris Mills</title>
<link rel="stylesheet" href="/css/styles.css" />
</head>

<body>
<div id="loading">
	<div id="loading_screen"></div>
	<div id="loading_info"><p>Loading</p><img src="/img/loader.gif" /></div>
</div>
<div class="container">
	<div class="city">
  	<div class="nav">
    	<a href="/colombia/">colombia</a>
      <a href="/prague/" class="active">prague</a>
      <a href="/berlin/">berlin</a>
    </div>
    <p>Photos around Prague, Czech Republic.  Areas include mostly the city center, graffiti art near the center, Prague Castle and Žižkov District including a graffiti artists colony and galleries.</p>
  </div>
  <div id="gallery">
  	<div class="img_row" id="img_row_1"></div>
    <div class="img_row" id="img_row_2"></div>
    <div class="img_row" id="img_row_3"></div>
    <div class="img_row" id="img_row_4"></div>
    <div class="img_row" id="img_row_5"></div>
    <div class="img_row" id="img_row_6"></div>
    <div class="img_row" id="img_row_7"></div>
  </div>
  <div id="load">
			<?php
				$imgdir = '../img/prague/thumbs/';
				$allowed_types = array('png','jpg','jpeg','gif','JPG'); //Allowed types of files
				$dimg = opendir($imgdir);//Open directory
				while($imgfile = readdir($dimg))
				{
					if( in_array(strtolower(substr($imgfile,-3)),$allowed_types) OR
						in_array(strtolower(substr($imgfile,-4)),$allowed_types) )
				/*If the file is an image add it to the array*/
					{$a_img[] = $imgfile;}
				}
				 $totimg = count($a_img);  //The total count of all the images
				//Echo out the images and their paths incased in an li.
				 for($x=0; $x < $totimg; $x++){
					 $imgSrc = $imgdir . $a_img[$x];
					 //$data = getimagesize($imgSrc);
					 //$width = $data[0];
					 //$height = $data[1];
					 $fullImgUrl = "http://photos.chrismills.me/img/prague/full/" . $a_img[$x];
					 list($width, $height, $type, $attr) = getimagesize($fullImgUrl);
					 echo '<div class="img"><img src="' . $imgSrc . '" id="image_' . $x . '" /><a id="span_' . $x . '" href="/img/prague/full/' . $a_img[$x] . '" data-imgW="' . $width . '" data-imgH="' . $height . '" rel="lightbox" class="lightbox"></a></div>';
				 }
			?>
     </div>
</div>
<script src="/js/jquery-1.8.2.min.js"></script>
<script src="/js/functions.js"></script>
<script src="/js/slimbox2.js"></script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-3843278-36']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>