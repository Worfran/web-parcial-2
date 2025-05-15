export function BusinessLogicException(message: string, type: number) {
    this.message = message;
    this.type = type;
  }
   
export enum BusinessError {
    NOT_FOUND = 'NOT_FOUND',
    PRECONDITION_FAILED = 'PRECONDITION_FAILED',
    BAD_REQUEST = 'BAD_REQUEST',
}