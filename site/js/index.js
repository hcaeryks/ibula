categoriasDiv = document.getElementById("categorias")
botoesCategorias = categoriasDiv.querySelectorAll("button")

remediosDiv = document.getElementById("remedios")
tituloPaginaRemedios = document.getElementById("tituloRemedios")

window.onload = function() {
	for(var i = 0; i < botoesCategorias.length; i++) {
		botoesCategorias[i].onclick = function() {
			mudarPaginaCategoria(this);
		}
	}
}

function mudarPaginaCategoria(botao) {
	categoriasDiv.classList.add("escondido")
	tituloPaginaRemedios.innerHTML = " Categoria: " + botao.innerHTML
	setTimeout(() => {
		remediosDiv.classList.remove("escondido")
	}, 500)
}

function voltarInicio() {
	remediosDiv.classList.add("escondido")
	setTimeout(() => {
		categoriasDiv.classList.remove("escondido")
	}, 500)
}

const listasRemediosTemporaria = []