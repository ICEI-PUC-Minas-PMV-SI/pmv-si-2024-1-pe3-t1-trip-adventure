document.querySelector('#btn-system-services').addEventListener('click', () => {

    getItems('services').then(items => {
        $('#system-services').html();
        $('#system-services').css('display','block');
        var content = '';
        console.log(items);
        items.forEach((element) => {
                    content += "<div class='row'>";
                    content +=    "<div class='col col-md-1' id='service-id'>#"+element.id+"</div>";
                    content +=    "<div class='col col-md-6' id='service-tittle'>"+element.titulo+"</div>";
                    content +=    "<div class='col col-md-2' id='service-link'>"+element.link+"</div>";
                    // content +=    "<div class='col col-md-2' id='service-link'>"+element.cpf+"</div>";
                    content +=    "</div>";
            });
        $('#system-services').html(content);

        // loadjsbuttons();
    });
});

document.querySelector('#btn-system-users').addEventListener('click', () => {

    getItems('usuarios').then(items => {
        $('#system-users').html();
        $('#system-users').css('display','block');
        var content = '';
        console.log(items);
        items.forEach((element) => {
                    content += "<div class='row'>";
                    content +=    "<div class='col col-md-1' id='user-id'>#"+element.id+"</div>";
                    content +=    "<div class='col col-md-4' id='user-name'>"+element.nome+"</div>";
                    content +=    "<div class='col col-md-4' id='user-email'>"+element.cpf+"</div>";
                    content +=    "<div class='col col-md-2' id='user-age'>"+element.idade+"</div>";
                    if(element.adm == 'S'){
                        content +=    "<div class='col col-md-1' id='user-adm-"+element.id+"'>"+"<i class='fa fa-user user-adm' value='"+element.adm+"' aria-hidden='true'></i>"+"</div>";
                    }else{
                        content +=    "<div class='col col-md-1 ' id='common-user-"+element.id+"'>"+"<i class='fa fa-user common-user' value='"+element.adm+"' aria-hidden='true'></i>"+"</div>";
                    }
                    content +=    "</div>";
            });
        $('#system-users').html(content);

        loadjsbuttons();
    });
});

document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('logado');
    alert("Deslogado com sucesso");
    // verificaLogin();
    window.location.hash = '#';
  });

function loadjsbuttons(){
    $('.common-user,.user-adm').each(function(index, element){
        $(element).click(function(x,y){
            var id = $(x.target).parent().parent().find("div#user-id").html().substring(1);
            var adm = $(x.target).attr('value');
            if(adm == 'N') adm = 'S';
            else adm = 'N';

            getItemById('usuarios','id='+id).then(items => {
                items = items[0];
                var obj = {
                    "id": items.id,
                    "nome":items.nome,
                    "sexo":items.sexo,
                    "cpf":items.cpf,
                    "idade":items.idade,
                    "email":items.email,
                    "senha":items.senha,
                    "adm": adm
                };

                updateItem('usuarios',id , obj).then(items => {
                    console.log(items);
                }).catch(error => console.error('Erro:', error));
        
            });

        });
    });

}