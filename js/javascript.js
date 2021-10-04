var scrollAnimationClass = 'sa';
var scrollAnimationShowClass = 'show';
var triggerMarginDefault = -200;

var scrollAnimationElm = document.querySelectorAll('.' + scrollAnimationClass);
var scrollAnimationFunc = function () {
  var dataMargin = scrollAnimationClass + '_margin';
  var dataTrigger = scrollAnimationClass + '_trigger';
  var dataDelay = scrollAnimationClass + '_delay';
  for (var i = 0; i < scrollAnimationElm.length; i++) {
    var triggerMargin = triggerMarginDefault;
    var elm = scrollAnimationElm[i];
    var showPos = 0;
    if (elm.dataset[dataMargin] != null) {
      triggerMargin = parseInt(elm.dataset[dataMargin]);
    }
    if (elm.dataset[dataTrigger]) {
      showPos = document.querySelector(elm.dataset[dataTrigger]).getBoundingClientRect().top + triggerMargin;
    } else {
      showPos = elm.getBoundingClientRect().top + triggerMargin;
    }
    if (window.innerHeight > showPos) {
      var delay = (elm.dataset[dataDelay]) ? elm.dataset[dataDelay] : 0;
      setTimeout(function (index) {
        scrollAnimationElm[index].classList.add('show');
      }.bind(null, i), delay);
    }
  }
}
window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);


var consumerKey = "fnmweocay8zazDC8T7yuZ6Zpw";
var consumerSecret = "v2JlmTYFt1ZEM07bGec3jQdgt6IWmfU6LZQPppdxw0nLws1Gr4";
var accessToken = "1126762208061345798-wSmA0bmVdUTnqpt0Jm5irTC76Lqnn6";
var tokenSecret = "MtUuSTonE8mTMKX9OP81o7c8n5Wqf5VpTaZ6KVRGfrbfF";

var count = 10; // 表示する件数

// Twitter APIを使用してTweetを取得する部分
function getTwitter(action, keywords) {

  var accessor = {
    consumerSecret: consumerSecret,
    tokenSecret: tokenSecret
  };

  // 送信するパラメータを連想配列で作成
  var message = {
    method: "GET", // リクエストの種類
    action: action,
    parameters: {
      oauth_version: "1.0",
      oauth_signature_method: "HMAC-SHA1",
      oauth_consumer_key: consumerKey, // コンシューマーキー
      oauth_token: accessToken, // アクセストークン
      count: count, // 取得する件数
      "q": keywords, // 検索するキーワード
      "lang": "ja", // 日本語に設定
      "result_type": "recent", // 最新の情報を取得するように設定
      callback: "update" // 取得したデータをupdate関数に渡すよう設定
      //// ↑↑↑↑JSON（？）データだよ！！！！
    }
  };

  // OAuth認証関係
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var url = OAuth.addToURL(message.action, message.parameters);

  // ajaxによる通信
  $.ajax({
    type: message.method,
    url: url, // リクエスト先のURL
    dataType: "jsonp",
    jsonp: false,
    cache: true,
  });


}

// UIの更新
function update(data) { // 引数(data)に取得したデータが入ってくる
  ////検索すると実行されるよ！！！！
  ////この関数内での「data」がJSON形式のデータになってるよ！！！！
  console.log(data); //コンソールで確認できるよ！！！！


  var result = data.statuses; // 取得したデータから、メソッドチェーンで必要なものを取得
    for (var i = 0; i < result.length; i++) {
        var textLength = 0;
        var user = result[i]["user"]["screen_name"];
        var name = result[i]["user"]["name"]; // ツイートした人の名前
        var content = result[i]["text"]; // ツイートの内容
        var time = "";
        $(".Tweet" + i).empty(); // 表示エリアを空にする
        // Tweet表示エリアに取得したデータを追加していく
        $(".Tweet" + i).append('<p>' + name + '@' + user + '<br>' + content + '</p>');
        textLength = content.length;
        var selectNum = i + 1;
        var selectid = "img" + selectNum;
        var SushiImg = document.getElementById(selectid);
        if (textLength < 50) {
            SushiImg.setAttribute("src","images/SUSHI2.png");
        }
        else if(textLength < 110){
            SushiImg.setAttribute("src","images/SUSHI3.png");
        }
        else if(textLength < 150){
            SushiImg.setAttribute("src","images/SUSHI1.png");
        }
        else {
            SushiImg.setAttribute("src","images/SUSHI4.png");
        }
  }
}

function autoGet() {
  // Tweet検索関数の呼び出し
  var keywords = "寿司";
  var url = "https://api.twitter.com/1.1/search/tweets.json";

  getTwitter(url, keywords); //タイマー呼び出し
  refresh();
}
//タイマー
function refresh() {
  setTimeout(function () {
    autoGet()
  }, 20000);
}

function autoGet() {
  // Tweet検索関数の呼び出し
  var keywords = "寿司";
  var url = "https://api.twitter.com/1.1/search/tweets.json";

  getTwitter(url, keywords);
  timer = 20; //カウントダウンリセット
  //タイマー呼び出し
  refresh();
}


//タイマーのカウントダウン
var timer = 20; //残り秒数
function refreshtimer() {
  setTimeout(function () {
    countSeconds()
  }, 1000);
}

function countSeconds() {
  timer--;
  $(".Countdown").empty(); // 表示エリアを空にする
  $(".Countdown").append(timer + '</p>');

  refreshtimer();
}

// ウィンドウを読み込み後に実行される
$(window).on('load', function () {
  refreshtimer();
  autoGet();
});


$(function () {
  $(".Button").click(function () {
    $(".Sushi1").addClass("SushiActive");
    $(".Sushi2").addClass("SushiActive SushiActive2");
    $(".Sushi3").addClass("SushiActive SushiActive3");
    $(".Sushi4").addClass("SushiActive SushiActive4");
    $(".Sushi5").addClass("SushiActive SushiActive5");
    $(".Sushi6").addClass("SushiActive SushiActive6");
    $(".Sushi7").addClass("SushiActive SushiActive7");
    $(".Sushi8").addClass("SushiActive SushiActive8");
    $(".Sushi9").addClass("SushiActive SushiActive9");
    $(".Sushi10").addClass("SushiActive SushiActive10");

    $(".Balloon1").addClass("BalloonActive");
    $(".Balloon2").addClass("BalloonActive BalloonActive2");
    $(".Balloon3").addClass("BalloonActive BalloonActive3");
    $(".Balloon4").addClass("BalloonActive BalloonActive4");
    $(".Balloon5").addClass("BalloonActive BalloonActive5");
    $(".Balloon6").addClass("BalloonActive BalloonActive6");
    $(".Balloon7").addClass("BalloonActive BalloonActive7");
    $(".Balloon8").addClass("BalloonActive BalloonActive8");
    $(".Balloon9").addClass("BalloonActive BalloonActive9");
    $(".Balloon10").addClass("BalloonActive BalloonActive10");
  });
});
