import CategorySet from '../model/scores/category-set';

export const OVERALL_CATEGORY: CategorySet = {
  categoryNames: ['Quality', 'Value', 'Artistry'],
  categoryHints: [
    'Strictly and structurally speaking, how well-made is this game?',
    'As an entertainment product, is this game worth the money and/or time investment?',
    'As a work of art, does this game facilitate meaningful play?',
  ],
  categoryGuidingQuestions: [
    [
      'Does it have any flaws that make it confusing or hinder player engagement?',
      'Does the experience that it offers end to soon or overstay its welcome?',
      'Does the craftsmanship need improvement?',
    ],
    [
      'How long does it take to play? Can it be enjoyed multiple times?',
      'Is it fun? For whom? Are some parts of it less engaging than others?',
      'How likely is it that players will actually interact with most or all of its content?',
    ],
    [
      'Does it have its own, distinct identity, or anything novel to say?',
      'Is the experience that it offers interesting or emotionally powerful?',
      'How well does it deliver on its core aesthetics?',
    ],
  ],
};

export const LITERACY_REQS_CATEGORY: CategorySet = {
  categoryNames: ['Interfacing', 'Agility', 'Reasoning', 'Comprehension'],
  categoryHints: [
    'How hard is it to perform game-relevant actions?',
    'How much time is available to react and respond to changes in the state of play?',
    'How involved and how flawless must players’ logical deductions and/or strategy be?',
    'How complex and how obfuscated are the themes/messages being conveyed?',
  ],
  categoryGuidingQuestions: [
    [
      'Can I reach all of the buttons on this controller? Do I know what they are used for?',
      'Can I hit this golf ball with my club? Can I get it to go more or less where I want it to?',
      'Do I know enough words to be able find a descent play in Scrabble?',
      'Can I tell the difference between these two game objects?',
    ],
    [
      'Can I think quickly enough to stop this soccer ball as the goalie?',
      'How long can I last in Tetris before the pieces start falling to quickly for me to react?',
      'Am I fast enough to be the first to shout ‘Snap!’ in the card game of the same name?',
      'Can I notice and dodge enemy fire in an online Call of Duty match before dying to it?',
    ],
    [
      'Can I find the sequence of chess moves that guarantees a mate-in-three from here?',
      'Has this misstep in Civilization V lost me just these three archers or the entire game?',
      'Can I plan a layout effective enough to beat this level in Plants vs. Zombies?',
      'Can we find a play that gives us good chances of getting another first down?',
    ],
    [
      'Have I noticed that Monopoly endorses exploitative capitalism through its mechanics?',
      'Can I detect and understand the commentary on nihilism found in NieR: Automata?',
      "Am I aware that the events described in The Beginner’s Guide didn't actually happen?",
      'Have I noticed that RPG protagonists are rarely punished for vandalism or theft?',
    ],
  ],
};

export const MECHANICS_CATEGORY: CategorySet = {
  categoryNames: [
    'Clarity',
    'Intuitiveness',
    'Consistency',
    'Utility',
    'Implementation',
  ],
  categoryHints: [
    'Are the player-facing mechanics well-communicated and unambiguous?',
    'Do the mechanics make sense thematically and when combined?',
    'Do the mechanics ever change unpredictably or without notice?',
    'Does each and every mechanic serve at least one meaningful purpose?',
    'How well do the mechanics mesh together and facilitate dynamics?',
  ],
  categoryGuidingQuestions: [
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
  ],
};

export const DYNAMICS_CATEGORY: CategorySet = {
  categoryNames: ['Responsiveness', 'Telegraphing', 'Conveyance', 'Juice/Feel'],
  categoryHints: [
    'Does the game state noticeably react to all intentional player (in)activity?',
    'Is all context-sensitive gameplay information easily discernible when needed?',
    'Are the consequences of all intentional player (in)activity communicated effectively?',
    "Does the experience of player interaction align with this game's themes and aesthetics?",
  ],
  categoryGuidingQuestions: [
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
  ],
};

const leftText = 'How successful is this game at drawing upon ';
const rightText = ' to create meaningful play?';

export const AESTHETICS_CATEGORY: CategorySet = {
  categoryNames: [
    'Sensation',
    'Fantasy',
    'Narrative',
    'Challenge',
    'Fellowship',
    'Competition',
    'Discovery',
    'Expression',
    'Submission',
    'Cohesiveness',
  ],
  categoryHints: [
    leftText + 'Sensation' + rightText,
    leftText + 'Fantasy' + rightText,
    leftText + 'Narrative' + rightText,
    leftText + 'Challenge' + rightText,
    leftText + 'Fellowship' + rightText,
    leftText + 'Competition' + rightText,
    leftText + 'Discovery' + rightText,
    leftText + 'Expression' + rightText,
    leftText + 'Submission' + rightText,
    'How well do the chosen aesthetics combine to deliver a unified emotional experience?',
  ],
  categoryGuidingQuestions: [
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
    [
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
      'Lorem ipsum dolor set amet?',
    ],
  ],
};
