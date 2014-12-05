var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

var id = getUrlVars()["id"];
console.log(id);

$(window).load(function() {
	setTimeout(getNodo(), 100);
});

$(document).ajaxError(function(event, request, settings) {
	$('#busy').hide();
	alert("Error acceddiendo al servidor");
});

function transformacionFecha(fecha){
	var date = new Date(fecha*1000)
	var horas = date.getHours();
	var minutos = "0" + date.getMinutes();
	var segundos = "0" + date.getSeconds();
	var formateadoTiempo = horas + ':' + minutos.substr(minutos.length-2) + ':' + segundos.substr(segundos.length-2);
	return formateadoTiempo;
}



function getNodo() {
	$.getJSON(serviceURL + 'list.json&apikey=83e1d33c0c24b143beeb54dfd9c3d3a1', function(data) {
		$('#ListaNodos li').remove();
		console.log(id);
		$.each(data, function(index, nodo) {
			console.log(nodo.nodeid);		
			if (nodo.nodeid == id){
				$('#ListaNodos').append('<li><p class="line1">' + nodo.name +  '</p>'+
				'<p class="line2">Ultima:' +transformacionFecha( nodo.time) + '</p>'+
				'<p class="bubble">Valor:' + nodo.value +'</p></li>');
			}		
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});
}

var refreshId = setInterval(getNodo,6000);

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
