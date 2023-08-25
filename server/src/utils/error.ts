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

export const ConflictError = new BaseError(
   409,
   "Conflict: The email address is already in use by another user."
);
