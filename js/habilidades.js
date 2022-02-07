const habilidades = document.querySelector('#select-habilidades')
const dominio = document.querySelector('#barras')
const card = document.querySelector('#card')
const card_body = document.querySelector('#card-body')

//Datos de habilidades de cada profesion
var data_disenio = [{"nombre": "Photoshop", "dominio": "90"}, {"nombre": "Illustrator", "dominio": "85"}, {"nombre": "After Effects", "dominio": "80"}, {"nombre": "Sony Vegas", "dominio": "75"} ]
var data_backend = [{"nombre": "Java", "dominio": "85"}, {"nombre": "Python", "dominio": "90"}, {"nombre": "PHP", "dominio": "85"}, {"nombre": "C++", "dominio": "90"} ]
var data_frontend = [{"nombre": "HTML", "dominio": "90"}, {"nombre": "JavaScript", "dominio": "85"}, {"nombre": "CSS", "dominio": "90"}, {"nombre": "Jquery", "dominio": "85"} ]

var titulo = document.querySelector('#habilidad-select')
var habilidad_texto = ""

/*
*=================================== MANEJO DE TIEMPOS - ANIMACIONES DE TEXTO ===================================
*/
animar_textos(true)
setTimeout(animar_textos_false, 4000)

setInterval(function(){
	animar_textos(true)
	setTimeout(animar_textos_false, 4000)
}, 5000)

function animar_textos_false(){
	animar_textos(false)
}
/*
*=================================== VISUALIZAR HABILIDADES AL HABER UN CAMBIO EN EL SELECT ===================================
*/
habilidades.addEventListener('change', (e) => {

	card.style.height = '215px'
	card_body.style.visibility = 'hidden'
	card_body.style.opacity = '0'
	card_body.style.marginTop = '-140px'
	card_body.style.transition = '0.3s ease-in-out'

	habilidad_texto = String(e.target.options[e.target.selectedIndex].text)

	if(e.target.value === '1'){
		put_html(data_disenio, habilidad_texto)
	} else if(e.target.value === '2'){
		put_html(data_backend, habilidad_texto)
	} else if(e.target.value === '3'){
		put_html(data_frontend, habilidad_texto)
	} else {
		dominio.innerHTML = ""
		titulo.textContent = ""
	}
})

/*
*=================================== FUNCION PARA IMPRIMIR DATOS ===================================
*/
function put_html(data, habilidad) {
	
	var render_html = ""
	var num = 0

	titulo.textContent = habilidad

	for (x of data) {
		render_html += "<p class=\"dominio-texto\">"+x.nombre+"</p>"+
			"<div class=\"dominio-barra\">"+
				"<div id=\"barra-"+num+"\" class=\"barra-color\" data-dominio=\""+x.dominio+"\" transition-delay: 0.3s;\"></div>"+
				"<div class=\"barra-fondo\"></div>"+
			"</div>"
		num++

		dominio.innerHTML = render_html
	}

	//Aplicar estilos al card
	card.style.height = '420px'
	card_body.style.visibility = 'visible'
	card_body.style.opacity = '1'
	card_body.style.marginTop = '-70px'
	card_body.style.transitionDelay = '0.3s'

	//Incrementar barras de progreso
	let array_barras = document.querySelectorAll('.barra-color')
	array_barras.forEach(function(e) {
		progreso(e.id, e.dataset.dominio)
	})
}

/*
*=================================== FUNCION ANIMAR TEXTOS ===================================
*/
function animar_textos(bool){

	const hola = document.querySelector('#hola'),
		mi_nombre = document.querySelector('#mi_nombre'),
		nombre_apellido = document.querySelector('#nombre_apellido')

	if( bool == true){
		hola.classList.add("jump-animation")
		mi_nombre.classList.add("slider-animation")
		nombre_apellido.classList.add("drop-animation")
		console.log(hola)

	} else {
		hola.classList.remove("jump-animation")
		mi_nombre.classList.remove("slider-animation")
		nombre_apellido.classList.remove("drop-animation")
		console.log(hola)

	}
}
/*
*=================================== FUNCION PROGRESO ===================================
*/
function progreso(id_element, max) {
	var element = document.getElementById(id_element);   
	let width = 0;
	let id = setInterval(frame, 1);

	function frame() {
		if (width == max) {
			clearInterval(id);
		} else {
			width++; 
			element.style.width = width + '%'; 
		}
	}
}