import { CustomResponse } from "../custom-response";

interface Data {
  [key: string]: object;
}

export class CoinsResponse extends CustomResponse {
  constructor(public data: Data) {
    super(data);
    Object.setPrototypeOf(this, CoinsResponse.prototype);
  }

  serializeResponse(): {}[] {
    return Object.keys(this.data).map((key) => {
      let response: Data = {};
      response[key] = this.data[key];
      return response;
    });
  }
}
