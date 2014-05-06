$(function () {
      $( '.cropimage' ).each( function () {
        var image = $(this),
            cropwidth = 320,
            cropheight = 400;

          var x = image.cropbox( {width: cropwidth, height: cropheight, showControls: 'always', zoom : 20} )
            .on('cropbox', function( event, results, img ) {
              $('#x').val(results.cropX);
              $('#y').val(results.cropY);
              $('#w').val(results.cropW);
              $('#h').val(results.cropH);
            });

      } );

      //$(".cropZoomIn").trigger('click');

      $("#upload-crop").click(function () {
        showLoader();
        $("#crop").submit();
      });
      function showLoader () {
        $(".backdrop").removeClass('hide').addClass('in');
      }

});