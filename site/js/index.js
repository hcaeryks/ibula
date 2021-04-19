categoriasDiv = document.getElementById("categorias")
botoesCategorias = categoriasDiv.querySelectorAll("button")

remediosDiv = document.getElementById("remedios")
tituloPaginaRemedios = document.getElementById("tituloRemedios")
conteudoPaginaRemedios = document.getElementById("conteudoRemedios")

remedioDiv = document.getElementById("remedio")
tituloPaginaRemedio = document.getElementById("tituloRemedio")
remedioConteudo = document.getElementById("remedioConteudo")

campoPesquisa = document.getElementById("floatingInput")

window.onload = function() {
	for(var i = 0; i < botoesCategorias.length; i++) {
		botoesCategorias[i].onclick = function() {
			getRemedios("botaopls", this);
		}
	}
}

campoPesquisa.addEventListener("keyup", function(e) {
	if(e.keyCode === 13) {
		e.preventDefault()
		getRemedios("carregaRemedio", campoPesquisa.value)
		//carregarPesquisa(campoPesquisa.value)
	}
})

function mudarPaginaCategoria(botao, data) {
	categoriasDiv.classList.add("escondido")
	remedioDiv.classList.add("escondido")
	tituloPaginaRemedios.innerHTML = " Categoria: " + botao.innerHTML

	for(var i = 0; i < data.length; i++) {
		conteudoPaginaRemedios.innerHTML += "<span class='remedio-categoria' onclick=\"getRemedios('carregaRemedio', '"+data[i]+"')\">" + data[i] + "</span>"
	}

	setTimeout(() => {
		remediosDiv.classList.remove("escondido")
	}, 250)
}

function voltarInicio() {
	/*remediosDiv.classList.add("escondido")
	remedioDiv.classList.add("escondido")
	setTimeout(() => {
		categoriasDiv.classList.remove("escondido")
	}, 250)*/
	location.reload()
}

function carregarPesquisa(pesquisa, dl) {
	if(remediosFUNCIONA.includes(pesquisa)) {
		remediosDiv.classList.add("escondido")
		categoriasDiv.classList.add("escondido")
		tituloPaginaRemedio.innerHTML = " " + pesquisa

		setTimeout(() => {
			remedioDiv.classList.remove("escondido")
			remedioConteudo.innerHTML = "<a href="+dl+"><h1 class='display-3'><i class='fas fa-download'></i> Baixar bula!</h1</a>"
		}, 250)
	} else {
		alert("em breve farei algo aqui :)")
	}
}

getRemedios("auto")