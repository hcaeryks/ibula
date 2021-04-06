categoriasDiv = document.getElementById("categorias")
botoesCategorias = document.getElementsByTagName("button")

remediosDiv = document.getElementById("remedios")
tituloPaginaRemedios = document.getElementById("tituloRemedios")

window.onload = function() {
	for(var i = 0; i < botoesCategorias.length; i++) {
		botoesCategorias[i].onclick = function() {
			mudarPagina(this);
		}
	}
}

function mudarPagina(botao) {
	categoriasDiv.classList.add("escondido")

	tituloPaginaRemedios.innerHTML = " Categoria: " + botao.innerHTML
	remediosDiv.classList.remove("escondido")
}