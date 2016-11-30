/**
 * Main script for client side
 */
// Create Base64 Object
var manifest = null;
var couchbaseData = null;

$(document).ready(function(){
	// load sports to selectbox 	
	for (var i in sportdata) {
		$('#sport').append('<option value="' +sportdata[i].name.toLowerCase() + '">' + sportdata[i].name + '</option>');
	}
});

$(document).on('click', '.minimize-btn', function(){
	if ($(this).hasClass('open')){
		$(this).text('+');
		$(this).siblings('.group,.element,.table-element').addClass('hidden');
		$(this).removeClass('open');
	}else {
		$(this).siblings('.group,.element,.table-element').removeClass('hidden');
		$(this).text('-');
		$(this).addClass('open');
	}
});


$(document).on('change', '#sport', function(){
	$('#data-file').empty();
	$('#data-file').val('');
	$('#data-file').append('<option value="0">Select data</option>');
	$("#boxscore-ids option:not(:first)").remove();
	$('#manifest-editor').html("");
	$('#save-btn').addClass('hidden');
	for(var i in sportdata) {
		if (sportdata[i].name.toLowerCase() == $(this).val()) {			
			for (var j in sportdata[i].structure) {
				var s = sportdata[i].structure[j];
				$('#data-file').append('<option value="' +s.name.toLowerCase() + '">' + s.name + '</option>');
			}
		}
	}
});

$(document).on('change', '.arr_selectbox', function() {
	$(this).siblings('.array-element').children('.group').addClass('hidden');
	var elements = $(this).siblings('.array-element').children('[data-target="' + $(this).val() + '"]');
	elements.removeClass('hidden');
	elements.children('.group,.element').removeClass('hidden');
});

$(document).on('change', '#data-file', function() {
	var sport = $('#sport').val();
	var structure = $('#data-file').val();

	var link = '';
	$("#boxscore-ids option:not(:first)").remove();
	$('#manifest-editor').html("");
	$('#save-btn').addClass('hidden');
	if ($(this).val() != "0") {
		link = webroot + "/listIds";
		callAjax(link, {'sport': sport, 'structure' : structure}, function(data) {		
			if(Object.keys(data).length > 0) {
				renderBoxScoresIds(data, structure);
				
			} else {
				alert("Not found data");
			}
		});	
	}
});

$(document).on('click', '#save-btn', function(){
	var sport = $('#sport').val();
	var structure = $('#data-file').val();
	var docId = $('#boxscore-ids').val();
	var result = getDataGroup($('#manifest-editor').children('div'));
	// merge with doc 
	recursiveMerge(result, couchbaseData, manifest);
	console.log(couchbaseData);
	var saveData = Base64.encode(JSON.stringify(couchbaseData));
	callAjax(webroot + '/saveData', {
		sport : sport,
		structure : structure, 
		docId: docId, 
		data : saveData
	}, function(data) {
		if (data.success) {
			showMessage('Result', 'Data has been successfully saved');
		}
	});
});

$('#popup-message .close-btn').click(function(){
	$('#popup-message').addClass('hidden');
});

$(document).on('click', function(e){

    if ($(e.target).hasClass('close-btn') || !$(e.target).closest('#popup-message').length){
       $('#popup-message').addClass('hidden');
    }

});

$(document).on('change', '#boxscore-ids', function() {
	
	var sport = $('#sport').val();
	var structure = $('#data-file').val();
	$('#save-btn').addClass('hidden');
	if ($(this).val() != "0") {
		callAjax(webroot + '/getSportData', {
			sport : sport, 
			structure : structure,
			docId : $(this).val()
		}, function(data){
			var html = "";
			if (data.manifest !== undefined && data.doc !== undefined){
				html = render(null ,data.manifest , data.doc.value);
				couchbaseData = data.doc.value;
				manifest = data.manifest;
				$('#save-btn').removeClass('hidden');
			}
			$('#manifest-editor').html(html);
			$('#manifest-editor').children('div').children('.group,.element').removeClass('hidden');
			bindValidateEvent();
		});	
	} else {
		$('#manifest-editor').html("");
		console.log("Id is invalid");
	}
});

var render = function(objid, obj, data) {
	var html = "";
	if (obj !== undefined && obj != null) {
		var content = "";

		for (var id in obj.elements) {
			if (data[id] !== undefined) {
				var element = obj.elements[id];
				if (element.type == "group"){
					// render recursive
					content += render(id, element,  data[id]);
				}else if (element.type=="boolean") {
					content += renderRadio(id, element, data[id]);
				}else if (element.type == "list") {
					if (Array.isArray(data[id])) {
						content += renderArray(id, element, data[id]);
					}else {
						content += render(id, element, data[id]);
						
					}
				}else if (element.type == "table") {
					content += renderTable(id, element, data[id]);
				}else {
					// render a text box for user to edit
					content += renderTextBox(id, element, data[id]);
				} 
			}
			
		}

		if (objid == null) objid = "";
		if (obj.caption !== undefined && obj.caption != "") {	
			if (obj.type == "list") {
				html += "<div class='group hidden' data-id='" + objid + "' data-target='" + getEval(data, Base64.encode(JSON.stringify(obj.identifier))) +"'>" + content + "</div>"
			}else {
				html += "<div class='group hidden' data-id='" + objid + "' data-type='group'><span>" + obj.caption + "</span><span class='minimize-btn'>+</span>" + content + "</div>";			
			}
			
		}else {
			html += "<div data-type='group' data-id='" + objid + "' > " + content + "</div>";
		}
	}
	return html;
}


