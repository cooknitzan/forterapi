import { CustomResponse } from "../custom-response";

interface Data {
  [key: string]: object;
}

export class ConvertCoinsResponse implements CustomResponse {
  constructor(public data: Data) {
    this.data = data;

    Object.setPrototypeOf(this, ConvertCoinsResponse.prototype);
  }

  serializeResponse(): object {
    return this.data;
  }
}
