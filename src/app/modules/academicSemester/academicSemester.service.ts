import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { PaginationHelper } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
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
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;

  const academicSemesterSearchableField = [
    'title',
    'code',
    'year',
    'startMonth',
    'endMonth',
  ];

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableField.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({
    $and: andCondition,
  })
    .sort({ ...sortCondition })
    .skip(skip)
    .limit(limit);

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
