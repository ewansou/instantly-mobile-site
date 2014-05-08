(function(){

	$('#print').click(function () {
		if(!$("input[name='type']").is(":checked")) {
			alert('please choose at least one option');
			return false;
		}
		showLoader();
		$('#print-form').submit();
	});
	$(".back").click(function (){
		$("#returncrop").submit();
	});
	function showLoader () {
        $(".backdrop").removeClass('hide').addClass('in');
      }

})(this);