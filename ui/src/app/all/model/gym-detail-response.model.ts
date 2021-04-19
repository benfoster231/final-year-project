import { ResponseDataInterface } from "./response.model";
import { JsonProperty, JsonObject } from "json2typescript";

@JsonObject('data')
export class GymDetailResponseModel {

  @JsonProperty('gymId', null, true)
  gymId: number = undefined;

  @JsonProperty('address', null, true)
  address: string = undefined;

  @JsonProperty('city', null, true)
  city: string = undefined;

  @JsonProperty('name', null, true)
  name: string = undefined;

  @JsonProperty('latitude', null, true)
  latitude: number = undefined;

  @JsonProperty('longitude', null, true)
  longitude: number = undefined;

  @JsonProperty('state', null, true)
  state: string = undefined;

  @JsonProperty('email', null, true)
  email: string = undefined;

  @JsonProperty('website', null, true)
  website: string = undefined;

  @JsonProperty('zipCode', null, true)
  zipCode: string = undefined;

  @JsonProperty('country', null, true)
  country: string = undefined;

  @JsonProperty('contact', null, true)
  contact: string = undefined;

  @JsonProperty('videoUrl', null, true)
  videoUrl: string = undefined;

  @JsonProperty('imagePath', null, true)
  imagePath: string = undefined;

  @JsonProperty('description', null, true)
  description: string = undefined;

  @JsonProperty('galleryImages', [String], true)
  galleryImages: String[] = undefined;

}

@JsonObject("GymDetailResponse")
export class GymDetailResponse implements ResponseDataInterface {

  @JsonProperty('message')
  message: string = undefined;

  @JsonProperty('data', GymDetailResponseModel, true)
  data: GymDetailResponseModel = undefined;

  extraNavigationData: any;
}