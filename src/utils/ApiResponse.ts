/* eslint-disable @typescript-eslint/no-explicit-any */

class ApiResponse<T> {
  private success: boolean;
  public meta?: any;

  constructor(
    public statusCode: number,
    public data: T,
    public message: string = "Success",
    meta?: any
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = statusCode >= 400 ? "Failed" : message;
    this.success = statusCode < 400;
    if (meta) {
      this.meta = meta;
    }
  }
}
export default ApiResponse;
