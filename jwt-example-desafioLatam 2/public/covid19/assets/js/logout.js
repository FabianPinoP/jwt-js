//funcion para cerra sesion al hacer click limpia el local storage

const logout = async () => {
  $("#salir").click(function () {
    localStorage.clear();
    location.reload();
  });
};

logout();

export default logout;
