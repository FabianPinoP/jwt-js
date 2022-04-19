const menu = () => {
	document.getElementById("situacion").innerHTML =
		'<a class="nav-link" type="button" href="./chile.html" >Situacion Chile</a>';
	document.getElementById("cerrarSesion").innerHTML =
		'<a id="salir" class="nav-link" type="button" href="" >Cerrar Sesion</a>';
};

const menuChile = () => {
	$("#home").removeClass("active");
	document.getElementById("situacion").innerHTML =
		'<a class="nav-link active" type="button" href="#" >Situacion Chile</a>';
	document.getElementById("cerrarSesion").innerHTML =
		'<a id="salir" class="nav-link" type="button" href="index.html" >Cerrar Sesion</a>';
};

export { menu, menuChile };
