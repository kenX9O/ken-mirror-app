# Ken Mirror Screen website

A responsive, dependency-free download website for Ken Mirror Screen 0.4.3. Includes Android and Windows downloads, public app source, MIT licensing for original code, setup instructions, a native accessible FAQ, and checksum downloads. No analytics or account system.

## Preview on your computer
1. Install Node.js 20 or newer.
2. Open a terminal in this folder and run `npm run preview`.
3. Open http://127.0.0.1:4173 . All four download links work locally using release-assets/.

## Publish on GitHub and Vercel
### 1. Create a GitHub repository
Create a **public** repository, for example `ken-mirror-screen`. Upload the contents of this folder **except release-assets/**. Keep package.json, vercel.json, site.config.json, downloads.json, LICENSE, public/ and scripts/ at the repository root. The small dotfiles .gitignore and .vercelignore protect against accidentally committing app downloads or signing material.

The Windows ZIP exceeds GitHub's 100 MiB normal-file limit. The APK also exceeds the web uploader's 25 MiB limit. They belong in Releases, not in the repository file list.

### 2. Publish release v0.4.3
In that repository, open Releases → Draft a new release. Create tag **v0.4.3** and upload all four files from release-assets/:
- KenMirrorScreen-Smooth-Android-0.4.3.apk
- KenMirrorScreen-Windows-0.4.3.zip
- KenMirrorScreen-Source-0.4.3.zip
- SHA256SUMS.txt

Publish the release. Use these exact names and tag: the website links are generated from them. Do not upload any private recovery archive. The included public Source ZIP is sanitized and contains no signing keys/passwords.

### 3. Deploy on Vercel
Import the GitHub repository as a new Vercel project. Choose **Other** as the framework if asked. The included vercel.json sets:
- Build command: `npm run build`
- Output directory: `dist`
- No dependencies or server functions required.

Add an environment variable named **RELEASE_REPOSITORY**, with your actual GitHub `username/repository` (for example, `yourname/ken-mirror-screen`, without https://). Set it for Production and Preview. Click Deploy.

Alternatively fill `repository` in site.config.json before pushing. If neither is set, the build tries Vercel's Git repository environment variables. It intentionally fails if no valid repository is known, rather than publishing fake download URLs. Those fallback system variables must be exposed in Vercel's project settings to work.

The deployed website serves only the small HTML/CSS/JS files from dist/. Downloads are served directly from your GitHub release; no large binaries pass through Vercel functions.

### 4. Check your live site
Click both app downloads, Download app source, Verify downloads, and View project. Check the downloaded filenames. Test on your phone as well. The release must be public and published, not left as a draft.

## Optional: GitHub Pages instead
Set RELEASE_REPOSITORY in your environment to the GitHub owner/repository and run `npm run build`. Upload the contents of dist/ to a GitHub Pages publishing branch. Local CSS and script URLs are relative so repository subpaths work. The app assets stay in Releases. The Vercel route above does not require GitHub Pages.

## Edit the site
- public/index.html: content and download filenames.
- public/style.css: colors, responsive layout and typography.
- public/app.js: FAQ behavior.
- site.config.json: repository and release tag.
- downloads.json: download sizes and SHA-256 checksums for the supplied 0.4.3 files.
- scripts/build.mjs: produces the static Vercel output with release links.

For a future app release, upload its assets to a new release, update filenames in index.html, the releaseTag/version in site.config.json and sizes/checksums in downloads.json. Rebuild/redeploy.

## Source and licensing
This website and Ken's original app code use MIT. The public source ZIP includes the Windows JavaScript project, Android decoded smali/resources/native library project, available Java helper sources and build guidance. The original complete Android Java project is not available; the decoded project is provided for editing/rebuilding. Bundled third-party components retain their licenses and notices. The APK and Windows ZIP are the exact supplied files and have not been re-signed or modified for this website.

Only release-assets/KenMirrorScreen-Source-0.4.3.zip is intended as the public app-source archive. Private developer recovery packages from earlier conversations contain secrets and must never be published.

## Documentation
GitHub file/release limits: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
Vercel system variables: https://vercel.com/docs/environment-variables/system-environment-variables

This package is ready for you to publish; no GitHub repository or Vercel deployment has been created on your account.
