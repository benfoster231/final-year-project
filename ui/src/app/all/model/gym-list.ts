import { ResponseDataInterface } from "./response.model";
import { JsonProperty, JsonObject } from "json2typescript";

@JsonObject('data')
export class GymListModel {

	@JsonProperty("id", null , true)
	id:number = undefined;

	@JsonProperty("address", null , true)
	address:string = undefined;

	@JsonProperty("city", null , true)
	city:string = undefined;

	@JsonProperty("name", null , true)
	name:string = undefined;
	
	@JsonProperty("description", null , true)
	description:string = undefined;

	@JsonProperty("imagePath", null , true)
	imagePath:string = undefined;
	
	@JsonProperty("distance", null , true)
	distance:number = undefined;
	
	@JsonProperty("distanceInFormate", null , true)
	distanceInFormate:string = undefined;
	
	@JsonProperty("latitude", null , true)
	latitude:number = undefined;
	
	@JsonProperty("longitude", null , true)
	longitude:number = undefined;
	
	@JsonProperty("facilities", null , true)
	facilities:string = undefined;
}

@JsonObject("GymListResponse")
export class GymListResponse implements ResponseDataInterface {
  
    @JsonProperty('message')
    message: string = undefined;
    
    // true is for Optional field
    @JsonProperty('data', [GymListModel], true)
    data: GymListModel[] = undefined;
    
    extraNavigationData: any;
}
