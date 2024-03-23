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
                      <div data-v-3299f162="" class="Betting__C-head-g showBetModal" bclass="success">Green</div>
                      <div data-v-3299f162="" class="Betting__C-head-p showBetModal" bclass="primary">Violet</div>
                      <div data-v-3299f162="" class="Betting__C-head-r showBetModal" bclass="danger">Red</div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-numC">
                    <div data-v-3299f162="" class="Betting__C-numC-item0 showBetModal" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item1 showBetModal" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item2 showBetModal" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item3 showBetModal" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item4 showBetModal" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item5 showBetModal" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item6 showBetModal" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item7 showBetModal" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item8 showBetModal" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item9 showBetModal" bclass="success"></div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-foot">
                    <div data-v-3299f162="" class="Betting__C-foot-b showBetModal" bclass="warning">Big</div>
                    <div data-v-3299f162="" class="Betting__C-foot-s bg-primary showBetModal" bclass="primary">Small</div>
                  </div>`;

function canvasData(bootstrapClass){
  return `<div class="offcanvas-header d-block text-center text-white bg-${bootstrapClass}" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"> 
            <h5 class="offcanvas-title mb-2" id="offcanvasBottomLabel">Win Go 1 Min</h5>
            <strong class="bg-white text-${bootstrapClass} pt-1 pb-1 p-4 rounded-pill">Select : <span>Small</span></strong>
          </div>
          <div class="offcanvas-body small p-0">
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 align-middle">Balance</h5>
                <div class="d-flex">
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">10</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">100</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">1000</button>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-4">
                <h5 class="mb-0 align-middle">Quantity</h5>
                <div class="d-flex">
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2 ps-3 pe-3">-</button>
                  <input style="width: 50px;" class="shadow-none form-control ms-2 text-center" type="number" value="1">
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2 ps-3 pe-3">+</button>
                </div>
              </div>
              <div class="w-100 align-items-right text-end mt-2">
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x1</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x5</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x10</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x20</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x50</button>
                  <button class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x100</button>
              </div>
              <div class="d-flex mt-3">
                <input type="checkbox" style="font-size: 20px;" class="form-check-input shadow-none" id="iAgree" checked>
                <label class="form-check-label ms-2" style="font-size: 20px;" for="iAgree">I Agree <a href="javascript:void(0)">Pre Sale Rules</a></label>
              </div>
            </div>
            <div class="d-flex">
              <button class="w-50 p-3 m-0 bg-dark text-white" style="border:none" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
              <button class="w-50 p-3 m-0 bg-${bootstrapClass} text-white" style="border:none">Total Amount 10.00</button>
            </div>
          </div>`;
}

//Initial Steps
var xTimer;
setGame($('.gt:eq(0)').attr('t'), $('.gt:eq(0)').attr('ct'))
//Initial Steps


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
    $("#offcanvasBottom").offcanvas('hide');
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


$(document).on('click','.showBetModal',function(){
  $("#offcanvasBottom").html(canvasData($(this).attr('bclass')));
  $("#offcanvasBottom").offcanvas('show');
})

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