import { CustomResponse } from "../custom-response";

interface Data {
  [key: string]: { USD: string };
}

export class GetCoinsResponse implements CustomResponse {
  constructor(public data: Data) {
    this.data = data;

    Object.setPrototypeOf(this, GetCoinsResponse.prototype);
  }

  serializeResponse(): object {
    const obj: { [key: string]: string } = {};

    Object.keys(this.data).forEach((key) => {
      obj[key] = this.data[key].USD + "$";
    });

    return obj;
  }
}
