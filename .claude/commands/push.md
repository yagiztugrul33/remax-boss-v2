---
description: Master push + gh-pages preview güncelle (PAT gerekir)
---

GitHub'a push ve gh-pages preview yenile.

## Adım 1 — Commit imzasını düzelt

```bash
git config user.email noreply@anthropic.com && git config user.name Claude
git rebase --exec "git commit --amend --no-edit --reset-author" origin/master
```

## Adım 2 — Master push

PAT'ı URL'e göm, push et, hemen temizle:

```bash
git remote set-url origin https://PAT@github.com/yagiztugrul33/remax-boss-v2.git
git push -u origin master
git remote set-url origin https://github.com/yagiztugrul33/remax-boss-v2.git
```

## Adım 3 — gh-pages static export (opsiyonel)

```bash
# build/preview branch'i oluştur, static export uygula, build et
git checkout -b build/preview
# next.config.ts → output:"export", basePath:"/remax-boss-v2", trailingSlash:true, images:{unoptimized:true}
# admin/page.tsx → client redirect stub
# ilanlar/page.tsx → force-dynamic satırını sil
npm run build
cp -r out/ /tmp/gh-pages-out/
git checkout master
git branch -D build/preview

# Worktree ile gh-pages'i güncelle
git fetch origin gh-pages
git branch gh-pages-local FETCH_HEAD
git worktree add /tmp/gh-pages-work gh-pages-local
cd /tmp/gh-pages-work
git rm -rf .
cp -r /tmp/gh-pages-out/. .
touch .nojekyll
echo ".env.local" > .gitignore
git add --all
git commit -m "deploy: ..."
git push origin gh-pages-local:gh-pages --force  # PAT gerekir
git worktree remove /tmp/gh-pages-work --force
git branch -D gh-pages-local
```

## Canlı URL

- **GitHub Pages:** https://yagiztugrul33.github.io/remax-boss-v2/
- **Vercel (full):** Kullanıcı Vercel Dashboard'dan manuel deploy eder
