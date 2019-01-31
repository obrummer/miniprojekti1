/*$(document).on('click', function () {
    var $id = $(this).attr('id').split('-')[1];
    console.log($id);
    deleteItem($id);
});*/

$(function () {
    $('ul li').click(function() {   // poistaa tuotteen html-listalta -LM
    console.dir(this);
    deleteItem(this.id)
    $(this).remove();
    });
 });

function deleteItem(id){
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/tuotteet/" + id,
        "method": "DELETE"
    }).done(function(response) {
        console.dir(response);
       // location.reload();
    })
}