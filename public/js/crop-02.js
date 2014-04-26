(function() {
	croppicHeaderOptions = {
		uploadUrl:'img_save_to_file',
		cropUrl: '/crop-02',
		customUploadButtonId: 'upload-crop',
		onAfterImgCrop: function () {
			window.location = "/photo-print";
		},
		onAfterImgUpload: function () {
			$('#negative-crop').css('display', 'block').click(function () {
				$('.cropControlCrop').trigger('click');
			})
			$('.cropControlReset').click(function (){
				$('#negative-crop').css('display', 'none');
			})
		}
	}
	var cropperHeader = new Croppic('myId', croppicHeaderOptions);
})(this);