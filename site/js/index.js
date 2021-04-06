categoriasDiv = document.getElementById("categorias")
botoesCategorias = categoriasDiv.querySelectorAll("button")

remediosDiv = document.getElementById("remedios")
tituloPaginaRemedios = document.getElementById("tituloRemedios")

remedioDiv = document.getElementById("remedio")
tituloPaginaRemedio = document.getElementById("tituloRemedio")

campoPesquisa = document.getElementById("floatingInput")

window.onload = function() {
	for(var i = 0; i < botoesCategorias.length; i++) {
		botoesCategorias[i].onclick = function() {
			mudarPaginaCategoria(this)
		}
	}
}

campoPesquisa.addEventListener("keyup", function(e) {
	if(e.keyCode === 13) {
		e.preventDefault()
		carregarPesquisa(campoPesquisa.value)
	}
})

function mudarPaginaCategoria(botao) {
	categoriasDiv.classList.add("escondido")
	remedioDiv.classList.add("escondido")
	tituloPaginaRemedios.innerHTML = " Categoria: " + botao.innerHTML
	setTimeout(() => {
		remediosDiv.classList.remove("escondido")
	}, 250)
}

function voltarInicio() {
	remediosDiv.classList.add("escondido")
	remedioDiv.classList.add("escondido")
	setTimeout(() => {
		categoriasDiv.classList.remove("escondido")
	}, 250)
}

function carregarPesquisa(pesquisa) {
	if(remediosTemporario.includes(pesquisa)) {
		remediosDiv.classList.add("escondido")
		categoriasDiv.classList.add("escondido")
		tituloPaginaRemedio.innerHTML = " " + pesquisa
		setTimeout(() => {
			remedioDiv.classList.remove("escondido")
		}, 250)
	} else {

	}
}

autocomplete(campoPesquisa, remediosTemporario)