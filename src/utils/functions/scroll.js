export const scrollToID = (id, isSmooth = true) => {
  const anchor = document.getElementById(id);

  if (anchor) {
    setTimeout(() => {
      anchor.scrollIntoView({ behavior: isSmooth ? "smooth" : "auto" });
    }, 50);
  }
};

export default scrollToID;
