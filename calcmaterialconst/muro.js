class Muro {
	constructor(longitud, altura){
		this.longitud = longitud
		this.altura = altura
	}

	area_muro(){
		return (this.longitud) * (this.altura)
	}

	volumen_muro(profundidad){
		return this.longitud * this.altura * profundidad
	}
}