var renderTextBox = function(id, element, data) {
	var value = (element.field !== undefined) ? data[element.field] : data;
	
	var html = "<div class='element hidden' data-validator='" + getPropertyValue(element.type) + "' data-type='" + getPropertyValue(element.type) + "' data-field='"+ getPropertyValue(element.field) +"' data-id='"+ getPropertyValue(id) +"'>" + 
		"<label class='caption'>" + element.caption + "</label>" + 
		"<input type='text' name='" + id + "' value='" + value +"'/>" + 
		"</div>";
	return html ;
}


var renderRadio = function (id, element, data) {
	var randomId = randomString();
	var checked = element.field ? data[element.field] : data;
	var html = "<div class='element hidden' data-id='" + id +"' data-type='" + getPropertyValue(element.type) + "' data-field='" + getPropertyValue(element.field) + "'>" + 
		"<label class='caption'>" + element.caption + "</label>"+
		"<input class='radio' type='radio' name='" + randomId +"' value='true' " + ((checked) ? "checked" : "") + " /> True" + 
		"<input class='radio' type='radio' name='" + randomId +"' value='false' " + ((!checked) ? "checked" : "") + " >False" +
		"</div>";
	return html;
}

var renderArray = function(id, element, data) {
	var html = "<div class='element hidden' data-id='" + getPropertyValue(id) + "' data-type='" + getPropertyValue(element.type) + "'>" + 
			"<label class='caption'>" + element.caption + "</label>" ;

	var options = "<option>Select</option>";
	var array_elements = "";
	for (var i in data) {
		var name = getEval(data[i], Base64.encode(JSON.stringify(element.identifier)));
		options += "<option value='" + name + "'>" + name + "</option>";
		array_elements += render(null, element, data[i])
	}
	html += "<select id='" + id + "' class='arr_selectbox' data-field=\""+ Base64.encode(JSON.stringify(element.identifier)) +"\">" + options + "</select>" + 
		"<div class='array-element'>" + array_elements + "</div></div>";
	
	return html;
}


var renderTable = function (id, element , data) {
	var html = "<div class='element hidden' data-id='" + id + "' data-type='" + element.type + "' data-identifier='"+ Base64.encode(JSON.stringify(element.identifier)) +"'>" + 
			"<label class='caption'>" + element.caption + "</label><span class='minimize-btn'>+</span>" ;
			
	html +="<table class='table-element hidden'>";
	html += "<thead><tr><th></th>";
	for (var i in element.elements ) {
		html += "<th>" + element.elements[i].caption + "</th>";
	}
	html += "</tr></thead>";
	html += "<tbody>";
	// render row 
	for (var i in data) {
		var name = getEval(data[i], Base64.encode(JSON.stringify(element.identifier)));
		html += "<tr data-idvalue='"+ name +"'><td>" + name + "</td>";
		for (var j in element.elements) {
			html += "<td><input type='text' name='" + j + "' value='" + data[i][j] + "' /></td>";
		}
	}
	html += "</tbody></table></div>";
	return html;
	
}



var renderBoxScoresIds = function(data, structure) {	
	if (data.length > 0) {
		for (var i = 0 ; i < data.length; i++) {
			var option = '<option value="' + data[i].id + '">' + data[i].docId;
			if (structure == 'standing') {
				option += ' ' + data[i].season;
			}
			option += '</option>';
			$('#boxscore-ids').append(option);
		}	
	}	
}

var callAjax = function(link, postData, callback) {	
	$.ajax({
        type: "POST",
        url: link,
		data : postData,
        timeout: 2000,         
        success: function(data) {            	
        	callback(data);
        },
        error: function(jqXHR, textStatus, err) {               
            alert('text status '+textStatus+', err '+err)
        }
    });
}



function getDataGroup(dom) {
	var result = {};
	var children = dom.children('div');
	
	children.each(function(){
		var type = $(this).data('type');
		var id = $(this).data('id');
		var field = $(this).data('field');
		if (type == "group") {
			result[id] = getDataGroup($(this));
		}else if (type == "list") {
			result[id] = getDataArray($(this));
		}else if (type == "boolean") {
			if (field) {
				result[id] = {};
				result[id][field] = getDataBoolean($(this));
			}else {
				result[id] = getDataBoolean($(this));
			}
			
		}else if (type == "table") {
			result[id] = getDataTable($(this));
		}else {
			result[id] = getDataTextBox($(this));
		}
		
	});	
	return result;
}


