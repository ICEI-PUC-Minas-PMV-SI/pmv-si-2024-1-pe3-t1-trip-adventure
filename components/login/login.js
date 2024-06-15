document.querySelector('#btn-register').addEventListener('click', () => {
    // Altera a hash da URL para a rota "about"
    window.location.hash = 'register';
});

if( verificaLogin()) window.location.hash = 'user-painel';


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

            Toastify({
                text: "Logado com sucesso!",
                duration: 3000,  // Duração em milissegundos
                close: true,  // Botão de fechar
                gravity: "top",  // Posição: "top" ou "bottom"
                position: "right",  // Posição: "left", "center" ou "right"
                backgroundColor: "#4CAF50",  // Cor de fundo
            }).showToast();
        }else{
            // Adicionar evento ao botão para mostrar o Toast
            Toastify({
                text: "Usuario não encontrado",
                duration: 3000,  // Duração em milissegundos
                close: true,  // Botão de fechar
                gravity: "top",  // Posição: "top" ou "bottom"
                position: "right",  // Posição: "left", "center" ou "right"
                backgroundColor: "#cc4a4a",  // Cor de fundo
            }).showToast();
        }

    });

});