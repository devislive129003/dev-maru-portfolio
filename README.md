# Dev Maru Portfolio

Static portfolio site published with GitHub Pages through GitHub Actions.

## Assets

AI images and portfolio videos are listed in [`asset-manifest.js`](./asset-manifest.js). When adding media, place it in the corresponding folder under `assets/` and add its exact filename to the manifest.

`assets/Trending_AI/Product_review_reel.mp4` is intentionally excluded because it exceeds GitHub's 100 MB per-file limit.

## Publishing

Push changes to the `main` branch to trigger the GitHub Pages deployment workflow. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** if it is not already selected.

The public site URL will be:

`https://devislive129003.github.io/dev-maru-portfolio/`
