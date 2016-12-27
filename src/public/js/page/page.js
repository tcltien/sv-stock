
$(document).ready(function(){
	renderData(JSON.parse(data));
});

function renderData(data) {
	var html = '';
	
	for (var i = 0 ; i < data.length; i++) {
		var stockData = data[i];
		html += '<tr>';
		for (var j = 0 ; j < stockData.length; j++) {
			html += '<td>'+ stockData[j] +'</td>';	
		}
		html += '</tr>';
	}
	
	$('.table-stock').append(html);
}