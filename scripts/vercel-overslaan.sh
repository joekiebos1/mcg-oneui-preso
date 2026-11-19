#!/bin/sh
# ignoreCommand van Vercel (vercel.json): exit 0 = niet bouwen, exit 1 = bouwen.
# Bouwen alleen als er sinds de vorige deploy iets veranderde dat de site raakt. Het versienummer van de sync
# (src/oneui/versie.ts, BRON.md) telt niet. Vercel Hobby: 100 deploys per dag voor het hele account.
p=${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}
[ "$p" != "$VERCEL_GIT_COMMIT_SHA" ] && git diff --quiet "$p" HEAD -- src public index.html package.json package-lock.json \
  vite.config.ts tsconfig.json vercel.json api mcp ':!src/oneui/versie.ts' ':!src/oneui/BRON.md'
