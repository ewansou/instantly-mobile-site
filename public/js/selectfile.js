
(function(){
	$("#select").click(function(e) {
		$("#choose-file").trigger('click');
		return false;
	});
	$("#choose-file").on('change', function(e) {
		$('#select-photo').submit();
	});
})(this);