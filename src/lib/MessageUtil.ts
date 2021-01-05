import { Response } from '../model/response';

enum StatusCode {
  success = 200,
}

class Result {
  private statusCode: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(code: number, data: object): Response {
    const result = new Result(code, 'success', data);
    return result.bodyToString();
  }

  static error(code: number, message: string) {
    const result = new Result( code, message);
    return result.bodyToString();
  }
}