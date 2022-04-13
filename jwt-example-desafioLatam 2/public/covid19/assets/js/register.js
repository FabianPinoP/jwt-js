const register = async (email, password) => {
  const url = "http://localhost:3000/api/login";
  try {
    //llamado a endpoint de registro para obtener token
    const response = await fetch(url, {
      // tipo de request
      method: "POST",
      body: JSON.stringify({ email: email, password: password }), //recibe los parametros y crea el token con la info del usuario registrado
    });
    const { token } = await response.json(); //retorna el token en una respuesta json
    localStorage.setItem("jwt-token", token); // persiste el token en local storage
    return token; //retorna el token
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
export default register;
