var map = L.map('map', {zoomControl: false}).setView([-21.5325519,-42.6479116,17], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var active_modals = []

function clear_array(){
    active_modals.forEach(modal => {
        modal.style.display = 'none';
    })
    active_modals = []
}


$('#filterInput').keyup((x) => {
    const filterValue = document.getElementById('filterInput').value.toLowerCase();

    const divs = $('.cards');

    divs.each((x,div) => {
        const spanText = $(div).find('#name').children().html().toLowerCase();
        if (spanText.includes(filterValue) || spanText.includes(filterValue)) {
            $(div).removeClass('hide');
        } else {
            $(div).addClass('hide');
        }
    });
 });


function loaders(){
    $('.map').click((x) => {
        clear_array()
    })

    $('.cards').hover((x) => {
        let card = $(x.target).closest('.cards');
        let latd = card.find('#latitude').val();
        let long = card.find('#longitude').val();
        map.flyTo(L.latLng(latd, long), 19, {duration: 1});

    });

    $('.cards').click(function(event) {

        var obj = JSON.parse(atob($(event.target).closest('.cards').attr('data-target')));
        $('#detail-name').html(obj.title);
        $('#detail-city').html(obj.city);
        $('#detail-uf').html(obj.uf);
        $('#detail-street').html(obj.street);
        $('#detail-number').html(obj.num);
        $('#detail-category').html(obj.category.titulo);

        $('#detail-latitude').html(obj.latitude);
        $('#detail-longitude').html(obj.longitude);
        $('#detail-name').attr("href", obj.link);
        var html = '';
        obj.services.forEach((element) => {
            html+= '<div class="col-md-3 mt-2 mb-2 mr-2 ml-2 '+element.quality+'-service services"><i id="'+element.idService+'" class="'+element.link+'" aria-hidden="true"></i></div>';
        });
        $('#detail-services').html(html);

        if(obj.logo){
            $('#detail-logo').attr("src", obj.logo);
        }


        document.getElementById('toggle').classList.toggle('hide');
    });

    $('#form-comment').submit((e) => {
        e.target.parentNode.style.display = 'none';
        e.preventDefault();
    });

    $('.icon-expand').click((x) => {
        $('.other_filters').css('display','flex');
     });
    
     $('.c-icon-close').click((x) => {
        $('.other_filters').css('display','none');
     });
}



//  $('.make-comment').click((x) => {
//     $(document).find(".make-comment-form")[0].style.display = 'block'
//  })

//  $('.drop-comment').click((x) => {
//     console.log("click");
//     comment = $(x.target.parentNode).find('.comment')[0]
//     if (comment.style.display == 'block'){
//         comment.style.display = 'none'
//         x.target.innerHTML = "Comentários &#x25BC;"
//     } else{
//         comment.style.display = 'block'
//         x.target.innerHTML = "Comentários &#x25B2;"
//     }
//  })


 loadMarkers()

 function loadMarkers(){
    var array_item = [];
    
    $('.cards').each((x, item)=> {
        array_item.push({
            latd: $(item).find('#latitude').val(),
            long: $(item).find('#longitude').val(),
            name: $(item).find('#name').html()
        });

        var marker = L.marker([array_item[x].latd, array_item[x].long]);
        
        marker.title = array_item[x].name;

        var customPopup = L.popup({
            closeButton: false,
            minWidth: 200,
            maxWidth: 1000,
            maxHeight: 1000,
            autoClose: true,
            closeOnEscapeKey: false,
            className: 'item'
        }).setContent('<b>'+array_item[x].name+'</b><br><i class="fa fa-star" style="color: gold;" aria-hidden="true"></i><i class="fa fa-star" style="color: gold;" aria-hidden="true"></i><i class="fa fa-star" style="color: gold;" aria-hidden="true"></i><i class="fa fa-star" style="color: gold;" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>');

        marker.on('mouseover', ()=>{
            marker.bindPopup(customPopup).openPopup();
        });

        marker.addTo(map);
    });
 }


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

                    html += '<div class="cards" data-target="'+btoa(JSON.stringify(element))+'">';
                    html += '    <div class="details">';
                    html += '        <h5 id="name"><a target="_blank" href="'+element.link+'">'+element.title+'</a></h5>';
                    html += '        <div class="adress">';
                    html += '            <p><span id="city">'+element.city+'</span>,<span id="complement">'+element.uf+'</span></p>';
                    html += '            <p><span id="street">'+element.street+'</span>,<span id="number">'+element.num+'</span></p>';
                    html += '            <p>';
                    html += '                <span id="ranking">';
                    html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                    html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                    html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                    html += '                    <i class="fa fa-star" style="color: gold;" aria-hidden="true"></i>';
                    html += '                    <i class="fa fa-star" aria-hidden="true"></i>';
                    html += '                </span>';
                    html += '                <span id="category" class="ml-2">'+element.category.titulo+'</span>';
                    html += '            </p>';
                    html += '            <input type="hidden" name="hidden" id="latitude" value="'+element.latitude+'">';
                    html += '            <input type="hidden" name="hidden" id="longitude" value="'+element.longitude+'">';
                    html += '        </div>';
                    html += '    </div>';
                    html += '</div>';
                    $('.get-points').append(html);

                    loadMarkers();
                    loaders();
                });

                loadMarkers();
                loaders();
            });
            loaders();
        });

    });
})