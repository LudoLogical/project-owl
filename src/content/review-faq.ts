export type ReviewFAQ = {
  question: string;
  answer: string;
};

export const REVIEW_FAQ: ReviewFAQ[][] = [
  [
    {
      question:
        "I'm reviewing a product that has both physical and digital releases. Which do I choose?",
      answer:
        "If you only interacted with digital release(s), choose 'digital.' If you only interacted with physical " +
        "releases, choose 'physical.' If you interacted with both physical and digital release(s), you'll need to " +
        'make two reviews - one for the digital release(s) and one for the physical release(s). You can note that ' +
        'you have experience with both in the Comments sections of both reviews if you wish.',
    },
    {
      question:
        "The game that I want to review isn't showing up in the search results.",
      answer:
        "Project Owl leverages IGDB's API to search for digital games and Board Game Atlas's API to search for " +
        "physical games. You can request that the game you're looking for be added to the appropriate database(s) " +
        "by contacting IGDB and/or Board Game Atlas. Once it's been added, you'll be able to see it in the search " +
        'results here!',
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
