//llamado de registro para obtener el jwt recibe email y password
//hace un llamado de tipo post
//almacena el token en local storage y finalmente devuelve el token

const register = async (email, password) => {
  const url = "http://localhost:3000/api/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

export default register;
