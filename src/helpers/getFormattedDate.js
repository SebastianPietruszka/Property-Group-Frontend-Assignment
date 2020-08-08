const getFormattedDate = date => {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString('pl');
};

export default getFormattedDate;
