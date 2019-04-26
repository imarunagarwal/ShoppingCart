$(() => { 
  console.log("refreshing list")
  refreshList()
})
//#region RefreshList
function refreshList() { 
  // console.log(sessionStorage.getItem("email"))
  if (sessionStorage.getItem("email") === null)
    {
            $("#user").html(
                `<a class="navbar-brand" id="signupUrl" onclick="changeUrl()" href="/Registration/user.html"> SignUp<span class="glyphicon glyphicon-user"></span></a>
                <form class="form-inline my-2 my-lg-0">
                <input id="email" class="form-control mr-sm-2" type="email" placeholder="Enter email" aria-label="Email">  
                </form>
                <button  onclick="login()" type="submit">Login <span class="glyphicon glyphicon-log-in"></span></span></button>
              `
            )
   } else {
            $("#user").html(
                `<button onclick="logout()" type="submit">Logout <span class="glyphicon glyphicon-log-out"></span></span></button>
             `
            )
        }

  $.get('/shopping/vendor', (data) => {
    $('#vendorList').empty()
        
    for (let ven of data) {
      console.log(ven.name)
      $('#vendorList').append(
        `<option value="${ven.id}">${ven.name}</option>`
      )           
    }
  });
  $.get('/product', (data) => {
    $('#productList').empty()
    for (let product of data) {
      $('#productList').append(
        `  <div class="col-sm-3 well" style="margin-left:2em; margin-right:3em;">
        <table class="hover">
            <tr>
            <td>Product:</td>
            <td><b>${product.name}</b></td></tr>
           <tr>
           <td>Price:</td>
           <td><b> &#8377 ${product.price}</b></td></tr>
           <tr>
           <td>Quantity:</td>
           <td><b>${product.quantity}</b></td></tr>
          
           <tr> <td>   <button  id="delVendor" onclick="removeProduct(${product.id})">remove
            <span class="glyphicon glyphicon-remove-sign"> </span> 
            </button>
           </td></tr>
          </table></div>`
      )
    }
  });
}
//#endregion RefreshList()

//#region Add Product
function addProduct()
{ 
    console.log("i am in post")
    console.log($('#vendorList').val())
  $.post(
    '/Products/products',
    {
      name: $('#productname').val(),
      price: $('#price').val(),
      quantity: $('#quantity').val(),
      vendorId: $('#vendorList').val()
    },
    (data) => {
      if (data.success) {
         $('#productname').val(''),
        $('#price').val(''),
        $('#quantity').val(''),
        $('#vendorList').val('')
         refreshList()
      } else {
        alert('Some error occurred')
      }
    }
  );
}
//#endregion

//#region Remove Product
refreshList()
function removeProduct(id) { 
    { 
        $.ajax({
         url: `/product/${id}`,
         method: 'DELETE',
         contentType: 'application/json',
         success: function(data) {
         console.log("success")
         },
         error: function(request,msg,error) {
             console.log("failed")
            }
        });
        refreshList()
     }
}
//#endregion

//#region Change Url

$('#vendor').click(()=>{
windows.location.replace("/Vendor/addVendor.html")
}) 
$('#signupUrl').click(() => { 
  window.location.replace("/Registration/user.html")
})
$('#product').click(()=>{
  windows.location.replace("/Products/product.html")
}) 
$('#home').click(()=>{
  windows.location.replace("/index.html")
}) 
//#endregion