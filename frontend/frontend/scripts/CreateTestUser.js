// scripts/createTestUser.js

const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../utils/hash');

const prisma = new PrismaClient();

(async () => {
  try {
    const hashed = await hashPassword('test@2004');

    const user = await prisma.user.create({
        data: {
          name: 'Candidate Test',
          email: 'candidate_test0@gmail.com',  // change email
          password: hashed,
          role: 'candidate',
        },
      });

    console.log('Test user created:', user);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();