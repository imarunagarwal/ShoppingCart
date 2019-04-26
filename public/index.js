$(() => { 
 
    refreshList()
})
function refreshList() {

    //#region html functionality
    if (sessionStorage.getItem("email") === null)
    {
            $("#user").html(
                `<a class="navbar-brand" id="signupUrl" onclick="changeUrl()" href="/Registration/user.html"> SignUp<span class="glyphicon glyphicon-ok"></span></a>
                <form class="form-inline my-2 my-lg-0">
                <input id="email" class="form-control mr-sm-2" type="email" placeholder="Enter Login id" aria-label="Email">  
                </form>
                <button  onclick="login()" type="submit">Login <span class="glyphicon glyphicon-log-in"></span></span></button>
              `
            )
   } else {
            $("#user").html(
                `<a class="navbar-brand" href="Cart/cart.html"> Cart<span class="glyphicon glyphicon-shopping-cart"></span><b id="itemCount">(0)</b></a>
                <button  onclick="logout()" type="submit">Logout <span class="glyphicon glyphicon-log-out"></span></span></button>
             `
            )
    }
    //#endregion
    
//#region get All Products
    $.get('/product', (data) => {
        $('#ProductList').empty()
      for (let product of data) {
          // console.log(product)
          $('#ProductList').append(
          `
          <div class="col-sm-3 well" style="margin-left:2em; margin-right:3em;">
          <table class="hover">
          <tr>
          <td> Product:</td>
          <td><b>${product.name}</b></td>
          </tr>
          <tr>
          <td> Price:</td>
          <td><b> &#8377 ${product.price}</b></td>
          </tr>
         <tr>
         <td>
            <button class=" " onclick="addToCart(${product.id})" type="submit" max=5 <b><span class="
            glyphicon glyphicon-plus-sign"></span> Cart</b></button>
            </table>
            </div>
            `
          )
        }
    })
  
  updateCart()
  
    //#endregion
    
}
//#region change Url
$('#signupUrl').click(() => { 
    window.location.replace("/Registration/user.html")
})
//#endregion