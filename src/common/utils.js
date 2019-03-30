const classes = (...names) => names.filter(v => v).join(' ');

const levenshteinDistance = (A, B) => {
  const a = A.toLowerCase();
  const b = B.toLowerCase();
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1));
      }
    }
  }

  return matrix[b.length][a.length];
};

const similarity = (keyword, sentence) => {
  const kWords = keyword.split(/\W/);
  const sWords = sentence.split(/\W/);
  return kWords.reduce((sum, kWord) => {
    const min = sWords.reduce((min, sWord) => Math.min(min, levenshteinDistance(kWord, sWord)), Number.MAX_SAFE_INTEGER);
    return sum + min;
  }, 0);
};

export {
  classes,
  levenshteinDistance,
  similarity,
};
