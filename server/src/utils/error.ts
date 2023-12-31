class BaseError extends Error {
   statusCode: number;

   constructor(statusCode: number, message: string) {
      super(message);

      //. Set the prototype of the instance
      Object.setPrototypeOf(this, new.target.prototype);

      //. Set the error name and status code
      this.name = Error.name;
      this.statusCode = statusCode;

      //. Capture the stack trace
      Error.captureStackTrace(this);
   }
}

class AuthenticationError extends BaseError {
   constructor(message: string = "Unauthorized: Authentication required.") {
      super(401, message);
   }
}

class ForbiddenError extends BaseError {
   constructor(message: string = "Forbidden: You don't have permission to access this resource.") {
      super(403, message);
   }
}

class NotFoundError extends BaseError {
   property: string;

   constructor(property: string) {
      super(404, `${property} not found.`);

      //. Set the custom property
      this.property = property;
   }
}

class ConflictError extends BaseError {
   constructor(message: string = "Conflict: The email address is already in use by another user.") {
      super(409, message);
   }
}

export { AuthenticationError, ForbiddenError, BaseError, ConflictError, NotFoundError };
