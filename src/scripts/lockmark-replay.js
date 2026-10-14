// Tapping stretches the padlock back up into the tall solid lock, then replays from the start
document.querySelectorAll('.lockmark-replay').forEach((button) => {
  const svg = button.querySelector('svg');
  let busy = false;
  button.addEventListener('click', async () => {
    const all = svg.getAnimations({ subtree: true }).filter((a) => a instanceof CSSAnimation);
    const float = all.filter((a) => a.effect.getTiming().iterations === Infinity);
    const steps = all.filter((a) => !float.includes(a));
    if (busy || !steps.length) return;
    busy = true;
    float.forEach((a) => a.cancel());
    steps.forEach((a) => a.finish());
    svg.classList.add('is-rewinding');
    const timing = { duration: 550, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' };
    const moves = [
      ...[...svg.querySelectorAll('.lockmark__top')].map((el) =>
        el.animate([{ transform: 'translateY(256px)' }, { transform: 'none' }], timing)),
      svg.querySelector('.lockmark__stage').animate([{ transform: 'translateY(-128px)' }, { transform: 'none' }], timing),
      svg.querySelector('.lockmark__column').animate([{ transform: 'scaleY(0.55)' }, { transform: 'none' }], timing),
    ];
    await Promise.all(moves.map((m) => m.finished));
    steps.forEach((a) => {
      a.currentTime = 0;
      a.play();
    });
    moves.forEach((m) => m.cancel());
    svg.classList.remove('is-rewinding');
    float.forEach((a) => a.play());
    busy = false;
  });
});
