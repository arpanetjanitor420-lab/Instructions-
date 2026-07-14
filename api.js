/**
 * api.js
 * Fetches the list of PNG files from the GitHub Contents API.
 * Returns raw download_url values — no compression, no renaming.
 */

async function fetchImageList() {
  const { owner, repo, branch, imagesFolder } = CONFIG;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${imagesFolder}?ref=${branch}`;

  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' }
  });

  if (response.status === 403) {
    throw new Error('GitHub API rate limit hit. Wait a minute and refresh.');
  }
  if (response.status === 404) {
    throw new Error(`Repo or folder not found. Check config.js — owner="${owner}", repo="${repo}", folder="${imagesFolder}".`);
  }
  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status}. Check config.js settings.`);
  }

  const files = await response.json();

  return files
    .filter(f => f.type === 'file' && f.name.toLowerCase().endsWith('.png'))
    .map(f => ({
      name: f.name,
      url:  f.download_url   // raw file served as-is from GitHub
    }));
}
