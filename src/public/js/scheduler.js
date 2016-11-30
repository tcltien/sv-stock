
$(document).ready(function(){
	$('#menu-top').find('a').removeClass('menu-top-active');
	$('#menu-top').find('a.' + active_menu).addClass('menu-top-active');

	$(document).on('click', '.btn-proc', function() {
		var type = $(this).data('type');
		var action = $(this).data('value');
		callRestApi(type, action);
	})
});


function callRestApi(type, action) {
	var dataTest = {
    		content: 'boxscore_STATS_1598476_2016',
    		source: 'STATS',
    		action: action
	}
	$.ajax({
	    url: 'http://' + serverId + serverName + type,	   
	    data: JSON.stringify(dataTest),
	    type: 'POST',      	      
	    contentType: 'application/json',    	
	    success : function(d) {
    		alert('Success');
	    },
	    error : function (xhr, ajaxOptions, thrownError){  
	    	alert("error");
	    } 
	}); 
}