import { environment } from "../../../environments/environment";

export class EndpointOsu {
	endpointUrl: string;
	extraParameter: string;
	responseObject: any;

	constructor(endpointUrl: string, extraParameter: string, responseObject: any) {
		this.endpointUrl = `${environment.osu.api_url}${endpointUrl}`;
		this.extraParameter = extraParameter;
		this.responseObject = responseObject;
	}
}
