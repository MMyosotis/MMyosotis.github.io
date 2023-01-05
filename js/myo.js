


function card_info() {
    fetch("https://api.vvhan.com/api/visitor.info").then((n => n.json())).then((n => {
        let t = n.time.substring(11, 13);
        if(document.getElementById("author-info__hello")) {
          document.getElementById("author-info__hello").innerHTML = `${t < 5 ? "夜晚好" : t < 11 ? "早上好" : t < 14 ? "中午好" : t < 19 ? "下午好" : "晚上好"} , 我是`
        }
    })).catch((function (n) { console.log(n) }))
} 
card_info();


function hideTodayCard() {
    if (document.getElementById("faceCard")) {
      document.getElementById("faceCard").classList.add('hide');
    }
}


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
        text = `晚安`;
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




// 标签页面
  //分类条
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
      if (document.querySelector('#tag-page-tags')){
        $('a').removeClass('select')
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  }
  tagPageActive(); 

  //分类条
  function categoriesBarActive() {
    if (document.querySelector('#category-bar')){
      $(".category-bar-item").removeClass("select")
    }
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    // console.log(urlinfo);
    //判断是否是首页
    if (urlinfo == '/'){
      if (document.querySelector('#category-bar')){
        document.getElementById('category-bar-home').classList.add("select");
      }
    }else {
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
        var nowCategorie2 = nowCategorie.replaceAll("-"," ");

        if (document.querySelector('#category-bar')){
          document.getElementById(nowCategorie2).classList.add("select");
        }
      }
    }
  }
  categoriesBarActive();





// // Sroll Auto Hide
// function registerScrollFnEvent() {

//     if (document.querySelector('.mysidebar-bar')){
//       var sidetools = document.querySelector('.mysidebar-bar');
//       const innerHeight = window.innerHeight + 150;
//       // scroll < 270 scrollHeight
//     if (document.body.scrollHeight <= innerHeight) {
//       sidetools.classList.remove('show');
//     }

//     Fluid.utils.listenScroll(function() {
//       const currentTop = window.scrollY || document.documentElement.scrollTop;
//       var board = jQuery('main');
//       var maxHeight = parseInt(board.css('height'), 10) - 400;
//       if (currentTop > 150 && currentTop < maxHeight) {
//         sidetools.classList.add('show');
//       } 
//       else {
//         sidetools.classList.remove('show');
//       }
//       if (document.body.scrollHeight <= innerHeight) {
//         sidetools.classList.remove('show');
//       }
//     });
//     }
// }
// registerScrollFnEvent();


// function registerToggleShowToolsListEvent() {

//     if (document.querySelector('.tool-toggle-show')){
//         document.querySelector('.tool-toggle-show').addEventListener('click', () => {
//             document.querySelector('.mytoolbox').classList.toggle('show');
//         });
//     }
// }
// registerToggleShowToolsListEvent();



//首页大卡片恢复显示
$(".topGroup").hover(function () {
    // console.log("卡片悬浮");
  }, function () {
    document.getElementById("faceCard").classList.remove('hide');
    document.getElementById('faceCard').style.zIndex = 1;
    // console.log("卡片停止悬浮");
});











// pjax_init();
// //初始化pjax
// function pjax_init(){
//   document.addEventListener('pjax:send', function () {
//     NProgress.start();
//   });
//   document.addEventListener('pjax:complete', function () {
//     NProgress.done();
//   });
//   document.addEventListener('pjax:error', function () {
//   });
//   document.addEventListener('pjax:success', function () {
//     //需要重建的js 从next主题复制来的 
//     document.querySelectorAll('script[pjax], #pjax script').forEach(element => {
// 	    var code = element.text || element.textContent || element.innerHTML || '';
// 	    var parent = element.parentNode;
// 	    parent.removeChild(element);
// 	    var script = document.createElement('script');
// 	    if (element.id) {
// 	      script.id = element.id;
// 	    }
// 	    if (element.className) {
// 	      script.className = element.className;
// 	    }
// 	    if (element.type) {
// 	      script.type = element.type;
// 	    }
// 	    if (element.src) {
// 	      script.src = element.src;
// 	      // Force synchronous loading of peripheral JS.
// 	      script.async = false;
// 	    }
// 	    if (element.getAttribute('pjax') !== null) {
// 	      script.setAttribute('pjax', '');
// 	    }
// 	    if (code !== '') {
// 	      script.appendChild(document.createTextNode(code));
// 	    }
// 	    parent.appendChild(script);
// 	  });
//   });
// 	document.addEventListener('DOMContentLoaded', function() {
//     var pjax = new Pjax({
//     elements: 'a[href]:not([href^="#"]):not([href="javascript:void(0)"])',
//     selectors: ["#pjax-container","#pageName"],
//     //三个分别是容器 标题 头图
// 		debug: true
// 	});
// });
// }
// var init1=false;//js标记防止重复加载以此类推





// 页面百分比
percent();
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
    result = Math.round(a / b * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取按钮
  //滚动条高度+视窗高度 = 可见区域底部高度
  var visibleBottom = window.scrollY + document.documentElement.clientHeight;
  // 获取位置监测容器，此处采用评论区
  var eventlistner =  document.getElementById('footer');
  var centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);


    if (result >= 0) {
      btn.innerHTML = result;
    }
  window.onscroll = percent;
  
}


