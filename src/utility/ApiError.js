class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
    };
  }
}

module.exports = ApiError;
