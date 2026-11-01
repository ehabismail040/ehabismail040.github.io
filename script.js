(() => {
  'use strict';
  const projects = [...document.querySelectorAll('.project')];
  const filters = document.querySelector('.filters');
  const filterButtons = [...filters.querySelectorAll('button')];
  const more = document.querySelector('.load-more');
  const moreButton = document.querySelector('#show-more');
  const status = document.querySelector('#filter-status');
  const count = document.querySelector('#work-count');
  let expanded = false;
  let category = 'All';
  let visible = [];
  function applyFilter() {
    const matching = projects.filter(item => category === 'All' || item.dataset.category === category);
    visible = expanded ? matching : matching.slice(0, 12);
    projects.forEach(item => { item.hidden = !visible.includes(item); });
    more.hidden = matching.length <= 12 || expanded;
    moreButton.firstChild.textContent = `View all ${matching.length} pieces `;
    count.textContent = `${matching.length} pieces to explore`;
    status.textContent = `Showing ${visible.length} of ${matching.length} pieces${category === 'All' ? '' : ` in ${category}`}.`;
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  }
  filters.hidden = false;
  filterButtons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    expanded = false;
    const url = new URL(location.href);
    if (category === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    history.replaceState(null, '', url);
    applyFilter();
  }));
  const requested = new URL(location.href).searchParams.get('category');
  if (filterButtons.some(button => button.dataset.filter === requested)) category = requested;
  moreButton.addEventListener('click', () => {
    const firstNew = projects.filter(item => category === 'All' || item.dataset.category === category)[12];
    expanded = true;
    applyFilter();
    firstNew?.querySelector('a').focus({preventScroll:true});
  });
  applyFilter();
  document.querySelector('#year').textContent = new Date().getFullYear();
  const dialog = document.querySelector('#artwork-dialog');
  if (!dialog.showModal) return;
  const image = document.querySelector('#dialog-image');
  const links = projects.map(item => item.querySelector('.project-art'));
  let active = 0;
  let currentLinks = [];
  function showArtwork(index) {
    active = (index + currentLinks.length) % currentLinks.length;
    const link = currentLinks[active];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    document.querySelector('#dialog-title').textContent = link.dataset.title;
    document.querySelector('#dialog-category').textContent = link.dataset.category;
    document.querySelector('#dialog-position').textContent = `${active + 1} / ${currentLinks.length}`;
    dialog.scrollTop = 0;
  }
  links.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    currentLinks = visible.map(item => item.querySelector('.project-art'));
    showArtwork(currentLinks.indexOf(link));
    dialog.showModal();
    document.body.classList.add('modal-open');
  }));
  document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  document.querySelector('#previous-art').addEventListener('click', () => showArtwork(active - 1));
  document.querySelector('#next-art').addEventListener('click', () => showArtwork(active + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showArtwork(active - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showArtwork(active + 1); }
  });
})();
