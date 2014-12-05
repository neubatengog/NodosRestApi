localStorage['serviceURL'] = "http://10.0.0.181/emoncms/input/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var nodos;

$(window).load(function() {
	setTimeout(getListaNodos, 10);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error accediendo al servidor");
});


function getListaNodos() {
	$('#busy').show();
	$.getJSON(serviceURL + 'list.json&apikey=83e1d33c0c24b143beeb54dfd9c3d3a1', function(data) {
		$('#busy').hide();
		$('#ListaNodos li').remove();
		var nodoID;
		$.each(data, function(index, nodo) {
			console.log(nodo.nodeid);
			if (nodo.nodeid != nodoID){
				nodoID=nodo.nodeid;
				$('#ListaNodos').append('<li><a href="nododetalle.html?id=' + nodo.nodeid  + '">' +
					'<p class="line1">Nodo' + nodo.nodeid +  '</p></a></li>');
			}
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}