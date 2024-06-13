var map = L.map('map').setView([-21.5325519,-42.6479116,17], 19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


$('.cards').click((x) => {
    let card = $(x.target).closest('.cards');
    let latd = card.find('#latitude').val();
    let long = card.find('#longitude').val();
     map.flyTo(L.latLng(latd, long), 19);
 });


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
            maxWidth: 400,
            maxHeight: 200,
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