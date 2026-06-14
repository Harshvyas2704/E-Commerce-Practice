class ApiResponse {
  constructor(success, statusCode, data, message) {
    ((this.success = success),
      (this.data = data),
      (this.message = message),
      (this.statusCode = statusCode));
  }
}

module.exports = ApiResponse;
