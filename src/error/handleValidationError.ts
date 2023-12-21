import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError | null | undefined,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err?.errors || {}).map(
    e => {
      return {
        path: e?.path || '',
        message: e?.message || '',
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handleValidationError;
