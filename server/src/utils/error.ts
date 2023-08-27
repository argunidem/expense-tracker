class BaseError extends Error {
   statusCode: number;

   constructor(statusCode: number, message: string) {
      super(message);

      Object.setPrototypeOf(this, new.target.prototype);
      this.name = Error.name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this);
   }
}

class AuthenticationError extends BaseError {
   constructor(message: string = "Invalid credentials.") {
      super(401, message);
   }
}

class NotFoundError extends BaseError {
   property: string;

   constructor(property: string) {
      super(404, `${property} not found.`);

      this.property = property;
   }
}

class ConflictError extends BaseError {
   constructor(message: string = "Conflict: The email address is already in use by another user.") {
      super(409, message);
   }
}

export { AuthenticationError, BaseError, ConflictError, NotFoundError };
