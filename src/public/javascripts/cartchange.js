
document.addEventListener('DOMContentLoaded', function(){
var get_qty = document.querySelectorAll('.cart__quantity');
var get_id = document.querySelectorAll('.btn-remove');
var items_id_qty = [];
var updateForm = document.forms['update-cart-form'];
var btnUpdateForm = document.getElementById('update-cart-btn');
var input = document.getElementById('update-cart')

get_qty.forEach(function(qty) {
   qty.onchange = function (e) {
       items_id_qty = [[get_qty[0].value, get_id[0].value]];
       for (var i = 1; i < get_qty.length; i++){
         items_id_qty.push([get_qty[i].value, get_id[i].value]);
       }
 }
});

 btnUpdateForm.onclick = function() {
   $(input).attr('value',''+items_id_qty);
   updateForm.submit();  
 };

});

