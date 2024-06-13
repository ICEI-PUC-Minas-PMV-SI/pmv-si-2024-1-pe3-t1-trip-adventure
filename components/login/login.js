document.querySelector('#btn-register').addEventListener('click', () => {
    // Altera a hash da URL para a rota "about"
    window.location.hash = 'register';
});


document.querySelector('#btn-login-acao').addEventListener('click', () => {
    var nome = document.getElementById('login').value;
    var password = document.getElementById('senha').value;

    getItems('usuarios').then(items => {
        // console.log(items);
        var resultadofiltro = items.filter(obj =>{
            if (obj.email === nome && obj.senha === password) {
                return obj;
            }
        });

        var usuario = resultadofiltro[0];
        
        if(usuario){
            localStorage.setItem('logado',JSON.stringify(usuario));
            
            // verificaLogin();
            window.location.hash = 'user-painel';
        }

    });

});