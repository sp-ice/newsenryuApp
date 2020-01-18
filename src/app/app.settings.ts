import { environment } from "@app/environment";

export class AppSettings {
    //DEBUG
    public static FLG_DEBUG = false;//###ローカル開発用
    public static FLG_PROD = environment.production;

    //URL
    public static HOST= (AppSettings.FLG_DEBUG) ? "http://localhost:8100" : "http://newsenryu.spicy-space.xyz"
                        + (AppSettings.FLG_PROD) ? "" : ":7080";
    public static API_ENDPOINT_UNLOGINED=AppSettings.HOST+"/api/";
    public static API_ENDPOINT_LOGINED=AppSettings.HOST+"/apis/";
    public static AUTH_ENDPOINT_TWITTER=AppSettings.HOST+"/auth/twitter";
    public static getApiEndPoint(){
        if (AppSettings.FLG_DEBUG) {
            //ローカルでは認証通せないので、常に非ログイン時のURLを返す
            return AppSettings.API_ENDPOINT_UNLOGINED;
        }
        if (AppSettings.flg_login) {
            return AppSettings.API_ENDPOINT_LOGINED;
        } else {
            return AppSettings.API_ENDPOINT_UNLOGINED;
        }
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
}