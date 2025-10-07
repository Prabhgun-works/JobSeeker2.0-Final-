// repositories/jobRepository.js
//
// Prisma-based job data access.

const prisma = require('./prismaClient');


async function findAll() {

  return await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      recruiter: {
        select: { id: true, name: true, email: true }
      },
      _count: { select: { applications: true } }
    }
  });
}


async function findById(id) {

  return await prisma.job.findUnique({
    where: { id: Number(id) },
    include: {
      recruiter: { select: { id: true, name: true, email: true } },
      applications: true
    }
  });
}


async function create(jobData) {

  return await prisma.job.create({
    data: jobData
  });
}


async function update(id, data) {

  return await prisma.job.update({
    where: { id: Number(id) },
    data
  });
}


async function deleteJob(id) {

  return await prisma.job.delete({
    where: { id: Number(id) }
  });
}
async function findApplicantsByJob(jobId) {
  return prisma.application.findMany({
    where: { jobId: parseInt(jobId) },
    include: { candidate: true } // assumes "candidateId" relation exists in Application model
  });
}


module.exports = { findApplicantsByJob,findAll, findById, create, update, delete: deleteJob };