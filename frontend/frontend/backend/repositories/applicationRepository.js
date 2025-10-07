// repositories/applicationRepository.js
//
// Prisma-based application data access.

const prisma = require('./prismaClient');


async function create(application) {

  return await prisma.application.create({
    data: application
  });
}


async function findByCandidate(candidateId) {

  return await prisma.application.findMany({
    where: { candidateId: Number(candidateId) },
    orderBy: { createdAt: 'desc' },
    include: {
      job: {
        select: { id: true, title: true, company: true }
      }
    }
  });
}


async function findById(id) {

  return await prisma.application.findUnique({
    where: { id: Number(id) },
    include: {
      job: true,
      candidate: { select: { id: true, name: true, email: true } }
    }
  });
}


async function updateStatus(id, status) {

  return await prisma.application.update({
    where: { id: Number(id) },
    data: { status }
  });
}


module.exports = { create, findByCandidate, findById, updateStatus };