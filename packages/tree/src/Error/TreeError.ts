import { RuntimeError } from '@jamashita/anden-error';

export class TreeError extends RuntimeError<'TreeError'> {
  public readonly noun: 'TreeError' = 'TreeError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
