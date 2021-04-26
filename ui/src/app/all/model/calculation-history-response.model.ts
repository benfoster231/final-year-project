import { ResponseDataInterface } from "./response.model";
import { JsonProperty, JsonObject } from "json2typescript";

@JsonObject('data')
export class CalculationHistoryList {

    @JsonProperty("id", null , true)
	id:number = undefined;

	@JsonProperty("data", null , true)
	data:string = undefined;

	@JsonProperty("calculation", null , true)
	calculation:string = undefined;

	@JsonProperty("date", null , true)
	date:Date = undefined;

}

@JsonObject("CalculationHistoryResponse")
export class CalculationHistoryResponse implements ResponseDataInterface {

    @JsonProperty('message')
    message: string = undefined;
    
    @JsonProperty('data', [CalculationHistoryList], true)
    data: CalculationHistoryList[] = undefined;
    
    extraNavigationData: any;
}