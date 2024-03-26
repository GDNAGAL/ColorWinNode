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
                      <div data-v-3299f162="" class="Betting__C-head-g showBetModal" btVal="10" bclass="success">Green</div>
                      <div data-v-3299f162="" class="Betting__C-head-p showBetModal" btVal="11" bclass="primary">Violet</div>
                      <div data-v-3299f162="" class="Betting__C-head-r showBetModal" btVal="12" bclass="danger">Red</div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-numC">
                    <div data-v-3299f162="" class="Betting__C-numC-item0 showBetModal" btVal="0" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item1 showBetModal" btVal="1" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item2 showBetModal" btVal="2" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item3 showBetModal" btVal="3" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item4 showBetModal" btVal="4" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item5 showBetModal" btVal="5" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item6 showBetModal" btVal="6" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item7 showBetModal" btVal="7" bclass="success"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item8 showBetModal" btVal="8" bclass="danger"></div>
                    <div data-v-3299f162="" class="Betting__C-numC-item9 showBetModal" btVal="9" bclass="success"></div>
                  </div>
                  <div data-v-3299f162="" class="Betting__C-foot">
                    <div data-v-3299f162="" class="Betting__C-foot-b showBetModal" btVal="13" bclass="warning">Big</div>
                    <div data-v-3299f162="" class="Betting__C-foot-s bg-primary showBetModal" btVal="14" bclass="primary">Small</div>
                  </div>`;

function canvasData(bootstrapClass){
  return `<div class="offcanvas-header d-block text-center text-white bg-${bootstrapClass}" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"> 
            <h5 class="offcanvas-title mb-2" id="offcanvasBottomLabel">Win Go</h5>
            <strong class="bg-white text-${bootstrapClass} pt-1 pb-1 p-4 rounded-pill">Select : <span id="seid"></span></strong>
          </div>
          <div class="offcanvas-body small p-0">
            <div class="p-3">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 align-middle">Balance</h5>
                <div class="d-flex">
                  <button id="amButton" class="btn btn-sm shadow-none btn-${bootstrapClass} ms-2">10</button>
                  <button id="amButton" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">100</button>
                  <button id="amButton" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">1000</button>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-4">
                <h5 class="mb-0 align-middle">Quantity</h5>
                <div class="d-flex">
                  <button id="minus" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2 ps-3 pe-3">-</button>
                  <input id="countInput" style="width: 60px;" class="shadow-none form-control ms-2 text-center border-${bootstrapClass} text-${bootstrapClass}" type="number" value="1">
                  <button id="plus" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2 ps-3 pe-3">+</button>
                </div>
              </div>
              <div class="w-100 align-items-right text-end mt-2">
                  <button id="xBnt" bval="1" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x1</button>
                  <button id="xBnt" bval="5" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x5</button>
                  <button id="xBnt" bval="10" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x10</button>
                  <button id="xBnt" bval="20" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x20</button>
                  <button id="xBnt" bval="50" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x50</button>
                  <button id="xBnt" bval="100" class="btn btn-sm shadow-none btn-outline-${bootstrapClass} ms-2">x100</button>
              </div>
              <div class="d-flex mt-3">
                <input type="checkbox" style="font-size: 20px;" class="form-check-input shadow-none" id="iAgree" checked>
                <label class="form-check-label ms-2" style="font-size: 20px;" for="iAgree">I Agree <a href="javascript:void(0)">Pre Sale Rules</a></label>
              </div>
            </div>
            <div class="d-flex">
              <button class="w-50 p-3 m-0 bg-dark text-white" style="border:none" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
              <button id="betButton" class="w-50 p-3 m-0 bg-${bootstrapClass} text-white" style="border:none">Total Amount <span id="finalAmount">00.00</span></button>
            </div>
            <form id="betForm">
              <input id="gtInput" type="hidden" name="GameTypeID">
              <input id="gidInput" type="hidden" name="CurrentPeriod">
              <input id="selectidinput" type="hidden" name="SelectID">
              <input id="amountinput" type="hidden" name="Amount">
              <input id="betqtyinput" type="hidden" name="BetQuatity">
            </form>
          </div>`;
}

//Initial Steps
var xTimer;
setGame($('.gt:eq(0)').attr('typeID'),$('.gt:eq(0)').attr('allowedTime'), $('.gt:eq(0)').attr('ct'))
//Initial Steps


function getBootStrapClass(element) {
  if (element.hasClass('btn-primary') || element.hasClass('btn-outline-primary')) {
      return "primary";
  } else if (element.hasClass('btn-success') || element.hasClass('btn-outline-success')) {
      return "success";
  } else if (element.hasClass('btn-danger') || element.hasClass('btn-outline-danger')) {
      return "danger";
  } else if (element.hasClass('btn-warning') || element.hasClass('btn-outline-warning')) {
      return "warning";
  } else if (element.hasClass('btn-info') || element.hasClass('btn-outline-info')) {
      return "info";
  } else if (element.hasClass('btn-light') || element.hasClass('btn-outline-light')) {
      return "light";
  } else if (element.hasClass('btn-dark') || element.hasClass('btn-outline-dark')) {
      return "dark";
  }
}

function setTotalAmountOnWrapper(){
  let bc = getBootStrapClass($("#amButton").eq(0));
  let btnVal = $(`[id^=amButton].btn-${bc}`).text();
  let inputVal = $("#countInput").val();
  $("#finalAmount").html((Number(btnVal)*Number(inputVal)).toFixed(2))
  $("#offcanvasBottomLabel").html(`Win Go ${$('.gt.active').find("#gbType").text()}`)
  //Form Fields
  $("#gtInput").val($('.gt.active').attr('typeID'))
  $("#gidInput").val($('#currentGameId').text())
  $("#amountinput").val(Number(btnVal))
  $("#betqtyinput").val(Number(inputVal))
}

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
  var audio = new Audio('mp3/first.mp3');
  if (distance <= close) {
    audio.play();
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
  var selectedType = $(this).attr("typeID")
  var allowedTime = $(this).attr("allowedTime")
  var closeBetTime = $(this).attr("ct")
  setGame(selectedType, allowedTime, closeBetTime)
  
})

function setGame(typeID, allowedTime,ctime){
  GetGamePeriod(typeID)
  clearInterval(xTimer)
  $("#betDatacnt").html(betData)
  xTimer = setInterval(function() { 
    start_count_down(60 * allowedTime, ctime);
    }, 1e3);
}


$(document).on('click','.showBetModal',function(){
  $this = $(this);
  $("#offcanvasBottom").html(canvasData($this.attr('bclass')));
  $("#offcanvasBottom").offcanvas('show');
  $("#seid").html($this.attr('btVal'))
  $("#selectidinput").val($this.attr('btVal'))
  setTotalAmountOnWrapper()
})

$(document).on('click','#plus',function(){
  $('#countInput').val(Number($('#countInput').val())+1)
  setTotalAmountOnWrapper()
})

$(document).on('click','#minus',function(){
  if(Number($('#countInput').val())>1){
    $('#countInput').val(Number($('#countInput').val())-1)
    setTotalAmountOnWrapper()
  }
})

$(document).on('keyup','#countInput',function(){
  setTotalAmountOnWrapper()
})

$(document).on('click','#xBnt',function(){
  $('#countInput').val(Number($(this).attr('bval')))
  setTotalAmountOnWrapper()
})

$(document).on('click','#amButton',function(){
    var elementThis = $(this);
    let bc = getBootStrapClass(elementThis);
    $('[id^=amButton]').removeClass(`btn-${bc}`);
    $('[id^=amButton]').addClass(`btn-outline-${bc}`);
    $(this).addClass(`btn-${bc}`);
    $(this).removeClass(`btn-outline-${bc}`);
    setTotalAmountOnWrapper()
})


$(document).on('click','#betButton',function(){
  $("#offcanvasBottom").offcanvas('hide');
  //submit Bet Form
  $('#betForm').submit();
})


function GetGamePeriod(typeID){
    $('.load').removeClass('d-none')
    let data = {
      "GameTypeID":typeID
    };
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      url: '/api/GetGamePeriod',
      headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer ' + getCookie('Token')
      },
      contentType: false,       
      cache: false,             
      processData:false,
      success: function(responseData){
        $('.load').addClass('d-none')
        $("#currentGameId").html(responseData.data.Period)
      },
      error : function(err){
        $('.load').addClass('d-none')   
      }
    });
}

//Handle Bet Form Submition
$(document).on('submit','#betForm',function(e){
  e.preventDefault()
  $('.load').removeClass('d-none')
  let fd = new FormData(this);
  if ($('#iAgree').is(":checked")){
    let data = {};
    for (let [key, value] of fd.entries()) {
        data[key] = value;
    }
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      url: '/api/User/GameBetting',
      headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer ' + getCookie('Token')
      },
      contentType: false,       
      cache: false,             
      processData:false,
      success: function(responseData){
          $('#betForm')[0].reset();
          $('.load').addClass('d-none')
          swalB.fire({
              icon: "success",
              text: responseData.Message
            });
          setCookie("Token", responseData.Token, 10)
      },
      error : function(err){
          $('.load').addClass('d-none')
          if(err.responseJSON && err.responseJSON.Message){
            swalB.fire({
              icon: "error",
              text: err.responseJSON.Message
            });
          }else{
            swalB.fire({
              icon: "error",
              text: err.statusText
            });
          }
            
      }
    });
  }else{
    $('.load').addClass('d-none')
    swalB.fire({
      icon: "error",
      text: 'Please Accept Pre sale Rules'
    });
  }
 
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