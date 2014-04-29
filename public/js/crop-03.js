$( function () {
      $( '.cropimage' ).each( function () {
        var image = $(this),
            cropwidth = 300,
            cropheight = 300;

          image.cropbox( {width: cropwidth, height: cropheight, showControls: 'always' } )
            .on('cropbox', function( event, results, img ) {
              $('#x').val(results.cropX);
              $('#y').val(results.cropY);
              $('#w').val(results.cropW);
              $('#h').val(results.cropH);
            });
      } );

      $("#upload-crop").click(function () {
        $("#crop").submit();
      });

} );