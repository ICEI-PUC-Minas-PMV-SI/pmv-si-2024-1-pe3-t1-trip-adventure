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

 $('.map').click((x) => {
    console.log("Click");
    clear_array()
 })

$('.cards').click((x) => {
    let card = $(x.target).closest('.cards');
    let latd = card.find('#latitude').val();
    let long = card.find('#longitude').val();
    map.flyTo(L.latLng(latd, long), 19, {duration: 1});
    modal = card.find('.card-modal')[0];
    //modal.style.display = 'flex';

    //active_modals.push(modal);
    console.log(active_modals)
    if(!active_modals.includes(modal)){
        clear_array()
        setTimeout(() => {
        modal.style.display = 'flex';
        active_modals.push(modal);
        }, 250)
    }
 });

 $('#form-comment').submit((e) => {
    e.target.parentNode.style.display = 'none';
    e.preventDefault();
 });



 $('.make-comment').click((x) => {
    $(document).find(".make-comment-form")[0].style.display = 'block'
 })

 $('.drop-comment').click((x) => {
    console.log("click");
    comment = $(x.target.parentNode).find('.comment')[0]
    if (comment.style.display == 'block'){
        comment.style.display = 'none'
        x.target.innerHTML = "Comentários &#x25BC;"
    } else{
        comment.style.display = 'block'
        x.target.innerHTML = "Comentários &#x25B2;"
    }
 })


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

 $('.icon-expand').click((x) => {
    $('.other_filters').css('display','flex');
 });

 $('.c-icon-close').click((x) => {
    $('.other_filters').css('display','none');
 });

 getItems('services').then(items => {
    $('#filter-2').html('');
    var content = '';
    console.log(items);
    items.forEach((element) => {
        content += '<option value="'+element.id+'">'+element.titulo+'</option>'
        });
    $('#filter-2').html(content);
})