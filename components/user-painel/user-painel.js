if(!verificaLogin()) window.location.hash = 'login';

document.querySelector('#btn-system-services').addEventListener('click', () => {
    limpaTable();

    getItems('services').then(items => {
        $('#system-services').html();
        $('#system-services').css('display','block');
        var content = '';
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

var usuario = JSON.parse(localStorage.getItem("logado"));

$('#name').html(usuario.nome);

if(usuario.adm == 'S'){
    $('#btn-system-users').css('display','block');
    $('#btn-system-reports').css('display','block');
    $('#btn-system-places').css('display','block');
    $('#btn-system-services').css('display','block');
}

document.querySelector('#btn-system-users').addEventListener('click', () => {
    limpaTable();

    getItems('usuarios').then(items => {
        $('#system-users').html();
        $('#system-users').css('display','block');
        var content = '';
        items.forEach((element) => {
                    content += "<div class='row'>";
                    content +=    "<div class='col col-md-1' id='user-id'>#"+element.id+"</div>";
                    content +=    "<div class='col col-md-4' id='user-name'>"+element.nome+"</div>";
                    content +=    "<div class='col col-md-4' id='user-email'>"+element.cpf+"</div>";
                    content +=    "<div class='col col-md-2' id='user-age'>"+element.idade+"</div>";
                    if(usuario.adm == 'S'){
                        if(element.adm == 'S'){
                            content +=    "<div class='col col-md-1' id='user-adm-"+element.id+"'>"+"<i class='fa fa-user user-adm' value='"+element.adm+"' aria-hidden='true'></i>"+"</div>";
                        }else{
                            content +=    "<div class='col col-md-1 ' id='common-user-"+element.id+"'>"+"<i class='fa fa-user common-user' value='"+element.adm+"' aria-hidden='true'></i>"+"</div>";
                        }
                    }
                    content +=    "</div>";
            });
        $('#system-users').html(content);

        loadjsbuttons();
    });
});


document.querySelector('#btn-system-places').addEventListener('click', () => {
    limpaTable();

    getItems('point').then(items => {
        var services = items;
        
        $('.get-points').html(null);
    
        getItems('services').then(items => {
            
            services.forEach((element) => {
                element.services.forEach((servi) => {
                    var t = items.filter(item => item.id === servi.idService)[0];
                    servi.link = t.link;
                    servi.titulo = t.titulo;
                });
    
                var html = '';
                var userRequest = getItemById('usuarios', element.idUsuario).then((item)=> {
                    element.user = item[0];
    
                    var categoryRequest = getItemById('categories', element.idCategory).then((item3)=> {
                        element.category = item3[0];

                        $('#system-places').html();
                        $('#system-places').css('display','block');

                        var content = '';
                        
                        content += "<div class='row' data-target='"+btoa(JSON.stringify(element))+"'>";
                        content +=    "<div class='col col-md-1' id='system-places-id'>#"+element.id+"</div>";
                        content +=    "<div class='col col-md-3' id='system-places-title'>"+element.title+"</div>";
                        content +=    "<div class='col col-md-5' id='system-places-adress'>"+element.street+", "+element.city+"-"+element.uf+"</div>";
                        content +=    "<div class='col col-md-2' id='system-places-category'>"+element.category.titulo+"</div>";
                        content +=    "</div>";
                      
                        $('#system-places').append(content);
                
    
                        // html += '<div class="cards" data-target="'+btoa(JSON.stringify(element))+'">';
                        // html += '    <div class="details">';
                        // html += '        <h5 id="name"><a target="_blank" href="'+element.link+'">'+element.title+'</a></h5>';
                        // html += '        <div class="adress">';
                        // html += '            <p><span id="city">'+element.city+'</span>,<span id="complement">'+element.uf+'</span></p>';
                        // html += '            <p><span id="street">'+element.street+'</span>,<span id="number">'+element.num+'</span></p>';
                        // html += '            <p>';
                        // html += '                <span id="ranking">';
                        // html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                        // html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                        // html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                        // html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                        // html += '                    <i class="fa fa-star" aria-hidden="true"></i>';
                        // html += '                </span>';
                        // html += '                <span id="category" class="ml-2">'+element.category.titulo+'</span>';
                        // html += '            </p>';
                        // html += '            <input type="hidden" name="hidden" id="latitude" value="'+element.latitude+'">';
                        // html += '            <input type="hidden" name="hidden" id="longitude" value="'+element.longitude+'">';
                        // html += '        </div>';
                        // html += '    </div>';
                        // html += '</div>';
    
                    });
    
                });
            });


        });
    })
});

document.querySelector('#btn-my-places').addEventListener('click', () => {
    limpaTable();

    const user = JSON.parse(localStorage.getItem('logado'));

    getItems('point','?idUsuario='+user.id).then(items => {
        var services = items;
        
        console.log(items);
        $('.get-points').html(null);
    
        getItems('services').then(items => {
            
            services.forEach((element) => {
                element.services.forEach((servi) => {
                    var t = items.filter(item => item.id === servi.idService)[0];
                    servi.link = t.link;
                    servi.titulo = t.titulo;
                });
    
                var html = '';
                var userRequest = getItemById('usuarios', element.idUsuario).then((item)=> {
                    element.user = item[0];
    
                    var categoryRequest = getItemById('categories', element.idCategory).then((item3)=> {
                        element.category = item3[0];

                        $('#my-places').html();
                        $('#my-places').css('display','block');

                        var content = '';
                        
                        content += "<div class='row' data-target='"+btoa(JSON.stringify(element))+"'>";
                        content +=    "<div class='col col-md-1' id='system-places-id'>#"+element.id+"</div>";
                        content +=    "<div class='col col-md-3' id='system-places-title'>"+element.title+"</div>";
                        content +=    "<div class='col col-md-5' id='system-places-adress'>"+element.street+", "+element.city+"-"+element.uf+"</div>";
                        content +=    "<div class='col col-md-2' id='system-places-category'>"+element.category.titulo+"</div>";
                        content +=    "</div>";
                      
                        $('#my-places').append(content);
                    });
    
                });
            });


        });
    })
});

document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('logado');
    Toastify({
        text: "Deslogado com sucesso",
        duration: 3000,  // Duração em milissegundos
        close: true,  // Botão de fechar
        gravity: "top",  // Posição: "top" ou "bottom"
        position: "right",  // Posição: "left", "center" ou "right"
        backgroundColor: "#4CAF50",  // Cor de fundo
    }).showToast();
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

            getItems('usuarios','?id='+id).then(items => {

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

                updateItem('usuarios',id , obj).then(() => 
                    Toastify({
                        text: "Atualizado com sucesso",
                        duration: 3000,  
                        close: true,  
                        gravity: "top",  
                        position: "right",  
                        backgroundColor: "#4CAF50",  
                    }).showToast()
                    
                ).catch(error => console.error('Erro:', error));
        
            });

        });
    });

}

function limpaTable(){

    $('#my-places').html(null).css('display','none');
    $('#my-reports').html(null).css('display','none');
    $('#system-users').html(null).css('display','none');
    $('#system-reports').html(null).css('display','none');
    $('#system-places').html(null).css('display','none');
    $('#system-services').html(null).css('display','none');
}