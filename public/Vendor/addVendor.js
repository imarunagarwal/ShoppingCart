//#region RefreshList
$(() => { 
  refreshList()
})
refreshList()
function refreshList() {
  if (sessionStorage.getItem("email") === null)
  {
          $("#user").html(
              `<a class="navbar-brand" id="signupUrl" onclick="changeUrl()" href="/Registration/user.html"> SignUp<span class="glyphicon glyphicon-ok"></span></a>
              <form class="form-inline my-2 my-lg-0">
              <input id="email" class="form-control mr-sm-2" type="email" placeholder="Enter login id" aria-label="Email">  
              </form>
              <button onclick="login()" type="submit">Login <span class="glyphicon glyphicon-log-in"></span></span></button>
            `
          )
 } else {
          $("#user").html(
              `<button class="btn btn-primary my-2 my-sm-2" onclick="logout()" type="submit">Logout <span class="glyphicon glyphicon-log-out"></span></span></button>
           `
          )
      }  


    $.get('/shopping/vendor', (data) => {
      $('#vendorList').empty()

      //data.sort((a, b) => a.priority - b.priority)

      for (let ven of data) {
        $('#vendorList').append(
          ` <div class="col-sm-3 well" style="margin-left:2em; margin-right:3em;">
          <table class="hover">
          <tr>
          <td>
          Vendor Name:
          </td>
          <td>
         <b> ${ven.name} </b>
          </td>
          </tr>
          <tr>
          <td>
          Vendor email:
          </td>
          <td>
         <b> ${ven.email} </b>
          </td>
          </tr>
          <tr>
          <td>
          <button  id="delVendor" onclick="deleteVendor(${ven.id})"><span class="glyphicon glyphicon-remove"></span>remove</button>
          </td>
          </td>
          </table>
          </div>
          `
        )
      }
    })
}
//#endregion

//#region Add Vendor
refreshList()
function addVendor() {
  // console.log($('#vendoremail').val())
  // $('#addVendor').click(() => {
  if (IsEmail($('#vendoremail').val()) == false) {
  
    alert("invalid login id")
  }
  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    }
    else {
      // console.log($('#vendorname').val())
      // console.log($('#vendoremail').val())
      $.post(
        '/Vendor/addVendor',
        {
          name: $('#vendorname').val(),
          email: $('#vendoremail').val()              
        },
        (data) => {
          if (data.success) {
            $('#vendorname').val(''),
            $('#vendoremail').val('') 
            refreshList()
          } else {
            alert('Some error occurred')
          }
        }
      )
      return true;
    }
  }
       
       
  // })
}
//#endregion
 
//#region  Delete Vendor
refreshList()
function deleteVendor(id)
{ 
   $.ajax({
    url: `/shopping/${id}`,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(data) {
      console.log("success")
      refreshList()
    },
    error: function(request,msg,error) {
        console.log("failed")
       }
   });
   refreshList()
}
//#endregion

//#region change Url
$('#vendor').click(()=>{
  windows.location.replace("/Products/product.html")
}) 
//#endregion

   
