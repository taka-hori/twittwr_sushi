
var consumerKey    = "fnmweocay8zazDC8T7yuZ6Zpw";
var consumerSecret = "v2JlmTYFt1ZEM07bGec3jQdgt6IWmfU6LZQPppdxw0nLws1Gr4";
var accessToken    = "1126762208061345798-wSmA0bmVdUTnqpt0Jm5irTC76Lqnn6";
var tokenSecret    = "MtUuSTonE8mTMKX9OP81o7c8n5Wqf5VpTaZ6KVRGfrbfF";

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
function update(data){ // 引数(data)に取得したデータが入ってくる
    ////この関数内での「data」がJSON形式のデータになってるよ！！！

  
    var result = data.statuses; // 取得したデータから、メソッドチェーンで必要なものを取得
    for( var i = 0; i < result.length; i++ ) {
         $(".Tweet表示エリア" + i).empty();
        var name = result[i]["user"]["name"]; // ツイートした人の名前
        var imgsrc = result[i]["user"]["name"]["profile_image_url"]; // ツイートした人のプロフィール画像
        var content = result[i]["text"]; // ツイートの内容
        var updated = result[i]["created_at"]; // ツイートした時間
        var time = "";

        // Tweet表示エリアに取得したデータを追加していく
        $(".Twiiter表示エリア" + i).append('<img src="'+imgsrc+'" />' + '<p>' + name + ' | ' + content + ' | ' + updated + '</p>');
    }
}

function autoGet(){ 
    // Tweet検索関数の呼び出し
    var keywords = "寿司";
    var url = "https://api.twitter.com/1.1/search/tweets.json";

    getTwitter(url, keywords);    //タイマー呼び出し
    refresh();
}
//タイマー
function refresh(){
    setTimeout(function(){autoGet()}, 20000);
}
function autoGet(){ 
    // Tweet検索関数の呼び出し
    var keywords = "寿司";
    var url = "https://api.twitter.com/1.1/search/tweets.json";

    getTwitter(url, keywords);
    timer = 20;//カウントダウンリセット
    //タイマー呼び出し
    refresh();
}


//タイマーのカウントダウン
var timer = 20; //残り秒数
function refreshtimer(){
    setTimeout(function(){countSeconds()}, 1000);
}
function countSeconds(){
    timer--;
    $(".Countdown").empty(); // 表示エリアを空にする
    $(".Countdown").append(timer + '</p>');

    refreshtimer();
}

 // ウィンドウを読み込み後に実行される
 $(window).on('load', function(){
    refreshtimer();
    autoGet();
});

