const getFormattedDiff = (val1, val2, diffPhrase, unit = '') => {
  const diff = val1 - val2;

  if (diff === 0) return val1;

  const phrase = diff < 0 ? diffPhrase.LESS : diffPhrase.MORE;

  return `${val1} (${phrase} ${Math.abs(diff.toFixed(1))}${unit})`;
};

export default getFormattedDiff;
