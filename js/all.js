var list = document.querySelector('.area-list');
var area = document.getElementById('select-area');
var button = document.querySelector('.button-warp');
var page = document.getElementById('page-navigation');
var data = []; //存放陣列資料
var DataZone = []; //存放地區資料
var NowData = [];
var topbutton = document.getElementById('top');
var NowPage = 1;
var select = ''; //選擇的區域
var navigationNum = '';//頁數總數
var navigationStr = '';


page.addEventListener('click', pageClick, false);

//滾輪
topbutton.addEventListener('click', topFunction, false)
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    topbutton.style.display = "block";
  } else {
    topbutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

}


//banner圖片
document.querySelector('.banner').style.height = window.innerHeight / 5 * 4 + 'px'
window.onresize = function () {
  document.querySelector('.banner').style.height = window.innerHeight / 5 * 4 + 'px'
}

//載入JSON檔案
var xhr = new XMLHttpRequest();
var url = 'js/datastore_search.json';
xhr.open('get', url, true);
xhr.send(null);
xhr.onload = function () {
  var str = JSON.parse(xhr.responseText);
  data = str.result.records;
  viewData();
}

function viewData() {
  var len = data.length;
  for (var i = 0; i < len; i++) {
    DataZone.push(data[i].Zone);
  }
  var result = DataZone.filter(function (element, index, arr) {
    return arr.indexOf(element) === index;
  });
  var str = '';
  for (var i = 0; i < result.length; i++) {
    str += '<option value="' + result[i] + '">' + result[i] + '</option>';
  }
  area.innerHTML = '<option value="0">--請選擇行政區--</option> ' + str;


  area.addEventListener('change', changearea, false);
  button.addEventListener('click', populorarea, false)
}

//熱門行政區 
function populorarea(e) {
  var name = e.target.nodeName
  if (name !== 'INPUT') {
    return
  }
  changearea(e)
}

//更新list資料
function changearea(e) {
  select = e.target.value;
  var str = '';
  NowData = [];
  navigationStr = '';
  //如果沒有選擇地區，會出現的內容
  if (select == '' || select == '0') {
    list.innerHTML = '<div class="area-title">未選擇地區</div><ul class="data-list">請選擇地區</ul>';
    page.classList.add('disappear');
    return;
  }

  for (var i = 0; i < data.length; i++) {
    if (select == data[i].Zone) {
      NowData.push(data[i]);
    }
  }
  //頁數
  navigationNum = Math.ceil(NowData.length / 8);
  NowPage = 1;
  if (navigationNum > 0) {
    page.classList.remove('disappear');
    for (var i = 1; i < navigationNum + 1; i++) {
      navigationStr += '<li class="page-item"><a id="' + i + '" data-page="' + i + '">' + i + '</a></li>';
    }
  } else {
    page.classList.add('disappear');
  }
  console.log(NowData)

  //第一頁的內容
  if (navigationNum > 1) {
    for (var i = 0; i < 8; i++) {
      str += '<li class="datd-frame" data-num="' + i + '"> <div class="data-top" style="background-image: url(' + NowData[i].Picture1 + ')"> <div class="data-name">' + NowData[i].Name + '</div> <div class="data-zone">' + NowData[i].Zone + '</div> </div> <ul class="data-bottom"> <li class="data-opentime">' + NowData[i].Opentime + '</li> <li class="data-add">' + NowData[i].Add + '</li> <li class="data-tel">' + NowData[i].Tel + '</li> <li class="data-ticketinof">' + NowData[i].Ticketinfo + '</li> </ul></li>';
    }
  } else {
    for (var i = 0; i < NowData.length; i++) {
      str += '<li class="datd-frame" data-num="' + i + '"> <div class="data-top" style="background-image: url(' + NowData[i].Picture1 + ')"> <div class="data-name">' + NowData[i].Name + '</div> <div class="data-zone">' + NowData[i].Zone + '</div> </div> <ul class="data-bottom"> <li class="data-opentime">' + NowData[i].Opentime + '</li> <li class="data-add">' + NowData[i].Add + '</li> <li class="data-tel">' + NowData[i].Tel + '</li> <li class="data-ticketinof">' + NowData[i].Ticketinfo + '</li> </ul></li>';
    }
  }


  //如果沒有資料,顯示的內容
  if (str == '') {
    str = '目前暫無資料';
  }

  listStr(select, str);
  pageStr(NowPage, navigationStr);
  pageClick(e);
}


//換頁更改內容
function pageClick(e) {
  if (e.target.nodeName !== 'A') { return };
  var num = e.target.dataset.num; //選取到的數值
  if (num == '-1') {
    NowPage = NowPage - 1;
    if (NowPage < 1) { NowPage = 1 };
  } else if (num == '+1') {
    NowPage = NowPage + 1;
    if (NowPage > navigationNum) { NowPage = navigationNum };
  } else {
    NowPage = e.target.dataset.page;
  }

  var page = (NowPage - 1) * 8;
  var str = '';

  pageStr(NowPage, navigationStr);

  for (var i = 0; i < 8; i++) {
    if ((page + i) < NowData.length) {
      str += '<li class="datd-frame" data-num="' + page + i + '"> <div class="data-top" style="background-image: url(' + NowData[page + i].Picture1 + ')"> <div class="data-name">' + NowData[page + i].Name + '</div> <div class="data-zone">' + NowData[page + i].Zone + '</div> </div> <ul class="data-bottom"> <li class="data-opentime">' + NowData[page + i].Opentime + '</li> <li class="data-add">' + NowData[page + i].Add + '</li> <li class="data-tel">' + NowData[page + i].Tel + '</li> <li class="data-ticketinof">' + NowData[page + i].Ticketinfo + '</li> </ul></li>';
    } else {
      return
    }
    listStr(select, str);
  }
}


function listStr(select, str) {
  list.innerHTML = '<div class="area-title">' + select + '</div><ul class="data-list">' + str + '</ul>';
}

function pageStr(NowPage, navigationStr) {
  var prev = '';
  var next = '';
  if (NowPage == 1) {
    prev = 'page-disabled';
  } else { prev == ''; }
  if (NowPage == navigationNum) {
    next = 'page-disabled';
  } else { prev == '' };
  if (navigationNum == 1) {
    prev = 'page-disabled';
    next = 'page-disabled';
  }

  page.innerHTML = '<ul><li id="prev" class="page-link ' + prev + '" ><a data-num="-1">< prev</a></li>' + navigationStr + ' <li id="next" class="page-link ' + next + '"><a data-num="+1">next ></a></li></ul>';
  ActPage()
}

function ActPage() {
  var liPage = document.querySelectorAll('.page-item a')
  document.getElementById('1').classList.add('page-active');
  for (var i = 0; i < navigationNum; i++) {
    if (liPage[i].dataset.page == NowPage) {
      document.getElementById('1').classList.remove('page-active');
      var itempage = liPage[i].dataset.page;
      document.getElementById(itempage).classList.add('page-active');

    }
  }
}






