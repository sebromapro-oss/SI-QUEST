document.querySelectorAll('[data-level]').forEach(el=>{const id=el.dataset.level;const best=window.SIStorage?.summary()?.levels?.[id]?.bestStars||0;el.textContent=best+' / 3 ★';});
