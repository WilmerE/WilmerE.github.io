class Block {
	constructor(longitud, altura, profundidad){
		this.longitud = longitud
		this.altura = altura
		this.profundidad = profundidad
	}

	area_bloque(){
		return ( (parseFloat(this.longitud) + 0.02 ) * ( parseFloat(this.altura) + 0.02 ) )
	}

	area_block(){
		return this.longitud * this.altura
	}

	volumen_block(){
		return this.longitud * this.altura * this.profundidad
	}
}