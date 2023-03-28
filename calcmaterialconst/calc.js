console.log("Hello World")
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

	let area = document.querySelector('#area_muro span')

	longitud_m 		= document.querySelector('#longitud_m').value
	altura_m 		= document.querySelector('#altura_m').value
	disable_form(form_muro)
	area.textContent = `${(longitud_m * altura_m).toFixed(2)} mts2`
	calcular()
})

/*###########################################################
					CALCULAR MATERIALES
###########################################################*/
var vol_mortero

function calcular(){

	let show_msg = document.querySelector('#cant_blocks')
	let show_msg2 = document.querySelector('#vol_mortero')

	block_obj 	= new Block(longitud_b, altura_b, profundidad_b)
	muro_obj	= new Muro(longitud_m, altura_m)

	let area_bloque 	= block_obj.area_bloque()
	let area_muro 		= muro_obj.area_muro()
	let blocks_exact	= area_muro / area_bloque
	let blocks_extra	= blocks_exact * 1.05 //+ 5% para desperdicio
	let vol_block 		= block_obj.volumen_block()
	let vol_muro 		= muro_obj.volumen_muro(profundidad_b)
	
	vol_mortero 		= vol_muro - ( blocks_exact * vol_block )

	show_msg.textContent 	= `Cantidad de blocks a utilizar es de ${blocks_extra.toFixed(2)} unidades, tomando en cuenta un 5% de desperdicio.`
	show_msg2.textContent 	= `Cantidad de mortero a utilizar es de ${vol_mortero.toFixed(2)}m3` 
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