/**
 * init.js
 * Entry point — wires up event listeners and loads the board.
 */

document.addEventListener('DOMContentLoaded', async function() {

  // Lightbox close triggers
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Load images
  try {
    const images = await fetchImageList();
    renderBoard(images);
  } catch (err) {
    showError(err.message);
  }

});
