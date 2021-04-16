/**
 * Interface for to use response as data and status variable
 * jsonProperty Reference from 
 * https://github.com/dhlab-basel/json2typescript 
 */
export interface ResponseDataInterface {
	
    message : string;
  
	data : any;

	extraNavigationData : any;
}