// utils/api.js
import { NextResponse } from "next/server";

export class ApiResponse {
  constructor(success = true, message = "Operation successful", data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  // Format the response as a JSON object
  toJson() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }

  // Static method to send response and optionally set cookies
  static send(message = "Operation successful", data = null, statusCode = 200, cookies = []) {
    
    const response = new ApiResponse(true, message, data);
    const nextResponse = NextResponse.json(response.toJson(), { status: statusCode });


    // Set cookies if provided
    cookies.forEach(({ name, value }) => {
      const options ={
         httpOnly : true,
         sameSite: 'Strict',
      };

      nextResponse.cookies.set(name, value, options);
    });

    return nextResponse;
  }
}

export class ApiError {
  constructor(message = "Somthing error ! please try again", statusCode = 500) {
    this.success = false;
    this.message = message;
    this.statusCode = statusCode;
  }

  // Format the error response as a JSON object
  toJson() {
    return {
      success: this.success,
      message: this.message,
      error: this.error
    };
  }

  // Static method to send error response and optionally set cookies
  static send(message = "Somthing error ! please try again", statusCode = 500, error = null , cookies = []) {
    
    const errorResponse = new ApiError(message, statusCode , error);
    const nextResponse = NextResponse.json(errorResponse.toJson(), { status: statusCode });

    // Set cookies if provided
    cookies.forEach(({ name, value }) => {
      nextResponse.cookies.set(name, value, { httpOnly: true});
    });

    return nextResponse;
  }
}
