/**
 * display.js
 * Renders photo cards on the board and handles the lightbox.
 */

const PIN_COLORS = [
  'var(--pin-red)',
  'var(--pin-blue)',
  'var(--pin-green)',
  'var(--pin-yellow)',
  'var(--pin-purple)',
  'var(--pin-teal)'
];

function randomRotation() {
  return (Math.random() * 12 - 6).toFixed(2);
}

function pinColor(index) {
  return PIN_COLORS[index % PIN_COLORS.length];
}

function renderBoard(images) {
  const grid    = document.getElementById('grid');
  const loading = document.getElementById('loading');
  const empty   = document.getElementById('empty');

  loading.classList.add('hidden');

  if (images.length === 0) {
    empty.classList.remove('hidden');
    return;
  }

  images.forEach(function(img, i) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.setProperty('--card-rotation', randomRotation() + 'deg');

    const pin = document.createElement('span');
    pin.className = 'card-pin';
    pin.style.setProperty('--pin-color', pinColor(i));

    const photo = document.createElement('img');
    photo.className = 'card-img';
    photo.src     = img.url;
    photo.alt     = img.name;
    photo.loading = 'lazy';

    const label = document.createElement('p');
    label.className   = 'card-label';
    label.textContent = img.name;

    card.appendChild(pin);
    card.appendChild(photo);
    card.appendChild(label);

    card.addEventListener('click', function() { openLightbox(img); });

    grid.appendChild(card);
  });
}

function openLightbox(img) {
  const lightbox  = document.getElementById('lightbox');
  const lImg      = document.getElementById('lightbox-img');
  const lName     = document.getElementById('lightbox-name');
  const lDownload = document.getElementById('lightbox-download');

  lImg.src         = img.url;
  lImg.alt         = img.name;
  lName.textContent = img.name;
  lDownload.href   = img.url;
  lDownload.setAttribute('download', img.name);

  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lImg     = document.getElementById('lightbox-img');

  lightbox.classList.add('hidden');
  lImg.src = '';
  document.body.style.overflow = '';
}

function showError(message) {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('error-text').textContent = message;
  document.getElementById('error').classList.remove('hidden');
}
