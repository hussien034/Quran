var home = document.getElementById("home");
var but = document.getElementById("but");
var all = document.getElementById("all");
var first=document.getElementById("first");
var searchInput = document.getElementById("search");
var httpRequest1 = new XMLHttpRequest();
var allSyrah = [];
httpRequest1.open("Get", "https://api.alquran.cloud/v1/surah");
httpRequest1.send();
httpRequest1.addEventListener("readystatechange", function () {
  if (httpRequest1.readyState == 4 && httpRequest1.status == 200) {
    allSyrah = JSON.parse(httpRequest1.response);
    display1();
    console.log(allSyrah.data);
  }
});
function display1() {
  var cartona = "";
  for (var i = 0; i < 114; i++) {
    cartona += `
        <div class="col-md-4">
        <a class="btn-1" onclick="indexOut(${i})">
        <div class="div-desc d-flex justify-content-between"> 
       <div class="desc-2">
       <p class="number">${allSyrah.data[i].number}</p>
       </div>
       <div class="desc-1">
        <p class="surah">${allSyrah.data[i].name}</p>
       <p class="ayahs">${allSyrah.data[i].numberOfAyahs} Ayahs</p>
       </div>
        </div>
        </a>
        </div>
        `;
  }
  document.getElementById("rows").innerHTML = cartona;
}
var sursh = [];
function indexOut(i) {
  var httpRequest2 = new XMLHttpRequest();
  httpRequest2.open(
    "Get",
    `https://api.alquran.cloud/v1/surah/${i + 1}/ar.alafasy`
  );
  httpRequest2.send();
  httpRequest2.addEventListener("readystatechange", function () {
    if (httpRequest2.readyState == 4 && httpRequest2.status == 200) {
      sursh = JSON.parse(httpRequest2.response).data.ayahs;
      display2();
      home.style.display = "none";
      but.style.display = "block";
      all.style.cssText = "height:100vh !important;";
      all.style.cssText =
        "background-image:linear-gradient( rgba(0,0,0,.6), rgba(0,0,0,.3) ),url(/images/bg4.png);";
    }
  });
}
function display2() {
  var cartona = "";
  for (var i = 0; i < sursh.length; i++) {
    cartona += ` 
      <div class="col-md-6">
      <div class="ayahst d-flex justify-content-between">
      <p class="borderN w-75">${sursh[i].numberInSurah}</p>
      <p>${sursh[i].text}</p>
      </div>
      </div>
      <div class="col-md-6">
      <div class="aud mt-1 mb-1">
      <audio controls src="${sursh[i].audio}"></audio>
      </div>
     </div>
      `;
  }
  document.getElementById("rows").innerHTML = cartona;
}
//search function-----------------------------------------------------------
searchInput.onkeyup = function () {
  var cartona = "";
  var val = searchInput.value;
  for (var i = 0; i < 114; i++) {
    if (allSyrah.data[i].name.toLowerCase().includes(val)) {
      cartona += `
          <div class="col-md-4">
          <a class="btn-1" onclick="indexOut(${i})">
          <div class="div-desc d-flex justify-content-between"> 
         <div class="desc-2">
         <p class="number">${allSyrah.data[i].number}</p>
         </div>
         <div class="desc-1">
          <p class="surah">${allSyrah.data[i].name}</p>
         <p class="ayahs">${allSyrah.data[i].numberOfAyahs} Ayahs</p>
         </div>
          </div>
          </a>
          </div>
          `;
    }
    document.getElementById("rows").innerHTML = cartona;
  }
};
$(document).ready(function()
{
    $("#first").fadeOut(5000,function(){
        $("body").css("overflow","auto")
    })
})
