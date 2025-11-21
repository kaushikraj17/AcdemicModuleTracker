import prisma from "@/utils/db";

//add new student
export const createStudent = (data) => {
  return prisma.student.create({ data });
};
