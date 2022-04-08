export abstract class CustomResponse {
  abstract data: object;

  constructor(data: object) {
    Object.setPrototypeOf(this, CustomResponse.prototype);
  }

  abstract serializeResponse(): {}[];
}
