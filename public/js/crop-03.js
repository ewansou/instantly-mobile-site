$( document ).ready(function() {
    var image = $('.cropimage'),
        cropwidth = 320,
        cropheight = 320;

    var x = image.cropbox( {width: cropwidth, height: cropheight, showControls: 'always'} )
      .on('cropbox', function( event, results, img ) {
        $('#x').val(results.cropX);
        $('#y').val(results.cropY);
        $('#w').val(results.cropW);
        $('#h').val(results.cropH);
      });


      //$(".cropZoomIn").trigger('click');

      $("#upload-crop").click(function () {
        showLoader();
        $("#crop").submit();
      });
      function showLoader () {
        $(".backdrop").removeClass('hide').addClass('in');
      }
});