document.querySelector('#btn-register').addEventListener('click', () => {
    // Altera a hash da URL para a rota "about"
    window.location.hash = 'register';
});


document.querySelector('#btn-login-acao').addEventListener('click', () => {
    let nome = document.getElementById('login').value;
    let password = document.getElementById('senha').value;

    getItems('usuarios').then(items => {
        var resultadofiltro = items.filter(obj =>{
            if (obj.nome === nome && obj.senha === password) {
                return obj;
            }
        });

        var usuario = resultadofiltro[0];

        if(usuario.nome){
            localStorage.setItem('logado',JSON.stringify(usuario));
            
            verificaLogin();
            window.location.hash = '#';
        }

    });

});