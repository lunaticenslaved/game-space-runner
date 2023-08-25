export class ValidationError extends Error {
  public errors: Record<string, string> = {};

  constructor(errors: Record<string, string>) {
    super();

    this.errors = errors;
  }
}
