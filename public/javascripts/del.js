
//Deletes items on list 

$(function () {
    $('ul li').click(function() {   
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
    })
}