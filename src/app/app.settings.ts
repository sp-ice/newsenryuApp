export class AppSettings {
    //URL
    public static API_ENDPOINT='http://localhost:8100/api/';
    //public static API_ENDPOINT='http://133.130.91.251/api/';

    //川柳取得モード
    public static MODE_GET_SENRYU_NORMAL=0;
    public static MODE_GET_SENRYU_MINE=1;//自分が投稿した川柳
    public static MODE_GET_SENRYU_LIKED=2;//自分がいいねした川柳
}