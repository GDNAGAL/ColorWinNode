$(document).ready(function() {
const swalB = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success shadow-none",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  let betData = ` <div data-v-3299f162="" class="Betting__C-mark" id="countWrapper" style="display: none;">
                    <div id="SDa" data-v-3299f162="">0</div>
                    <div id="SDb" data-v-3299f162="">0</div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-head">
                      <div data-v-3299f162="" class="Betting__C-head-g" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Green</div>
                      <div data-v-3299f162="" class="Betting__C-head-p">Violet</div>
                      <div data-v-3299f162="" class="Betting__C-head-r">Red</div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-numC">
                    <div data-v-3299f162="" class="Betting__C-numC-item0"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item1"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item2"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item3"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item4"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item5"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item6"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item7"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item8"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item9"></div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-foot">
                    <div data-v-3299f162="" class="Betting__C-foot-b">Big</div>
                    <div data-v-3299f162="" class="Betting__C-foot-s bg-primary">Small</div>
                  </div>`;



  var xTimer;
  setGame(1)









function start_count_down(min, close){
  let date = new Date();
  let zdate = date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata"
 });
  var countDownDate = Date.parse(zdate) / 1e3;
  var now = new Date().getTime();
  var distance = min - countDownDate % min;
  //alert(distance);
  var i = distance / 60,
   n = distance % 60,
   o = n / 10,
   s = n % 10;
  var minutes = Math.floor(i);
  var seconds = ('0'+Math.floor(n)).slice(-2);
  document.getElementById("demo").innerHTML = 
  `<div data-v-9f2c21eb="">0${Math.floor(minutes)}</div>
                   <div data-v-9f2c21eb="">:</div>
                   <div data-v-9f2c21eb="">${seconds}</div>`;
  // document.getElementById("counter").value = distance;

  if (distance <= close) {
    $("#countWrapper").show()
    if(distance.toString().length==1){
      $("#SDa").html(0)
      $("#SDb").html(distance)
    }else{
      $("#SDa").html(distance.toString().charAt(0))
      $("#SDb").html(distance.toString().charAt(distance.toString().length - 1))
    }
  }else{
    $("#countWrapper").hide()
  }
}
$('.gt').on('click',function(){
  $('.gt').removeClass('active')
  $(this).addClass('active')
  $("#betDatacnt").append(`<div data-v-3299f162="" class="Betting__C-mark"></div>`)
  $("#btype").html($(this).find("#gbType").text())
  var selectedType = $(this).attr("t")
  var closeBetTime = $(this).attr("ct")
  setGame(selectedType, closeBetTime)
  
})

function setGame(time, ctime){
  clearInterval(xTimer)
  $("#betDatacnt").html(betData)
  xTimer = setInterval(function() { 
    start_count_down(60 * time, ctime);
    }, 1e3);
}


  $("#loginForm").on("submit",function(e){
    e.preventDefault()
    $('.load').removeClass('d-none')
    // $("#modal").modal('show')
    
    let fd = new FormData(this);
    if ($('#KeepMeLogin').is(":checked")){

    }
    let data = {};
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

})