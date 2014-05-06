(function () {
	$("#select").click(function(e) {
		$("#choose-file").trigger('click');
		return false;
	});
	$("#choose-file").on('change', function(e) {
		showLoader();
		$('#select-photo').submit();
	});

	function showLoader () {
		$(".backdrop").removeClass('hide').addClass('in');
	}

	function hideLoader () {
		$(".backdrop").removeClass('in');
		setTimeout(function () {
			$(".backdrop").addClass('hide');
		}, 200);
	}
})(this);

