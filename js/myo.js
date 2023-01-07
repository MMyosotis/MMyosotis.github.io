

// 隐藏右侧推荐文章的faceCard
function hideFaceCard() {
    if (document.getElementById("faceCard")) {
      document.getElementById("faceCard").classList.add('hide');
    }
}



// 问候时间
function helloTime() {

    var getTimeState = () => {
      // 获取当前时间
      var timeNow = new Date();
      // 获取当前小时
      var hours = timeNow.getHours();
      // 设置默认文字
      var text = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 5) {
        text = `夜深了`;
      } else if (hours > 5 && hours <= 10) {
        text = `早上好`;
      } else if (hours > 10 && hours <= 14) {
        text = `中午好`;
      } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好`;
      }
      //    console.log(`hours >>>>>`, hours);
      //    console.log(`text >>>>`, text);
      // 返回当前时间段对应的状态
      return text;
    };

    if (document.querySelector('#author-info__sayhi')){
      document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
    }
}
helloTime();



// 文章页目录和分类栏切换
function switchbar() {
  var urlinfo = window.location.pathname;
  var pattern = /\/post\/.*?\//;
  var patbool = pattern.test(urlinfo);
  
  if (patbool) {
    let as=document.getElementsByClassName('content-header')[0].getElementsByTagName('a');
    let contents=document.getElementsByClassName("dom");
    for (let i=0;i<2;i++){
        let a=as[i];
        a.id=i;
        // 设置每个a标签的onclick事件
        a.onclick=function () {
            // 清楚所有标签的css设置，隐藏dom标签
            for(let j=0;j<2;j++){
                as[j].className="";
                contents[j].style.display="none";
            }
            // 设置当前标签样式及当前标签下的所有dom标签可见
            this.className='current';
            // 当前div可见
            contents[this.id].style.display='block';
        }
    }
  }
}
switchbar();



//标签条
function tagPageActive() {
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  // console.log(urlinfo);
  // 验证是否是分类链接
  var pattern = /\/tags\/.*?\//;
  var patbool = pattern.test(urlinfo);
  // console.log(patbool);
  // 获取当前的分类
  if (patbool) {
    var valuegroup = urlinfo.split("/");
    // console.log(valuegroup[2]);
    // 获取当前分类
    var nowCategorie = valuegroup[2];
    if (document.querySelector('#tag-page-tags')) {
      $('a').removeClass('select')
      document.getElementById(nowCategorie).classList.add("select");
    }
  }
}
tagPageActive(); 


//分类条
function categoriesBarActive() {
  if (document.querySelector('#category-bar')) {
    $(".category-bar-item").removeClass("select")
  }
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo);
  // console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/') {
    if (document.querySelector('#category-bar')) {
      document.getElementById('category-bar-home').classList.add("select");
    }
  } else {
    // 验证是否是分类链接
    var pattern = /\/categories\/.*?\//;
    var patbool = pattern.test(urlinfo);
    // console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      // console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      var nowCategorie2 = nowCategorie.replaceAll("-", " ");

      if (document.querySelector('#category-bar')) {
        document.getElementById(nowCategorie2).classList.add("select");
      }
    }
  }
}
categoriesBarActive();



//首页大卡片恢复显示
function homeFaceCard() {
  $(".topGroup").hover(function () {
  }, function () {
    document.getElementById("faceCard").classList.remove('hide');
    document.getElementById('faceCard').style.zIndex = 1;
  });
}
homeFaceCard();






// 获取页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
    result = Math.round(a / b * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取按钮
  //滚动条高度+视窗高度 = 可见区域底部高度
  var visibleBottom = window.scrollY + document.documentElement.clientHeight;
  // 获取位置监测容器，此处采用评论区
  var eventlistner = document.getElementById('footer');
  var centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);
  if (result >= 0) {
    btn.innerHTML = result;
  }
  window.onscroll = percent;
}
percent();





