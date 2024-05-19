document.querySelector('#btn-registro-pessoa').addEventListener('click', () => {
    var flag = true;
    document.getElementById("senha").style.borderColor = '';
    document.getElementById("confirmarsenha").style.borderColor = '';
    document.getElementById("nomee").style.borderColor = '';
    document.getElementById("cpf").style.borderColor = '';
    document.getElementById("email").style.borderColor = '';
    document.getElementById("telefone").style.borderColor = '';

    var nome  =          document.getElementById("nomee").value;
    var sexo  =          document.getElementById("sexo").value;
    var cpf   =          document.getElementById("cpf").value;
    var telefone   =     document.getElementById("telefone").value;
    var idade =          document.getElementById("idade").value;
    var email =          document.getElementById("email").value;
    var senha =          document.getElementById("senha").value;
    var confirmarsenha = document.getElementById("confirmarsenha").value;

    if(senha !== confirmarsenha){
        document.getElementById("senha").style.borderColor = 'red';
        document.getElementById("confirmarsenha").style.borderColor = 'red';
        alert("Senhas não batem");

        return true;
    }

    if(nome == ''){
        document.getElementById("nomee").style.borderColor = 'red';
        flag = false;
    }
    if(cpf == ''){
        document.getElementById("cpf").style.borderColor = 'red';
        flag = false;
    }
    if(email == ''){
        document.getElementById("email").style.borderColor = 'red';
        flag = false;
    }
    if(telefone == ''){
        document.getElementById("telefone").style.borderColor = 'red';
        flag = false;
    }

    if(flag != true){
        alert("Preencha as informações obrigatórias");

        return true;
    }

    var obj = {
        "nome":nome,
        "sexo":sexo,
        "cpf":cpf,
        "idade":idade,
        "email":email,
        "senha":senha
    };

    createItem(obj, 'usuarios').then(items => {
      alert("Criado com sucesso");
      }).catch(error => console.error('Erro:', error));
});