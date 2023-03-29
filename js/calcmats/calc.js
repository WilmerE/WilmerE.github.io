console.log("Hello World")
/*###########################################################
				DICCIONARIO DE VANOS
###########################################################*/
var vano_obj = []
/*###########################################################
				TABLA DE DATOS PARA MORTERO
###########################################################*/
var tipo_mortero_obj = [
		{id: 1, tipo: '1:2', cemento: 610, arena: '0.97', agua: 250 },
		{id: 2, tipo: '1:3', cemento: 454, arena: '1.10', agua: 250 },
		{id: 3, tipo: '1:4', cemento: 364, arena: '1.16', agua: 240 },
		{id: 4, tipo: '1:5', cemento: 302, arena: '1.20', agua: 240 },
		{id: 5, tipo: '1:6', cemento: 261, arena: '1.20', agua: 235 },
	]

var table_mortero = document.querySelector('#mortero_form tbody')

var fill_table = tipo_mortero_obj.map( function(mortero){
	return `<tr> <td><input type="radio" name="tipo_mortero" value="${mortero.id}"></td><td>${mortero.tipo}</td> <td>${mortero.cemento}</td> <td>${mortero.arena}</td> <td>${mortero.agua}</td> </tr>`
})

var filter = fill_table.toString().replace(/,/g, '')

table_mortero.innerHTML = filter

/*###########################################################
						AGREGAR VANOS
###########################################################*/
const fields_vanos 	= document.querySelector('#fields_vanos')
const add_vano 		= document.querySelector('#add_vano')

add_vano.addEventListener('click', function(){
	let cant_vanos 	= document.querySelectorAll('.serie-vanos')
	let i 			= cant_vanos.length
	let new_vano 	= `<hr><div id="vano_${i}" class="serie-vanos">
						<div class="form-group">
							<label>Longitud:</label>
							<input type="number" name="long_vano_${i}" step="0.01" id="long_vano_${i}" class="form-control long-vano" required>
						</div>
						<div class="form-group">
							<label>Alatura:</label>
							<input type="number" name="alt_vano_${i}" step="0.01" id="alt_vano_${i}" class="form-control alto-vano" required>
						</div>
						<a id="id_vano_${i}" class="delete-vano" onclick="eliminar_vano(${i})">Eliminar</a>
					</div>`

	fields_vanos.insertAdjacentHTML("beforeend", new_vano)
	enable_btn_form_vano()
})

function eliminar_vano(i){
	let id_vano 		= document.querySelector(`#vano_${i}`)
	id_vano.innerHTML 	= "<span style=\"color: red;\">Eliminado</span>"
	vano_obj.splice(i,1)
}

/*###########################################################
				OBTENER DIMENSIONES BLOCK
###########################################################*/
const form_block = document.getElementById('dim_block_form')
var block_obj
var longitud_b
var altura_b
var profundidad_b

form_block.addEventListener('submit', (e) => {
	
	e.preventDefault()

	let area = document.querySelector('#area_block span')

	longitud_b 		= document.querySelector('#longitud_b').value
	altura_b 		= document.querySelector('#altura_b').value
	profundidad_b 	= document.querySelector('#profundidad_b').value
	
	disable_form(form_block)
	area.textContent = `${(longitud_b * altura_b).toFixed(2)} mts2`
})

/*###########################################################
				OBTENER DIMENSIONES MURO
###########################################################*/
const form_muro = document.getElementById('dim_muro_form')
var muro_obj
var longitud_m
var altura_m

form_muro.addEventListener('submit', (e) => {
	
	e.preventDefault()

	let area 		= document.querySelector('#area_muro span')

	longitud_m 		= document.querySelector('#longitud_m').value
	altura_m 		= document.querySelector('#altura_m').value
	disable_form(form_muro)
	area.textContent = `${(longitud_m * altura_m).toFixed(2)} mts2`
})

/*###########################################################
						AREA DE VANOS
###########################################################*/
const form_vanos 		= document.querySelector('#dim_vanos_form')
const btn_vano_form 	= document.querySelector('#submit_vanos')
var if_vanos_obj 		= Object.keys(vano_obj).length === 0
var area_vanos 			= 0.00

form_vanos.addEventListener('submit', (e) => {

	e.preventDefault()

	let if_vanos 	= document.querySelectorAll('.serie-vanos .form-group')
	let area 		= document.querySelector('#area_vanos span')

	if( if_vanos.length > 0){
		let longitud_vanos 	= document.querySelectorAll('.long-vano')
		let altura_vanos 	= document.querySelectorAll('.alto-vano')

		for(let i = 0; i<longitud_vanos.length; i++){
			let ancho = parseFloat(longitud_vanos[i].value)
			let alto = parseFloat(altura_vanos[i].value)
			let area = ancho * alto
			vano_obj[i] = {longitud: ancho, altura: alto, area: area}
		}

		if_vanos_obj = Object.keys(vano_obj).length === 0
		area_vanos = vano_obj.map( item => item.area).reduce( (cont, prev) => cont + prev,0)
	} else {
		area_vanos = 0.00
		if_vanos_obj = Object.keys(vano_obj).length === 0
	}

	//disable_form(form_vanos)
	area.textContent = `${area_vanos.toFixed(2)}`
})

