const swalB = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success shadow-none",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

$('.gt').on('click',function(){
  $('.gt').removeClass('active')
  $(this).addClass('active')
})

  $("#loginForm").on("submit",function(e){
    e.preventDefault()
    $('.load').removeClass('d-none')
    // $("#modal").modal('show')
    
    let fd = new FormData(this);
    if ($('#KeepMeLogin').is(":checked")){

    }
    let data = {};
    // Iterate over FormData entries and populate the data object
    for (let [key, value] of fd.entries()) {
        data[key] = value;
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
            $('#loginForm')[0].reset();
            $('.load').addClass('d-none')
            swalB.fire({
                icon: "success",
                text: responseData.Message
              });
            setCookie("Token", responseData.Token, 10)
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