var isAndroid = kendo.support.mobileOS.android;


var apiSite = (useLocalAPIs)?'http://localhost:5000':'https://charder.herokuapp.com/';

var measurementSource = new kendo.data.DataSource({
  transport: {
    read: function (data) { 取得量測記錄(measurementSource); }
  },
  sort: {
    field: "量測記錄時間",
    dir: "desc"
  },
  requestStart: function () {
    kendo.ui.progress($("#loading"), true);
  },
  requestEnd: function () {
    kendo.ui.progress($("#loading"), false);
  },

  schema: {
    total: function () {
      console.log("measurementSource scheme total");
      //取得經緯度();    
      return 77;
    }
  },
  serverPaging: true,
  pageSize: 40,
  //group: { field: "section" }
})

function 取得量測記錄(data) {
  console.log("getting CourseHistory");
  
  var 所有量測數據 = [
    {
      "ReportId": "00000001",
      "量測記錄時間": "量測時間: 2020-01-25 13:56",              
      "綜合評價": "綜合評價: 74.5",
      "量測紀錄圖片": "MA801半身T.png",              
    },
    {
      "ReportId": "00000002",
      "量測記錄時間": "量測時間: 2020-02-23 14:32",              
      "綜合評價": "綜合評價: 78.5",
      "量測紀錄圖片": "MA801半身T.png",              
    }      
  ];

  var dataTemp=[];
  for (var i=0; i<所有量測數據.length; i++ ) {
    var 卡片 = {
      "量測記錄時間": 所有量測數據[i].量測記錄時間,              
      "綜合評價":    所有量測數據[i].綜合評價,
      "量測紀錄圖片": 所有量測數據[i].量測紀錄圖片,              
      "url": "2-views/量測報告.html?reportId="+所有量測數據[i].ReportId,
      "section": "A"             
    };
    dataTemp.push(卡片); 
  }

  data.success(dataTemp);

  if (dataTemp.length==0) {
    $("#量測記錄title").text("尚無量測記錄");
  }else {
    $("#量測記錄title").text("量測記錄");
  }  
  
  return;
}

function nullForNow(e) {
  console.log("nullForNow");
  //currentExample = nullForNow;
}

function removeView(e) {
  //console.log("removeView", e);  
  //if (reloadCourseNeeded) {
  //  readCourses(); 
  //  reloadCourseNeeded = false;
  //}
  if (!e.view.element.data("persist")) {
    //console.log(e);
    
    // KPC: 找不到 persist 如何設定，只好用粗暴的做法
    if (e.view.id != "#forms") e.view.purge();
    
    //e.view.purge();
  }

}

//function initSearch(e) {
//  console.log("initSearch");
//  var searchBox = e.view.element.find("#demos-search");
//
//  searchBox.on("input", function () {
//    searchForCourse(searchBox.val()); //, product);
//  });
//
//  searchBox.on("blur", function () {
//    //        if (searchBox.val() == "") {
//    //            hideSearch();
//    //        }
//    searchBox.val("");
//    searchForCourse("");
//    hideSearch();
//  });
//}

var desktop = !kendo.support.mobileOS;

window.app = new kendo.mobile.Application($(document.body), {
  layout: "mainDiv",
  transition: "slide",
  skin: "nova",
  icon: {
    "": '@Url.Content("~/content/mobile/AppIcon72x72.png")',
    "72x72": '@Url.Content("~/content/mobile/AppIcon72x72.png")',
    "76x76": '@Url.Content("~/content/mobile/AppIcon76x76.png")',
    "114x114": '@Url.Content("~/content/mobile/AppIcon72x72@2x.png")',
    "120x120": '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")',
    "152x152": '@Url.Content("~/content/mobile/AppIcon76x76@2x.png")'
  }
});