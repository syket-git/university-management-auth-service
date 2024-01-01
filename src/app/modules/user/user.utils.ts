import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id?.substring(4) : null;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester?.year.substring(
    2,
  )}${academicSemester?.code}${incrementedId}`;

  return incrementedId;
  // console.log(incrementedId);
};

const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFacultyId = await User.findOne(
    { role: 'faculty' },
    { _id: 0, id: 1 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFacultyId?.id ? lastFacultyId?.id?.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
