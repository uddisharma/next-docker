import prisma from "@/lib/prisma";

async function main() {
  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        gender: "MALE",
        age: 30,
        location: "New York",
        pinCode: 10001,
        loginType: "GOOGLE",
        source: "web",
        lastLogin: new Date(),
        otp: 123456,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        gender: "FEMALE",
        age: 28,
        location: "Los Angeles",
        pinCode: 90001,
        loginType: "PHONE",
        source: "mobile",
        lastLogin: new Date(),
        otp: 654321,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        phone: "5551234567",
        gender: "FEMALE",
        age: 25,
        location: "Chicago",
        pinCode: 60601,
        loginType: "GOOGLE",
        source: "web",
        lastLogin: new Date(),
        otp: 111222,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
    prisma.user.create({
      data: {
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@example.com",
        phone: "5557654321",
        gender: "MALE",
        age: 35,
        location: "Miami",
        pinCode: 33101,
        loginType: "PHONE",
        source: "mobile",
        lastLogin: new Date(),
        otp: 333444,
        otpExpires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
      },
    }),
  ]);

  // Create Accounts
  await Promise.all([
    prisma.account.create({
      data: {
        userId: users[0].id,
        type: "oauth",
        provider: "google",
        providerAccountId: "google-account-id-1",
        refreshToken: "refresh-token-1",
        accessToken: "access-token-1",
        expiresAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        tokenType: "Bearer",
        scope: "email profile",
        idToken: "id-token-1",
        sessionState: "active",
      },
    }),
    prisma.account.create({
      data: {
        userId: users[1].id,
        type: "oauth",
        provider: "google",
        providerAccountId: "google-account-id-2",
        refreshToken: "refresh-token-2",
        accessToken: "access-token-2",
        expiresAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        tokenType: "Bearer",
        scope: "email profile",
        idToken: "id-token-2",
        sessionState: "active",
      },
    }),
    prisma.account.create({
      data: {
        userId: users[2].id,
        type: "oauth",
        provider: "facebook",
        providerAccountId: "facebook-account-id-1",
        refreshToken: "refresh-token-3",
        accessToken: "access-token-3",
        expiresAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        tokenType: "Bearer",
        scope: "email public_profile",
        idToken: "id-token-3",
        sessionState: "active",
      },
    }),
  ]);

  // Create Sessions
  const sessions = await Promise.all([
    prisma.session.create({
      data: {
        sessionToken: "session-token-1",
        userId: users[0].id,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    }),
    prisma.session.create({
      data: {
        sessionToken: "session-token-2",
        userId: users[1].id,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    }),
    prisma.session.create({
      data: {
        sessionToken: "session-token-3",
        userId: users[2].id,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    }),
  ]);

  // Create Blogs
  await Promise.all([
    prisma.blog.create({
      data: {
        title: "My First Blog",
        content: "This is the content of my first blog.",
        authorId: users[0].id,
        category: "Personal",
        subCategory: "Life",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        isActive: true,
      },
    }),
    prisma.blog.create({
      data: {
        title: "Tech Trends 2023",
        content: "Exploring the latest trends in technology.",
        authorId: users[1].id,
        category: "Technology",
        subCategory: "Trends",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        isActive: true,
      },
    }),
    prisma.blog.create({
      data: {
        title: "Travel Diaries",
        content: "Sharing my travel experiences around the world.",
        authorId: users[2].id,
        category: "Travel",
        subCategory: "Adventure",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        isActive: true,
      },
    }),
  ]);

  // Create Reports
  await Promise.all([
    prisma.report.create({
      data: {
        userId: users[0].id,
        startTime: new Date(),
        endTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        sessionId: sessions[0].sessionToken,
        recommendation: { message: "Keep up the good work!" },
        questions: [
          {
            question: "How satisfied are you with our service?",
            answer: "Very Satisfied",
          },
        ],

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.report.create({
      data: {
        userId: users[1].id,
        startTime: new Date(),
        endTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        sessionId: sessions[1].sessionToken,
        recommendation: { message: "Consider improving your response time." },
        questions: [
          {
            question: "What features would you like to see improved?",
            answer: "Feature A",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create Questions
  const questions = await Promise.all([
    prisma.question.create({
      data: {
        text: "How satisfied are you with our service?",
        sequence: 1,
        questionType: "SINGLE_SELECT",
        required: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.question.create({
      data: {
        text: "What features would you like to see improved?",
        sequence: 2,
        questionType: "MULTIPLE_SELECT",
        required: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // Create Options
  await Promise.all([
    prisma.option.create({
      data: {
        questionId: questions[0].id,
        text: "Very Satisfied",
        sequence: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.option.create({
      data: {
        questionId: questions[0].id,
        text: "Satisfied",
        sequence: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.option.create({
      data: {
        questionId: questions[1].id,
        text: "Feature A",
        sequence: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.option.create({
      data: {
        questionId: questions[1].id,
        text: "Feature B",
        sequence: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
