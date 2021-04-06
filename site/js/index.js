categoriasDiv = document.getElementById("categorias")
botoesCategorias = document.getElementsByTagName("button")

window.onload = function() {
	for(var i = 0; i < botoesCategorias.length; i++) {
		botoesCategorias[i].onclick = function() {
			mudarPagina(this);
		}
	}
}

function mudarPagina(botao) {
	console.log(botao)
}