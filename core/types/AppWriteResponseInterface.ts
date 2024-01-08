export type AppWriteResponse = {
  message: string | object;
  code: number;
  type: string;
  version: string;
};

type AppWriteMessage = string | object;
export class AppWriteError extends Error {
  public code: number;

  public type: string;

  public version: string;

  constructor(
    message: AppWriteMessage,
    code: number,
    type: string,
    version: string
  ) {
    super(typeof message === "string" ? message : JSON.stringify(message));
    this.name = "AppWriteError";
    Object.setPrototypeOf(this, AppWriteError.prototype);

    this.code = code;
    this.type = type;
    this.version = version;
  }
}
