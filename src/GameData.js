var gNotification = cc.NotificationCenter.getInstance();
var gSpriteFrameCache = cc.SpriteFrameCache.getInstance();

var gSharedEngine = cc.AudioEngine.getInstance();

var MUSIC_BACKGROUND  = "audio/background_music.mp3";
var EFFECT_BUTTON_CHICK  = "audio/effect_buttonClick.ogg";
var EFFECT_GAME_FAIL  = "audio/effect_game_fail.ogg";
var EFFECT_GAME_WIN  = "audio/effect_game_pass.ogg";
var EFFECT_PATTERN_UN_SWAP  = "audio/effect_unswap.ogg";
var EFFECT_PATTERN_CLEAR  = "audio/effect_clearPattern.ogg";
var EFFECT_PATTERN_BOMB  = "audio/effect_bombPattern.ogg";
var EFFECT_TIME_WARN  = "audio/effect_timewarning.ogg";

var background_music = MUSIC_BACKGROUND;
var battery_fire_audio = EFFECT_PATTERN_BOMB;
var fire_candle_audio = EFFECT_PATTERN_CLEAR;
var fix_candle_audio = EFFECT_PATTERN_UN_SWAP;
var time_warn = EFFECT_TIME_WARN;
var game_win_audio = EFFECT_GAME_WIN;
var game_over_audio = EFFECT_GAME_FAIL;
var button_click_audio = EFFECT_BUTTON_CHICK;
var happy_birthday_audio = "audio/happy_birthday.mp3";

var start_nor_btn = "res/btn/start_nor.png";
var start_down_btn = "res/btn/start_down.png";
var restart_nor_btn = "res/btn/restart_nor.png";
var restart_down_btn = "res/btn/restart_down.png";

var logo_img = "res/logo.png";
var morning_img = "res/morning.jpg";
var afternoon_img = "res/afternoon.jpg";
var night_img = "res/night.jpg";
var bg_img = morning_img;
var instruction_img = "res/instruction.png";

var game_over_img = "res/game_over.png";

var candle_img= "res/candle.png";
var candle2_img= "res/candle2.png";
var candle3_img= "res/candle3.png";
var candle4_img= "res/candle4.png";
var fire_img = "res/fire_bomb.png";
var battery_img = "res/battery.png";
var plate_img = "res/plate.png";
var cake_img = "res/cake.png";

var g_ressources = [
    {src:logo_img},
    {src:instruction_img},
    {src:morning_img},
    {src:afternoon_img},
    {src:night_img},
    {src:game_over_img},
    {src:start_nor_btn},
    {src:start_down_btn},
    {src:restart_nor_btn},
    {src:restart_down_btn},

    {src:candle_img},
    {src:candle2_img},
    {src:candle3_img},
    {src:candle4_img},
    {src:fire_img},
    {src:battery_img},
    {src:plate_img},
    {src:cake_img},

    {src:background_music},
    {src:battery_fire_audio},
    {src:fire_candle_audio},
    {src:fix_candle_audio},
    {src:time_warn},
    {src:game_win_audio},
    {src:game_over_audio},
    {src:happy_birthday_audio},

];