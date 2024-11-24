class ServiceError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class UnprocessableServiceError extends ServiceError {}
