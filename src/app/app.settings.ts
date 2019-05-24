export class AppSettings {
    //URL
    public static HOST="http://localhost:8100";//###
    // public static HOST="http://newsenryu.spicy-space.xyz";
    public static API_ENDPOINT_UNLOGINED=AppSettings.HOST+"/api/";
    public static API_ENDPOINT_LOGINED=AppSettings.HOST+"/apis/";
    public static AUTH_ENDPOINT_TWITTER=AppSettings.HOST+"/auth/twitter";
    public static getApiEndPoint(){
        // if (AppSettings.flg_login) {
        //     return AppSettings.API_ENDPOINT_LOGINED;
        // } else {
        //     return AppSettings.API_ENDPOINT_UNLOGINED;
        // }
        return AppSettings.API_ENDPOINT_UNLOGINED;
    }

    //LOGIN
    private static flg_login=false;
    public static isLogin(){
        return AppSettings.flg_login;
    }
    public static setLogin(_flg_login){
        AppSettings.flg_login = _flg_login;
    }

    //川柳取得モード
    public static MODE_GET_SENRYU_NORMAL=0;
    public static MODE_GET_SENRYU_MINE=1;//自分が投稿した川柳
    public static MODE_GET_SENRYU_LIKED=2;//自分がいいねした川柳

    //firebase
    public static FIREBASE_CONFIG = {
        apiKey: "AIzaSyBD2oEkV_xAIKWoJZP-UZtIlWX9HODxxRU",
        authDomain: "newsenryu.firebaseapp.com",
        databaseURL: "https://newsenryu.firebaseio.com",
        projectId: "newsenryu",
        storageBucket: "newsenryu.appspot.com",
        messagingSenderId: "949758136787"
    };
}