function getDataBoolean(dom) {
	var val = dom.find('input.radio:checked').val();
	if(val == "true") {
		return true;
	}else {
		return false;
	}
}

function getDataTextBox(dom){
	var result = {};
	var field = dom.data('field');
	if (field == "" || typeof field == "undefined") {
		return dom.find('input').val();
	}
	result[field] = dom.find('input').val();
	return result;
}

function getDataArray(dom) {
	// get selectbox 
	var result = [];
	var id = dom.data('id');
	var fieldStr = dom.find('select#'  +id).data('field');
	var field = JSON.parse(Base64.decode(fieldStr));
	dom.find('select#' + id + ' option').each(function() {
		var val = $(this).val();
		var children = dom.children('.array-element').children('[data-target="' + val + '"]');
		children.each(function(){
			var child = getDataGroup($(this));

			getEval(child, fieldStr, $(this).data('target'));
			result.push(child);
		});
	})
	return result;
}

function getDataTable(dom) {
	var result = [];	
	// get data from html
	var rows = dom.find('tbody tr');
	var identifier = dom.data('identifier');
	rows.each(function(){
		var idval = $(this).data('idvalue');
		var rowData = {};
		getEval(rowData, identifier, idval);
		var cols = $(this).find('input');
		cols.each(function(){
			rowData[$(this).attr('name')] = $(this).val();
		});
		result.push(rowData);
	})
	
	return result;
}

function getEval(obj, encodedPropString, value) {
	var prop = JSON.parse(Base64.decode(encodedPropString));
	var pString = "";
	for (var i in prop) {
		if (pString == "") {
			pString = "['" + prop[i] + "']";
		}else {
			pString = pString + "['" + prop[i] + "']";
		}
		
		var v = eval('obj' + pString);
		if (v == undefined ){
			eval('obj' + pString + ' = {}'); 
		}
	}
	
	if (value != undefined) {
		eval("obj" + pString + " = '" + value + "'");
	}
	
	return eval("obj" + pString);
}

function recursiveMerge (source, dest, manifest) {
	for (var i in source) {
		if (source.hasOwnProperty(i)) {
			if(Array.isArray(source[i])) {
				mapDataByIdentifier(source[i], dest[i], manifest.elements[i]);
			}else if (typeof source[i] == "object") {
				// call recursive
				if (typeof dest[i] != "object") {
					dest[i] = source[i];
				}else {
					recursiveMerge(source[i],dest[i], manifest.elements[i]); 
				}
				
			}else {
				dest[i] = source[i];
			}
		}
	}
}

function mapDataByIdentifier (source, dest, manifest ) {
	var encodedIdentifier = Base64.encode(JSON.stringify(manifest.identifier));
	var sourceMap = {}, destMap = {};
	
	for (var i in source) {
		var id = getEval(source[i], encodedIdentifier);
		sourceMap[id] = source[i];
	}
	for (var i in dest) {
		var id = getEval(dest[i], encodedIdentifier);
		destMap[id] = dest[i];
	}
	
	for (var id in sourceMap) {
		if (destMap.hasOwnProperty(id)) {
			recursiveMerge(sourceMap[id], destMap[id], manifest);
		}
	}
}

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}


function showMessage(header, message) {
	$("#popup-message").find('.message span').text(message);
	$("#popup-message").find('.popup-header span:first-child').text(header);
	$('#popup-message').removeClass('hidden');
}


function bindValidateEvent() {
	$( "#manifest-editor div[data-validator]").each(function(){
		var that = ($(this).find('input'));
		var valid = $(this).data('validator');	
		if (valid == 'text') {
			that.bind('keydown', function(e) {
				checkText(e, $(this).val());
			});
		} else if (valid == 'number') {
			that.bind('keydown', function(e) {
			 	checkNumber(e, $(this).val());
			});
		}
	
	})
}

function checkNumber(e, text) {
	 // Allow: backspace, delete, tab, escape, enter and .
	if ($.inArray(e.which , [46, 8, 9, 27, 13, 110, 190, 189, 109]) !== -1 ||
         // Allow: Ctrl+A, Command+A
        (e.which  === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
         // Allow: home, end, left, right, down, up
        (e.which  >= 35 && e.which  <= 40)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.which  < 48 || e.which  > 57)) && (e.which  < 96 || e.which  > 105)) {
        e.preventDefault();
    }	
};


function checkText(e, text) {		
	 // Allow: backspace, delete, tab, escape, enter
	if ($.inArray(e.which , [46, 8, 9, 27, 13, 110]) !== -1 ||
         // Allow: Ctrl+A, Command+A
        (e.which  === 65 && (e.ctrlKey === true || e.metaKey === true))) {
             // let it happen, don't do anything
             return;
    }
	if ((e.shiftKey || (e.which  < 48 || e.which  > 57)) && (e.which  < 96 || e.which  > 105) && (e.which  < 65 || e.which  > 90)) {
        e.preventDefault();
    }	
}

function getPropertyValue(val) {
	if (typeof val == "undefined" || val == null) {
		return "";
	}
	return val;
}