//#region GetAllProductFromCart
// (() => { 
//     refreshList();
// })
function refreshList() { 
    let totalPrice=0;
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
                `
                <button  onclick="logout()" type="submit">Logout <span class="glyphicon glyphicon-log-out"></span></span></button>
             `
            )
    }

  
    $('#itemList').empty();
    $.get(`/items/${sessionStorage.getItem("email")}`,
        (data) => { 
            $('#itemList').empty();
            if (data.length == 0) {
             
                $('#itemList').html("<b> No Products Listed for now..! </b>");
            } else { 
                for (let item of data) { 
                    console.log("1")
                    totalPrice = totalPrice + (item.product.price * item.quantity);
                    $('#itemList').append(
                        `<tr class="row text-align">
                                    <td class="col-md-2">${item.product.name}</td>
                                    <td class="col-md-2">₹ ${item.product.price}</td>
                                    <td class="col-md-4">
                                    <a href="#" id="qadd">
                                    <span class="glyphicon glyphicon-plus-sign" onclick="addToCart(${item.productId})"></span>
                                    </a>
                                    <b id = "qty">${item.quantity}</b>
                                        <a href="#" id="qsub">
                                            <span class="glyphicon glyphicon-minus-sign" onclick="deleteFromCart(${item.id})"></span>
                                        </a>
                                    </td>
                                    <td class="col-md-2"><i class="fa fa-inr" aria-hidden="true"></i>₹ ${item.product.price * item.quantity}</td>
                              
                                </tr>`
                                )
                                
                    }
                
                }
          
                $('#itemList').append(
                    `<tr class="row">
                        <td class="col-md-6"></td>
                        <td class="col-md-2"></td>
                        <td class="col-md-2">SubTotal :</td>
                        <td class="col-md-2">₹ <b id="sumtotal">0</b></td>
                    </tr>
                    <tr class="row">
                        <td class="col-md-6"></td>
                        <td class="col-md-2"></td>
                    
                    </tr>`)
                $("#sumtotal").text(totalPrice)
        })

} 
    

//#endregion

//#region Add Item To cart
function addToCart(pid) {
    if (sessionStorage.getItem("email") === null) {
        alert("Please login or signup")
    } else {
       console.log(sessionStorage.getItem("email"))
        $.post(
            '/addtocart',
            {
                id:pid,
                uemail:sessionStorage.getItem("email")
            },
            (data) => {
                if (data.success) {
                    updateCart()
                    refreshList()
                 alert("Added Successfully..")
              } else {
                    alert(data.err)
                    refreshList()
              }
            }
          );
    }
}
//#endregion

//#region Remove Item From Cart
function deleteFromCart(pid) { 
    if (sessionStorage.getItem("email") === null) { 
        alert("Please login or signup")
    }

    $.post(`/subtractqty/${pid}`,
    (data) => {
            if (data.success) {
                alert("Successfully removed item to cart...!")
                refreshList()
            } else {
                alert('Some error occurred....!!' + data.err)
                refreshList()
            }                           
    })
}
//#endregion

//#region updateCart
function updateCart() { 
    if (sessionStorage.getItem("email") === null) {
        $('#itemCount').html(`(0)`)
    }
    else { 
        $.get(`/getitems/${sessionStorage.getItem("email")}`, (data) => { 
            if (data.lenght !== 0) {
                $('#itemCount').html(
                    `(${data.count})`
                )
            } else { 
                $('#itemCount').html(`(0)`)
              
            }
        }
            

            )
    }

}
//#endregion

