// repositories/userRepository.js
//
// Prisma-based user data access.
// All DB calls for users live here.

const prisma = require('./prismaClient');


async function findByEmail(email) {

  // findUnique returns single row or null
  return await prisma.user.findUnique({
    where: { email }
  });
}


async function findById(id) {

  return await prisma.user.findUnique({
    where: { id: Number(id) }
  });
}


async function create(user) {

  // user should already have hashed password before create
  return await prisma.user.create({
    data: user
  });
}


async function update(id, data) {

  return await prisma.user.update({
    where: { id: Number(id) },
    data
  });
}


module.exports = { findByEmail, findById, create, update };