function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

const swalB = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success shadow-none",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });


$("#registerForm").on("submit",function(e){
    e.preventDefault()
    $('.load').removeClass('d-none')
    // $("#modal").modal('show')
    
    let fd = new FormData(this);
    if ($('#PCheckBox').is(":checked")){fd.append("AcceptPrivary",1)}else{fd.append("AcceptPrivary",0)}
    let data = {};
    // Iterate over FormData entries and populate the data object
    for (let [key, value] of fd.entries()) {
        data[key] = value;
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: '/api/User/Register',
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('#registerForm')[0].reset();
            $('.load').addClass('d-none')
            
            if(JSON.stringify(responseData).length>0){
              swalB.fire({
                icon: "success",
                text: responseData.Message,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  startLoginSession(data.Mobile, data.Password)
                }
              });
            }
        },
        error : function(err){
            $('.load').addClass('d-none')
              swalB.fire({
                icon: "error",
                text: err.responseJSON.Message
              });
        }
    });
})

//startLoginSession
function startLoginSession(username, password){
  $('.load').removeClass('d-none')
  let data = {
    Username : username,
    Password : password
  }
  $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: '/api/User/login',
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + getCookie('Token')
        },
        contentType: false,       
        cache: false,             
        processData:false,
        success: function(responseData){
            $('.load').addClass('d-none')
            if(JSON.stringify(responseData).length>0){
              setCookie("Token", responseData.Token, 10)
              location.href = '/';
            }
        },
        error : function(err){
            $('.load').addClass('d-none')
              swalB.fire({
                icon: "error",
                text: err.responseJSON.Message
              });
        }
    });
}