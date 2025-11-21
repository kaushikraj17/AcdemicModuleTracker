import prisma from "@/utils/db";

//add new faculty
export const createFaculty = (data) => {
  return prisma.faculty.create({ data });
};

