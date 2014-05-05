(function(){

	$('#print').click(function () {
		if(!$("input[name='type']").is(":checked")) {
			alert('please choose at least one option');
			return false;
		}
		$('#print-form').submit();
	});

})(this);