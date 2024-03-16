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
            swalB.fire({
                icon: "success",
                text: responseData.Message
              });
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