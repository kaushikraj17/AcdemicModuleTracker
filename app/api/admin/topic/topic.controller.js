import prisma from "@/utils/db";

//add new topic
export const addTopic = (data) => {
  return prisma.faculty.create({ data });
};