/**
 * 统一响应体工具函数
 */

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 成功响应
export function success<T>(data: T, message = "Success"): ApiResponse<T> {
  return {
    code: 200,
    message,
    data,
  };
}

// 失败响应
export function fail(message = "Error", code = 400): ApiResponse<null> {
  return {
    code,
    message,
    data: null,
  };
}

// 自定义响应
export function response<T>(
  code: number,
  message: string,
  data: T,
): ApiResponse<T> {
  return {
    code,
    message,
    data,
  };
}
