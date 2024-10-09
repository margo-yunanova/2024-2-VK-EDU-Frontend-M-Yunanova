export const createRipple = (e, onfinish) => {
  const currentElement = e.currentTarget;
  const ripple = document.createElement('span');
  const diameter = Math.max(
    currentElement.clientWidth,
    currentElement.clientHeight,
  );
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${e.clientX - currentElement.offsetLeft - radius}px`;
  ripple.style.top = `${e.clientY - currentElement.offsetTop - radius}px`;

  ripple.classList.add('ripple');

  const lastRipple = currentElement.getElementsByClassName('ripple')[0];

  if (lastRipple) {
    lastRipple.remove();
  }

  currentElement.appendChild(ripple);

  ripple.animate([{ transform: 'scale(0)' }, { transform: 'scale(4)' }], {
    duration: 600,
    easing: 'linear',
  }).onfinish = onfinish;
};
