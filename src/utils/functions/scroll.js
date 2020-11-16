export const scrollToID = (id) => {
  const anchor = document.getElementById(id);

  if (anchor) {
    setTimeout(() => {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
};

export default scrollToID;
