
$(document).ready(function(){
	$('.button').on('click', function(){
		$.ajax({
			url : 'https://priceservice.vndirect.com.vn/priceservice/secinfo/snapshot/q=codes:BVN',
			type: 'GET',			
			contentType : 'application/json',			
			dataType: 'json',
			success : function (data) {
				if (data.length > 0) {			
					console.log(data);
					console.log("GET");
				}else {
					console.log("error");
				}
			},
			error : function () {
				console.log("error");
			}

		});
	})
});
