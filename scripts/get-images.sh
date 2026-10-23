#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# get-images.sh: download the portfolio images into assets/images/
#
# Every picture on the site is listed in js/projects.js on a line like
#     image("boris/01.jpg", 1920, "<file on Adobe Portfolio>?h=<key>")
# This script reads those lines and downloads each picture from I&CA's Adobe
# Portfolio into assets/images/<client>/. Pictures you already have are
# skipped, so it's safe to run again any time (for example after adding a
# client whose images are still on Adobe).
#
#   Run it:          bash scripts/get-images.sh
#   See the list:    bash scripts/get-images.sh --list
#   Then publish:    git add assets/images
#                    git commit -m "Add portfolio images"
#                    git push
# ---------------------------------------------------------------------------
set -euo pipefail

cd "$(dirname "$0")/.."   # always work from the project folder

projects="js/projects.js"
adobe=$(grep -oE 'ADOBE_PORTFOLIO = "[^"]+"' "$projects" | cut -d'"' -f2)

# One line per picture: "<local file> <Adobe path>"
list=$(grep -oE 'image\("[^"]+", *[0-9]+, *"[^"]+"\)' "$projects" |
  sed -E 's/image\("([^"]+)", *[0-9]+, *"([^"]+)"\)/\1 \2/')

if [[ "${1:-}" == "--list" ]]; then
  echo "$list" | awk '{ print "assets/images/" $1 }'
  echo "$(echo "$list" | wc -l) pictures"
  exit 0
fi

got=0; had=0; failed=0
while read -r file path; do
  target="assets/images/$file"
  if [[ -s "$target" ]]; then
    had=$((had + 1))
    continue
  fi
  mkdir -p "$(dirname "$target")"
  # Download to a temporary name first, so a failed download never leaves a broken file behind
  if curl -fsL --retry 3 -o "$target.part" "$adobe$path"; then
    mv "$target.part" "$target"
    got=$((got + 1))
    printf '  %-34s %s\n' "$file" "$(du -h "$target" | cut -f1)"
  else
    rm -f "$target.part"
    failed=$((failed + 1))
    echo "  could not download $file"
  fi
done <<< "$list"

echo
echo "Downloaded $got, already had $had, failed $failed."
echo "assets/images/ is now $(du -sh assets/images | cut -f1)."
if (( failed > 0 )); then
  echo "Run the script again to retry the ones that failed."
  exit 1
fi
