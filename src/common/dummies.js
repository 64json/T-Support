const QUESTIONS = [{
  id: 'q-0',
  category: 'Services > Network & coverage',
  text: 'Does data network work in Mexico?',
  answers: [{
    id: 'a-0',
    text: 'It works smoothly in Mexico City, but in rural area it can be not as reliable.',
  }, {
    id: 'a-1',
    text: 'It works well all over Mexico.',
  }, {
    id: 'a-2',
    text: 'It works smoothly in Mexico City, but in rural area it can be not as reliable.',
  }, {
    id: 'a-3',
    text: 'It works well all over Mexico.',
  }],
}];

for (let i = 0; i < 6; i++) {
  QUESTIONS[i] = { ...QUESTIONS[0], id: `q-${i}` };
}

export {
  QUESTIONS,
};