function enable_btn_form_vano(){
	btn_vano_form.disabled = false
}

/*###########################################################
					CALCULAR MATERIALES
###########################################################*/
const btn_calcular 		= document.querySelector('#btn_calcular_todo')
const btn_mortero_form 	= document.querySelector('#btn_mortero_form')
const msg_error 		= document.querySelector('#msg_error')

btn_calcular.addEventListener('click', function(){
	if( longitud_b === undefined || longitud_m === undefined){
		msg_error.textContent = "No se ha registrado un block o muro"
	} else {
		calcular()
		btn_mortero_form.disabled = false
		msg_error.textContent = ""
	}
	
})

var vol_mortero

function calcular(){

	let show_msg 	= document.querySelector('#cant_blocks')
	let show_msg2 	= document.querySelector('#vol_mortero')

	block_obj 	= new Block(longitud_b, altura_b, profundidad_b)
	muro_obj	= new Muro(longitud_m, altura_m)

	let area_bloque 	= block_obj.area_bloque()
	let area_muro 		= area_vanos > 0 ? muro_obj.area_muro() - area_vanos : muro_obj.area_muro()
	let blocks_exact	= area_muro / area_bloque
	let blocks_extra	= blocks_exact * 1.05 //+ 5% para desperdicio
	let vol_block 		= block_obj.volumen_block()
	let vol_muro 		= muro_obj.volumen_muro(profundidad_b)
	
	vol_mortero 		= vol_muro - ( blocks_exact * vol_block )

	show_msg.textContent 	= `Cantidad de blocks a utilizar es de ${blocks_extra.toFixed(2)} unidades, tomando en cuenta un 5% de desperdicio.`
	show_msg2.textContent 	= `Cantidad de mortero a utilizar es de ${vol_mortero.toFixed(2)}m3`
	console.log(area_muro)
}

/*###########################################################
				MATERIALES PARA MORTERO
###########################################################*/
const form_mortero = document.getElementById('mortero_form')
var cant_cemento
var cant_cal
var cant_arena
var cant_agua

form_mortero.addEventListener('submit', (e) => {

	e.preventDefault()

	let get_ids = []
	let show_msg3 = document.querySelector('#mats_mortero')

	let id_mortero 	= document.querySelectorAll('#mortero_form input[type="radio"]')
	let cal_id 	= document.querySelector('#cant_cal').value

	//cal_id == ' ' || cal_id > 0 ? console.log(cal_id) : console.log('Cal vacio')

	for (let i = 0; i < id_mortero.length; i++) {
		get_ids[id_mortero[i].value] = id_mortero[i].checked
	}

	function getObjectKey(obj, value) {
		return Object.keys(obj).find(key => obj[key] === value);
	}

	if( getObjectKey(get_ids, true) ){
		let mortero_selected = tipo_mortero_obj.filter( function(mortero){
			return mortero.id == getObjectKey(get_ids, true)
		})

		console.log(mortero_selected[0])
		let temp_cal = mortero_selected[0].cemento * parseFloat(cal_id)

		cant_cemento 	= (mortero_selected[0].cemento * vol_mortero.toFixed(2)) * 1.05
		cant_cal 		= cal_id == ' ' || cal_id > 0 ? (temp_cal) * vol_mortero.toFixed(2) * 1.05 : 0
		cant_arena 		= (parseFloat(mortero_selected[0].arena) * vol_mortero.toFixed(2)) * 1.05
		cant_agua 		= (mortero_selected[0].agua * vol_mortero.toFixed(2)) * 1.05
		
		show_msg3.innerHTML = `<ul> <li>Cemento: ${cant_cemento.toFixed(3)}kg</li> <li>Cal: ${cant_cal.toFixed(3)}kg</li> <li>Arena: ${cant_arena.toFixed(3)}m3</li> <li>Agua: ${cant_agua.toFixed(3)}Litros</li> </ul>`
	}
})
/*###########################################################
			HABILITAR / DESHABILITAR FORMULARIOS
###########################################################*/
function disable_form(form){
	let fields = document.querySelectorAll(`#${form.id} input`)

	fields.forEach(function(item) {
		item.disabled = true
	})
}

function enable_form(form){
	let fields = document.querySelectorAll(`#${form.id} input`)

	fields.forEach(function(item) {
		item.disabled = false
	})
}