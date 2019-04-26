//#region  Add New User
function AddUser() { 
  console.log($('#useremail').val())
  if (IsEmail($('#useremail').val()) == false) {
  
    alert("invalid email format")
  }
  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    }
    else {
      $.post(
        '/Users/adduser',
        {
          name: $('#name').val(),
          email: $('#useremail').val()
        },
        (data) => {
          if (data.success) {
            alert("User successfully created...")
            $('#name').val(''),
           $('#useremail').val('')
          } else {
            alert('Enter valid email')
          }
        }
      );
    }
  }
}
//#endregion

//#region Login
function login() { 
  console.log($('#email').val())
  $.post('/login',
    {
      email:$('#email').val()
    },
    (data) => {
      if (data.length == 0 || $('#email').val()==='') {
        alert(' Enter a valid email')
      }
      else  {
        console.log("Login Page")
        sessionStorage.setItem("userid",data.id)
        sessionStorage.setItem("email", $('#email').val())
        url = `/index.html`
        window.location.replace(url)
      }
    })
}
//#endregion

//#region log out
function logout() { 
  sessionStorage.clear()
  window.location.replace("/index.html")
}
//#endregion