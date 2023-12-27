import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
