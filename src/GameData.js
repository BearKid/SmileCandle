var gNotification = cc.NotificationCenter.getInstance();
var gSpriteFrameCache = cc.SpriteFrameCache.getInstance();

var gSharedEngine = cc.AudioEngine.getInstance();

var background_music = "audio/background_music.mp3";
var battery_fire_audio = "audio/effect_fire.mp3";
var fire_candle_audio = "audio/effect_fire_candle.ogg";
var fix_candle_audio = "audio/effect_fix_candle.ogg";
var time_warning_audio = "audio/effect_time_warning.ogg";
var game_win_audio = "audio/effect_game_win.ogg";
var game_over_audio = "audio/effect_game_over.ogg";
var button_click_audio = "audio/effect_button_click.ogg";
var happy_birthday_audio = "audio/happy_birthday.mp3";

var start_nor_btn = "res/btn/start_nor.png";
var start_down_btn = "res/btn/start_down.png";
var restart_nor_btn = "res/btn/restart_nor.png";
var restart_down_btn = "res/btn/restart_down.png";

var instruction_img = "res/instruction.png";

var game_over_img = "res/game_over.png";

var logo_img = "res/logo.png";
var bg_img = "res/background.png";
var sun_img = "res/sun.png";
var moon_img = "res/moon.png";
var stars_img = "res/stars.png";
var candle_img= "res/candle.png";
var candle2_img= "res/candle2.png";
var candle3_img= "res/candle3.png";
var candle4_img= "res/candle4.png";
var fire_img = "res/fire.png";
var battery_off_img = "res/battery_off.png";
var battery_on_img = "res/battery_on.png";
var battery_img = battery_off_img;
var plate_img = "res/plate.png";
var cake_img = "res/cake.png";

var g_ressources = [
    {src:logo_img},
    {src:instruction_img},
    {src:game_over_img},
    {src:start_nor_btn},
    {src:start_down_btn},
    {src:restart_nor_btn},
    {src:restart_down_btn},

    {src:bg_img},
    {src:sun_img},
    {src:moon_img},
    {src:stars_img},
    {src:candle_img},
    {src:candle2_img},
    {src:candle3_img},
    {src:candle4_img},
    {src:fire_img},
    {src:battery_img},
    {src:battery_on_img},
    {src:battery_off_img},
    {src:plate_img},
    {src:cake_img},

    {src:background_music},
    {src:battery_fire_audio},
    {src:fire_candle_audio},
    {src:fix_candle_audio},
    {src:time_warning_audio},
    {src:game_win_audio},
    {src:game_over_audio},
	{src:button_click_audio},
    {src:happy_birthday_audio},

];
