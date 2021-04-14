import { environment } from '../../../environments/environment';

//To run jquery
declare var $: any;

export class ROUTS {

    public static INDEX_PAGE: string = '';
    public static HOME_PAGE: string = 'home';
    public static EXERCISE_FIGURES_PAGE: string = 'exercise-figures';
    public static EXERCISE_CALORIE_CALCULATOR_PAGE: string = 'exercise-calorie-calculator';
    public static EXERCISE_MACRO_CALCULATOR_PAGE: string = 'exercise-macro-calculator';
    public static EXERCISE_ONE_REP_MAX_TOOL_PAGE: string = 'exercise-one-rep-max-tool';
    public static STRECHES_PAGE: string = 'streches';
}

export class URL {

    public static HOME: string = environment.serverUrl + 'panino/api/homePage';
}

export class CONSTANTS {
    public static readonly ITEMS_PER_PAGE = 6;
}

export class MESSAGES {

    public static SINGN_UP = 'You are sing-up successfully.';
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