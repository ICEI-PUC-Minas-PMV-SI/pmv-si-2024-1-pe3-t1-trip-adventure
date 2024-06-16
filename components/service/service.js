if(!verificaLogin()) window.location.hash = 'login';

var map = L.map('map', {zoomControl: false}).setView([-21.5325519,-42.6479116,17], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var singleMarker;

// Adiciona um evento de clique ao mapa
map.on('click', function(e) {
var lat = e.latlng.lat;
var lng = e.latlng.lng;

$('#latitude').val(lat);
$('#longitude').val(lng);

// Remove o marcador anterior, se existir
if (singleMarker) {
    map.removeLayer(singleMarker);
}

// Adiciona um novo marcador no local clicado
singleMarker = L.marker([lat, lng]).addTo(map)
    .bindPopup('Marcador adicionado em:<br> Latitude: ' + lat + '<br> Longitude: ' + lng)
    .openPopup();
});

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
            element.removeAttr('service').attr('service','good');
        } else if (element.hasClass('good-service')) {
            element.removeClass('good-service').addClass('bad-service');
            element.removeAttr('service').attr('service','bad');
        } else if (element.hasClass('bad-service')) {
            element.removeClass('bad-service').addClass('service');
            element.removeAttr('service');
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

function validacoes(){
    var retorno = false;

    $('input,select').each(function() {
        if ($(this).val() === '') {
            $(this).addClass('error-border');
            retorno = true;
        } else {
            $(this).removeClass('error-border');
        }
    });

    if($('#latitude').val() == ''){
        $('#markerMapH3').addClass('error-text');
        return true;
    }else{
        $('#markerMapH3').removeClass('error-text');
    }

    return retorno;
}

document.querySelector('#btn-cadastro').addEventListener('click', () => {
    var validador =  validacoes();

    if(validador){
        Toastify({
            text: "Campos não preenchidos",
            duration: 3000,  // Duração em milissegundos
            close: true,  // Botão de fechar
            gravity: "top",  // Posição: "top" ou "bottom"
            position: "right",  // Posição: "left", "center" ou "right"
            backgroundColor: "#cc4a4a",  // Cor de fundo
        }).showToast();
        return false;
    }

    var objFinal = {};
    var user = JSON.parse(localStorage.getItem('logado'));

    var fileInput = $('#inputGroupFile04')[0];
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var base64String = e.target.result;

            objFinal.logo = base64String;

            objFinal.idUsuario = user.id;
            objFinal.title = $('#title').val();
            objFinal.link = $('#link').val();
            objFinal.idCategory = $('#category').val();
            objFinal.latitude = $('#latitude').val();
            objFinal.longitude = $('#longitude').val();
        
            objFinal.cep = $('#cep').val();
            objFinal.street = $('#street').val();
            objFinal.num = $('#num').val();
            objFinal.neight = $('#neight').val();
            objFinal.city = $('#city').val();
            objFinal.uf = $('#uf').val();
        
            objFinal.services = [];
        
            goodAndBadServices = $('.good-service, .bad-service');
            goodAndBadServices.each(function() {
                var id =  $(this).find('i').attr('id');
                var service = $(this).attr('service');
                objFinal.services.push({idService: id, quality: service})
            });
        
            objFinal.comments = [];
            objFinal.complaints = [];
            objFinal.assessments = [];
        
            console.log(objFinal);
        
            createItem(objFinal, 'point').then(items => {
                Toastify({
                    text: "Criado com sucesso",
                    duration: 3000,  // Duração em milissegundos
                    close: true,  // Botão de fechar
                    gravity: "top",  // Posição: "top" ou "bottom"
                    position: "right",  // Posição: "left", "center" ou "right"
                    backgroundColor: "#4CAF50",  // Cor de fundo
                }).showToast();
        
                window.location.hash = '#user-painel';
          
                }).catch(error => console.error('Erro:', error));
        };

        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecione um arquivo primeiro.');
        return false;
    }

})


getItems('categories').then(items => {
    $('#category').html('');
    var content = '<option value="">-- Selecione</option>';
    console.log(items);
    items.forEach((element) => {
        content += '<option value="'+element.id+'">'+element.titulo+'</option>'
        });
    $('#category').html(content);
})

if( !verificaLogin()) window.location.hash = 'login';