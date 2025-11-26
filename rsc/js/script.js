document.addEventListener('DOMContentLoaded', () => {
  const miniVidSection = document.querySelector('.mini-vid');
  if (!miniVidSection) return;

  const miniPlayer = miniVidSection.querySelector('#miniPlayer');
  const miniToggle = miniVidSection.querySelector('#miniToggle');
  const miniClose = miniVidSection.querySelector('#miniClose');

  let activated = false;
  let closed = false;

  const firstJay = document.querySelector('.jayrome');
  if (firstJay) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (closed) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.25 && !activated) {
          activated = true;
          miniVidSection.classList.add('visible');
          if (miniPlayer) {
            miniPlayer.muted = true;          // allow autoplay
            miniPlayer.play().catch(()=>{});  // play silently
          }
          observer.disconnect(); // keep the mini player visible after scrolling past
        }
      });
    }, { threshold: [0.25] });
    io.observe(firstJay);
  }

  miniToggle?.addEventListener('click', () => {
    if (!miniPlayer) return;
    if (miniPlayer.paused) {
      miniPlayer.play().catch(()=>{});
      miniToggle.textContent = 'Pause';
    } else {
      miniPlayer.pause();
      miniToggle.textContent = 'Play';
    }
  });

  miniClose?.addEventListener('click', () => {
    closed = true;
    miniPlayer?.pause();
    miniVidSection?.remove();
  });
});