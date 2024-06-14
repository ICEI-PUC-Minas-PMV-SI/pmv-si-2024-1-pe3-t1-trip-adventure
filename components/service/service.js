

var map = L.map('map', {zoomControl: false}).setView([-21.5325519,-42.6479116,17], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

getItems('services').then(items => {
    $('#services').html('');
    var content = '';
    console.log(items);
    items.forEach((element) => {
        content += '<div class="col-md-2 mt-2 mb-2 mr-2 ml-2 service services"><i id="'+element.id+'" class="'+element.link+'" aria-hidden="true"></i></div>'
        });
    $('#services').html(content);

})
.finally(() => {
    $('.service').click(function() {
        var element = $(this);
        
        if (element.hasClass('service')) {
            element.removeClass('service').addClass('good-service');
        } else if (element.hasClass('good-service')) {
            element.removeClass('good-service').addClass('bad-service');
        } else if (element.hasClass('bad-service')) {
            element.removeClass('bad-service').addClass('service');
        }
    });
});



function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#street").val("");
    $("#neight").val("");
    $("#city").val("");
    $("#uf").val("");
}

//Quando o campo cep perde o foco.
$("#cep").blur(function() {

    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("#street").val("...");
            $("#neight").val("...");
            $("#city").val("...");
            $("#uf").val("...");

            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#street").val(dados.logradouro);
                    $("#neight").val(dados.bairro);
                    $("#city").val(dados.localidade);
                    $("#uf").val(dados.uf);
                    $("#ibge").val(dados.ibge);
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    limpa_formulário_cep();
                    alert("CEP não encontrado.");
                }
            });
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
});