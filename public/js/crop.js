
(function (){

	$('#target').Jcrop({
        aspectRatio: 1,
        setSelect: [0, 0, 120, 120],
        boxWidth: 320,
        bgColor: 'white',
        onSelect: showCoords,
		onChange: showCoords
    });

    $("#upload-crop").click(function (){
    	$('#crop').submit();
    });
    function showCoords(c)
			{
				$('#x1').val(c.x);
				$('#y1').val(c.y);
				$('#x2').val(c.x2);
				$('#y2').val(c.y2);
				$('#w').val(c.w);
				$('#h').val(c.h);
			};

})(this);