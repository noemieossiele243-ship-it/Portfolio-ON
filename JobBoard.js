// Modal image simple (<dialog>)
const shotBtn = document.querySelector('.jb-shot');
const dlg = document.getElementById('shotModal');
const dlgImg = dlg?.querySelector('img');
const closeBtn = dlg?.querySelector('.close');

shotBtn?.addEventListener('click', () => {
  dlgImg.src = shotBtn.querySelector('img').src;
  dlg.showModal();
});
closeBtn?.addEventListener('click', () => dlg.close());
dlg?.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

// Switch : rien à faire, tout est en CSS (l’input #viewToggle pilote les .screen)
