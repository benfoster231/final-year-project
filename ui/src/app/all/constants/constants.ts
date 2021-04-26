import { environment } from '../../../environments/environment';
import { MapMarker } from '../services/manage-map.service';

//To run jquery
declare var $: any;

export class ROUTS {

    public static INDEX_PAGE: string = '';
    public static HOME_PAGE: string = 'home';
    public static EXERCISE_FIGURES_PAGE: string = 'exercise-figures';
    public static EXERCISE_CALORIE_CALCULATOR_PAGE: string = 'exercise-calorie-calculator';
    public static EXERCISE_MACRO_CALCULATOR_PAGE: string = 'exercise-macro-calculator';
    public static EXERCISE_ONE_REP_MAX_TOOL_PAGE: string = 'exercise-one-rep-max-tool';
    public static LIST_PAGE: string = 'list'; 
    public static STRECHES_PAGE: string = '';
    public static GYM_DETAIL: string = 'gym/detail/';
    public static LOGIN: string = 'login';
    public static SIGNUP: string = 'signup';
    public static CALCULATION_HISTORY: string = 'calculation-history';
    public static ELITE_MUSCLES: string = 'elite-muscles';
}

export class URL {

    public static HOME: string = environment.serverUrl + '';
    public static GYM_LIST: string = environment.serverUrl + 'gym/list';
    public static GYM_DETAILS_ON_MAP: string =  environment.serverUrl +'gym/map/details';
    public static readonly GET_IMAGE: string = environment.serverUrl + 'gym/files/getImage?name=';
    public static readonly GYM_DETAIL: string = environment.serverUrl + 'gym/detail';
    public static readonly LOGIN: string = environment.serverUrl + 'api/auth/login';
    public static readonly SIGNUP: string = environment.serverUrl + 'api/public/signup';
    public static readonly CHECK_LOGIN: string = environment.serverUrl + 'api/user/checkLogin';
    public static readonly LOGOUT: string = environment.serverUrl + 'api/user/checkLogin';
    public static readonly CALCULATION_HISTORY: string = environment.serverUrl + 'api/user/calculation-history';
    public static readonly GET_HISTORY: string = environment.serverUrl + 'api/user/get-history';
}

export class CONSTANTS {
    public static readonly ITEMS_PER_PAGE = 10;
    public static readonly CURRENT_PAGE = 1;
    public static readonly LATITUDE:string = "45.4650203";
    public static readonly LONGITUDE:string = '9.189982';
    public static LONG: string = 'long';
    public static LAT: string = 'lat';
    public static FRONTEND_URL:string = 'http://localhost:4200/#';
    public static readonly AUSTRALIA_MAP_LAT_LNG: MapMarker = {
        'lat' : -23.69804199999999,
        'lng' : 133.8807471,
        'infoText' : '',
        'extraData': '',
        'icon': '',
        'centerLat':-23.69804199999999,
        'centerLog':133.8807471
    };
    public static readonly TYPE_URL = 'type_url';
    public static readonly ACCESS_TOKEN_COOKIE = 't';
    public static readonly ACCESS_TOKEN_COOKIE_TYPE = 'tb';
    public static readonly ERROR_CODE_401 = 401;
}

export class MESSAGES {

    public static SINGN_UP = 'You are sing-up successfully.';
    public static EMAIL_OR_PASS = 'Your email or password are not valid.';
    public static GYM_NOT = 'Gym is not available at this location.';
}

/**
 * Scroll to top
 */
export function scrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

/**
 * Get domain by environment
 */
export function getDomain() : string {
	
	return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) + '/'; 
}
