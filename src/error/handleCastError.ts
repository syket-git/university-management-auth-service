import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    { path: err.path, message: 'Invalid Id' },
  ];

  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessage: errors,
  };
};

export default handleCastError;
