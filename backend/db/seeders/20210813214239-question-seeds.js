'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Questions', [
  {
    ownerId: 1,
    title: 'My 13 year daughter does not want hair anymore. She wants a clean shave on her head. What should I do?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 2,
    title: 'What’s the saddest/most upsetting thing you’ve walked in on your child doing?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 3,
    title: "My 20-year-old son has made no moves toward moving out of my house. He doesn't work or go to school. When I told him he needed to get a job or move, he said that I can't legally kick him out. Am I missing something or is this a new law?",
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 4,
    title: 'Has anyone ever attacked you for something you wore?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 5,
    title: 'My daughter bought a new car, the contract is signed and she drove it home. The dealership called and said they forgot to take the custom wheels off the car and want her to bring the car back so they can change them. What should she do?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 5,
    title: 'When did you realize that your teenager son or daughter has matured a little?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 4,
    title: 'Why do we dive with sharks but not crocodiles?',
    description: null,
    image: "https://qph.fs.quoracdn.net/main-qimg-984b8d0bc7451c51e764f4d8235b23f9",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
    {
    ownerId: 3,
    title: 'What is the best thing you came across on the internet today?',
    description: "Just am very curious",
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 2,
    title: 'What is the craziest thing someone ever built at home?',
    description: "For me it is a birdhouse",
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 1,
    title: 'Is it true that some people, working as spies or hackers, plant USB sticks in walls for drop offs, or is it a hoax?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 1,
    title: 'After a loved one died, what did you find while cleaning out their home that surprised you',
    description: "just contemplating life right now and pondering things.",
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 2,
    title: 'What are some good daily exercises for men above 40 to keep them fit and healthy for the rest of their lives?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 3,
    title: 'As a lawyer, have you ever hinted or told your client they should just run?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
    {
    ownerId: 4,
    title: "My teenager wants an Apple MacBook Pro. We tried to explain that we can't afford it and got her a MacBook Air and she stopped speaking with us. What should we do?",
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 5,
    title: 'How was your prison life?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 5,
    title: 'My 13-year-old daughter is having a birthday party at an escape room with her close friends. My 8-year-old daughter wants to go. What should I do?',
    description: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
    {
    ownerId: 4,
    title: "How do you respectfully tell guests in your home that they’ve overstayed their welcome?",
    description: null,
    image: null, 
    createdAt: new Date(),
    updatedAt: new Date()
  },
], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
