function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function (e) {
		var a,
			b,
			i,
			val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function (e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
						(or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			  increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) {
			//up
			/*If the arrow UP key is pressed,
			  decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

let remediosFUNCIONA;
const remediosTemporario = [
	"Abilify",
	"Aclasta",
	"Activelle",
	"Actonel",
	"Actos",
	"Acular",
	"Acular LS",
	"Adriblastina RD",
	"Aerolin",
	"Afrin",
	"Aldactone",
	"Aldara",
	"Aldomet",
	"Alenia",
	"Alimta",
	"Allegra",
	"Allegra D",
	"Allurene",
	"Aloxidil",
	"Alphagan",
	"Amaryl",
	"Amaryl Met",
	"Aminofilina Sandoz",
	"Amoxil",
	"Amoxil BD",
	"Amplacilina",
	"Amplictil",
	"Amprax",
	"Androcur",
	"Androgel",
	"Anforicin B",
	"Annita",
	"Antak",
	"Aprovel",
	"Aprozide",
	"Aracytin CS",
	"Arava",
	"Arcoxia",
	"Arimidex",
	"Aromasin",
	"Aropax",
	"Asalit",
	"Ascaridil",
	"Aspirina Prevent",
	"Atacand",
	"Atacand HCT",
	"Atenol",
	"Atlansil",
	"Atropion",
	"Atrovent",
	"Avalox",
	"Avicis",
	"Avodart",
	"Azactam",
	"Azectam",
	"Azeus",
	"Azi",
	"Bactrim",
	"Bactrim F",
	"Bactroban",
	"Bambec",
	"Belara",
	"Benicar",
	"Benicar HCT",
	"Benicaranlo",
	"Benzilpenicilina potassica Eurofarma",
	"Berotec",
	"Betagan",
	"Betalor",
	"Betaserc",
	"Betnovate",
	"Betoptic",
	"Bextra IM/IV",
	"Bi-Profenid",
	"Biamotil",
	"Biamotil D",
	"Biconcor",
	"Bioezulen",
	"Biovir",
	"Blaztere",
	"Blenoxane",
	"Blopress",
	"Bonviva",
	"Bosentana (Actelion)",
	"Brilinta",
	"Brismucol",
	"Brometo de Pancuronio (Novafarma)",
	"Brondilat",
	"Brycanil Composto Ex",
	"Budecort Aqua",
	"Buscopan Composto",
	"Butazona calcica Boehringer Ingelheim",
	"C-Platin",
	"Camptosar",
	"Cancidas",
	"Candicort",
	"Capoten",
	"Capsfen",
	"Carbidopa + levodopa (Biosintetica)",
	"Carbolitium",
	"Carboplatina Glenmark",
	"Cardizem",
	"Carduram",
	"Carduran",
	"Cartrax",
	"Casodex",
	"Cataflam",
	"Cataflam D",
	"Cebralat",
	"Cebrilin",
	"Cedilanide",
	"Cefamox",
	"Cefoxitina Sodica Eurofarma",
	"Celebra",
	"Celestamine",
	"Celestone Soluspan",
	"Cellcept",
	"Cerazette",
	"Certican",
	"Cetazima",
	"Cialis",
	"Ciloxan Otologico",
	"Cimetidina Teuto",
	"Cipramil",
	"Cipro",
	"Ciprofloxacino Halex Istar",
	"Citalor",
	"Citanest com Octapressin",
	"Claforan",
	"Claripel",
	"Claritin D",
	"Clavulin",
	"Clavulin BD",
	"Clavulin IV",
	"Cliane",
	"Clinagel",
	"Clonidin",
	"Clorana",
	"Cloridrato de Bupivacaina Hypofarma",
	"Cloridrato de Propranolol EMS S/A",
	"Co-Renitec",
	"Codein",
	"Colchis",
	"Colpistatin",
	"Colpotrofine",
	"Combigan",
	"Combodart",
	"Comtan",
	"Concor",
	"Cordarex",
	"Coreg",
	"Cortisonal",
	"Corus",
	"Cosopt",
	"Cozaar",
	"Crestor",
	"Crixivan",
	"Cromolerg",
	"Cubicin",
	"Cymbalta",
	"Cymevene",
	"Dacarb",
	"Dacogen",
	"Daforin",
	"Dalacin C",
	"Daonil",
	"Daunoblastina",
	"Ddavp",
	"Decadron",
	"Decadron Colirio",
	"Depakene",
	"Depakote",
	"Depakote ER",
	"Depakote Sprinkle",
	"Depo-Provera",
	"Dermazine",
	"Desalex",
	"Desalex D12",
	"Desonol",
	"Despacilina",
	"Dexason",
	"Diamicron MR",
	"Diane 35",
	"Diazepam Uniao Quimica",
	"Dicetel",
	"Differin",
	"Digedrat",
	"Digesan",
	"Digoxina Aspen",
	"Digoxina Glaxo",
	"Dimorf",
	"Dinaflex",
	"Diovan",
	"Diovan Amlo Fix",
	"Diovan HCT",
	"Diovan Triplo",
	"Diprivan",
	"Diprogenta",
	"Diprosalic",
	"Diprosone",
	"Diprospan",
	"Dobutrex",
	"Dolamin",
	"Dolamin Flex",
	"Dolantina",
	"Donaren",
	"Dopacris",
	"Dormonid",
	"Dostinex",
	"Dramin",
	"Dramin B6",
	"Duomo HP",
	"Duphaston",
	"Duspatalin",
	"Ebix",
	"Ecalta",
	"Efexor XR",
	"Elocom",
	"Eloxatin",
	"Enablex",
	"Epivir",
	"Equilid",
	"Eranz",
	"Eritrex",
	"Erradic UG",
	"Esmeron",
	"Estrofem",
	"Etrane",
	"Eulexin",
	"Exelon",
	"Exjade",
	"Ezetrol",
	"Farmorubicina CS",
	"Farmorubicina RD",
	"Faslodex",
	"Faulblastina",
	"Fauldcispla",
	"Fauldoxo",
	"Feldene",
	"Femara",
	"Femiane",
	"Femoston",
	"Femoston Conti",
	"Fenergan",
	"Fentanest",
	"Fentanil",
	"Fentizol",
	"Filinar G",
	"Flagyl",
	"Flagyl Nistatina",
	"Flanax",
	"Flancox",
	"Flotac",
	"Floxacin",
	"Fludara",
	"Fluimucil",
	"Fluoro-Uracila",
	"Fluorouracila Accord",
	"Forane",
	"Fortaz",
	"Fortovase",
	"Fosamax",
	"Fostair",
	"Frademicina",
	"Frontal",
	"Fungizon",
	"Furacin",
	"Galvus",
	"Galvus Met",
	"Garamicina",
	"Gardenal",
	"Gemzar",
	"Geodon",
	"Gino-Canesten",
	"Gino-Dermazine",
	"Gino-Pletil",
	"Glifage",
	"Glifage XR",
	"Glivec",
	"Glucovance",
	"Gynazole - 1",
	"Gyno-Daktarin",
	"Gyno-Fungix",
	"Gyno-Icaden",
	"Haldol",
	"Haldol Decanoato",
	"Hidantal",
	"Higroton",
	"Holoxane",
	"Hycamtin",
	"Hydrea",
	"Hyzaar",
	"Icaden",
	"Imigran",
	"Imosec",
	"Imuran",
	"Inderal",
	"Intal",
	"Invanz",
	"Iopamiron",
	"Isoflurano Instituto Biochimico",
	"Janumet",
	"Januvia",
	"Jevtana",
	"Kefazol",
	"Keflaxina",
	"Keflex",
	"Keflin",
	"Keforal",
	"Keppra",
	"Ketalar",
	"Klaricid",
	"Kytril",
	"Labirin",
	"Lamictal",
	"Lamisil",
	"Lanexat",
	"Lasix",
	"Latuda",
	"Legifol Cs",
	"Leponex",
	"Levaquin",
	"Levitra",
	"Levolukast",
	"Lexapro",
	"Lexotan",
	"Lexotan CR",
	"Libiam",
	"Lioresal",
	"Lipidil",
	"Livalo",
	"Livial",
	"Lixiana",
	"Lopressor",
	"Loprox",
	"Loprox NL",
	"Lorax",
	"Lotar",
	"Loxonin",
	"Lumigan",
	"Luvox",
	"Lyrica",
	"Macrodantina",
	"Manivasc",
	"Marcaina",
	"Marevan",
	"Maxcef",
	"Maxitrol",
	"Megestat",
	"Mepivalem",
	"Mercilon",
	"Meronem",
	"Meronem IV",
	"Mesacol",
	"Mesigyna",
	"Mesilato de doxazosina Merck",
	"Methergin",
	"Meticorten",
	"Miantrex CS",
	"Micardis",
	"Micardis HCT",
	"Micostatin",
	"Microdiol",
	"Micronor",
	"Mimpara",
	"Minesse",
	"Minomax",
	"Minoton",
	"Minulet",
	"Miosan",
	"Mirtazapina Novartis",
	"Mitexan",
	"Mitostate",
	"Moduretic",
	"Monocordil",
	"Monopril",
	"Monuril",
	"Motilium",
	"Motrin",
	"Movatec",
	"Mucolitic",
	"Mydriacyl",
	"Myfortic",
	"Naprix A",
	"Naprosyn",
	"Naramig",
	"Naropin",
	"Nasacort",
	"Nasonex",
	"Natrilix",
	"Natrilix SR",
	"Navelbine",
	"Nebido",
	"Nebilet",
	"Neozine",
	"Neurontin",
	"Nexium",
	"Nexium IV",
	"Nimbium",
	"Nisulid",
	"Nizoral",
	"Nolvadex",
	"Nordette",
	"Norvasc",
	"Novacort",
	"Novalgina",
	"Novanlo",
	"Novonorm",
	"Nuvaring",
	"Oflox",
	"Olcadil",
	"Omcilon A",
	"Omcilon A M",
	"Omeprazol Eurofarma",
	"Omnaris",
	"Onbrize",
	"Onicit",
	"Oroxadin",
	"Otosynalar",
	"Ovestrion",
	"Oxacilina sodica Eurofarma",
	"Oximax",
	"Oxycontin",
	"Pamidronato dissodico Eurofarma",
	"Pantoprazol Altana Pharma Ltda",
	"Pantozol",
	"Paraplatin",
	"Parenzyme Tetraciclina",
	"Parenzyme Tetracilcina",
	"Pariet",
	"Patanol",
	"Patz SL",
	"Paxil CR",
	"Pentasa",
	"Peprazol",
	"Perlutam",
	"Perlutan",
	"Pilocarpina",
	"Plamet",
	"Plaquinol",
	"Plasil",
	"Platiran",
	"Plavix",
	"Polaramine Expectorante",
	"Polimyxin B",
	"Ponstan",
	"Postinor",
	"Postnor",
	"Pravacol",
	"Prazol",
	"Prebictal",
	"Precedex",
	"Pred Fort",
	"Predfort",
	"Prednisolon",
	"Prelone",
	"Primogyna",
	"Pristiq",
	"Profenid",
	"Profenid Retard",
	"Proflam",
	"Prograf",
	"Prolopa",
	"Propecia",
	"Propil",
	"Propranolol Sigma Pharma",
	"Propranolol Wyeth",
	"Proscar",
	"Prostigmine",
	"Protopic",
	"Prozac",
	"Prurizin",
	"Psorex",
	"Puran T4",
	"Pyloripac",
	"Qlaira",
	"Quadriderm",
	"Rapifen",
	"Reductil",
	"Regaine",
	"Relestat",
	"Remeron Soltab",
	"Reminyl ER",
	"Renagel",
	"Renitec",
	"Restiva",
	"Retemic",
	"Revatio",
	"Revectina",
	"Revivan",
	"Rifaldin",
	"Rifocina",
	"Rilutek",
	"Risperdal",
	"Ritalina",
	"Ritmonorm",
	"Rivotril",
	"Roacutan",
	"Rocefin",
	"Tagamet",
	"Talsutin",
	"Tamiflu",
	"Tamiram",
	"Tandrilax",
	"Targocid",
	"Tavanic",
	"Taxol",
	"Taxotere",
	"Tazocin",
	"Tecnocris",
	"Tecta",
	"Tegretol",
	"Tegretol CR",
	"Temodal",
	"Tenoretic",
	"Tenoxicam Eurofarma",
	"Tetralysal",
	"Ticlid",
	"Tienam",
	"Tilatil",
	"Timentin",
	"Timoptol",
	"Tiorfan",
	"Tobi",
	"Tobradex",
	"Tobrex",
	"Tofranil",
	"Topamax",
	"Toradol",
	"Tracleer",
	"Tracrium",
	"Tractocile",
	"Tramal",
	"Tramal Retard",
	"Transamin",
	"Travatan",
	"Trayenta",
	"Trental",
	"Tri-Luma",
	"Triatec",
	"Triatec D",
	"Triatec Prevent",
	"Trifamox",
	"Trileptal",
	"Trofodermim",
	"Trusopt",
	"Truvada",
	"Tryptanol",
	"Tygacil",
	"Tylenol Sinus",
	"Tylex",
	"Ultiva",
	"Ultracet",
	"Unasyn",
	"Unoprost",
	"Utrogestan",
	"Valium",
	"Valtrex",
	"Vancocina CP",
	"Vannair",
	"Vastarel",
	"Vastarel MR",
	"Velban",
	"Velcade",
	"Venvanse",
	"Vepesid",
	"Vertix",
	"Verutex",
	"Verutex B",
	"Vesicare",
	"Vespesid",
	"Vfend",
	"Vfend IV",
	"Viagra",
	"Vibramicina",
	"Vidaza",
	"Vimpat",
	"Vioformio",
	"Viramune",
	"Viread",
	"Viscotears",
	"Vitanol A",
	"Voltaren",
	"Voltaren Retard",
	"Voltaren SR",
	"Vonau Flash",
	"Vytorin",
	"Wellbutrin SR",
	"Wellbutrin XL",
	"Xalacom",
	"Xalatan",
	"Xarelto",
	"Xefo",
	"Xeloda",
	"Xenical",
	"Xylestesin",
	"Xylocaina Geleia",
	"Xylocaina Pomada",
	"Yasmin",
	"Yaz",
	"Zaditen",
	"Zanidip",
	"Zavedos",
	"Zemplar",
	"Zentel",
	"Zestril",
	"Zinacef",
	"Zinnat",
	"Ziprexa",
	"Zitromax",
	"Zocor",
	"Zofran",
	"Zoloft",
	"Zoltec",
	"Zometa",
	"Zovirax",
	"Zyban",
	"Zyloric",
	"Zyprexa",
	"Zyrtec",
	"Zytiga",
	"Zyvox",
	"Zyxem",
];

let allRemedios = [];

function getRemedios(inferno, button) {
	if(inferno=="clean") {
		fetch("https://fathomless-lake-32530.herokuapp.com/api/remover_categoria?categoria=" + button)
			.then(function (response) {
			})
			.catch(function (err) {
				console.log("Fetch Error :-S", err);
			});
		return
	} else if (inferno == "botaopls") {
		fetch("https://fathomless-lake-32530.herokuapp.com/api/adicionar_categoria?categoria=" + button.innerHTML)
			.then(function (response) {
				getRemedios("loadCat", button)
				getRemedios("clean", button.innerHTML)
			})
			.catch(function (err) {
				console.log("Fetch Error :-S", err);
			});

			return
	} else if (inferno == "carregaRemedio") {
		fetch("https://fathomless-lake-32530.herokuapp.com/api/download?id=" + (remediosFUNCIONA.indexOf(button) + 1))
			.then(function (response) {
				response.json().then(function (data) {
					getRemedios();
					setTimeout(() => {
						carregarPesquisa(button, data.linkbula)
					}, 400);
				});
			})
			.catch(function (err) {
				console.log("Fetch Error :-S", err);
			});
		return
	}

	fetch("https://fathomless-lake-32530.herokuapp.com/api/todos")
		.then(function (response) {
			if (response.status !== 200) {
				console.log(
					"Looks like there was a problem. Status Code: " + response.status
				);
				return;
			}

			// Examine the text in the response
			response.json().then(function (data) {
				data = Array.from(data);
				if (inferno == "auto") {
					remediosFUNCIONA = data;
					autocomplete(document.getElementById("floatingInput"), data);
				} else if (inferno == "loadCat") {
					mudarPaginaCategoria(button, data);
				}
				return data;
			});
		})
		.catch(function (err) {
			console.log("Fetch Error :-S", err);
		});
}
