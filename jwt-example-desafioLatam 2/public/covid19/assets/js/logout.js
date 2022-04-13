const logout = async () => {
    $("#salir").click(function () {
        localStorage.clear();
        location.reload();
    });
};

logout();

export default logout;