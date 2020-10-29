export const setIsConnected = () => {
  const script = document.createElement("script");
  script.textContent = "window.freighter = true;";
  const parentNode = document.head || document.documentElement;
  parentNode.prepend(script);
  script.onload = () => {
    parentNode.removeChild(script);
  };
};
