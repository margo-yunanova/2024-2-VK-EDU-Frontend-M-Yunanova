export const init = () => {
  const history = localStorage.getItem('history');
  if (!history) {
    localStorage.setItem('history', JSON.stringify([]));
  }
};
