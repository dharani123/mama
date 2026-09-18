#!/usr/bin/env bash
#
# Assemble a signed APT repository for publishing to GitHub Pages.
#
# Layout produced (this is what apt expects to find over HTTPS):
#
#   <out>/index.html                                   install instructions
#   <out>/<key>.asc                                    public signing key
#   <out>/pool/main/m/mama/mama_<ver>_all.deb          the packages
#   <out>/dists/stable/Release                         index of indexes
#   <out>/dists/stable/Release.gpg                     detached signature
#   <out>/dists/stable/InRelease                       inline-signed Release
#   <out>/dists/stable/main/binary-<arch>/Packages{,.gz}
#
# Usage:  ./packaging/build-apt-repo.sh [output-dir]
#
# Signing: uses the key in REPO_GPG_KEY (see repo.env), or gpg's default key.
# Set SKIP_SIGN=1 to build an unsigned tree for inspection - apt will refuse
# to use it, so this is for local testing only.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$ROOT/build/apt-repo}"

# shellcheck source=repo.env
source "$ROOT/packaging/repo.env"

VERSION="$(node -p "require('$ROOT/package.json').version")"
DEB_VERSION="${VERSION}-1"
DEB_NAME="mama_${DEB_VERSION}_all.deb"
PAGES_URL="https://${REPO_OWNER}.github.io/${REPO_NAME}"
DIST_DIR="$OUT/dists/$REPO_SUITE"
POOL_DIR="$OUT/pool/$REPO_COMPONENT/m/mama"

echo "==> Repository: $PAGES_URL"

# 1. Build the .deb, then place it in the pool.
"$ROOT/packaging/build-deb.sh" "$ROOT/build" >/dev/null
rm -rf "$OUT"
mkdir -p "$POOL_DIR"
cp "$ROOT/build/$DEB_NAME" "$POOL_DIR/"

# 2. Package indexes. dpkg-scanpackages writes paths relative to its cwd, so
#    it must run from the repository root for "Filename: pool/..." to be
#    correct.
#
#    The package is Architecture: all, but apt on an amd64 machine fetches
#    dists/<suite>/main/binary-amd64/Packages and only falls back to
#    binary-all on newer versions. Publishing the same index under every
#    advertised architecture keeps old and new apt both happy.
for arch in $REPO_ARCHITECTURES; do
  arch_dir="$DIST_DIR/$REPO_COMPONENT/binary-$arch"
  mkdir -p "$arch_dir"
  ( cd "$OUT" && dpkg-scanpackages --arch "$arch" pool /dev/null 2>/dev/null ) \
    > "$arch_dir/Packages"
  # An arch:all package must still appear in each per-arch index.
  if [ ! -s "$arch_dir/Packages" ]; then
    ( cd "$OUT" && dpkg-scanpackages pool /dev/null 2>/dev/null ) \
      > "$arch_dir/Packages"
  fi
  gzip -9nkf "$arch_dir/Packages"
  printf '    %-8s %s entries\n' "$arch" \
    "$(grep -c '^Package:' "$arch_dir/Packages" || true)"
done

# 3. Release file. apt verifies the checksums here against the Packages files
#    it downloads, which is what makes the signature meaningful.
apt-ftparchive release "$DIST_DIR" \
  -o "APT::FTPArchive::Release::Origin=$REPO_ORIGIN" \
  -o "APT::FTPArchive::Release::Label=$REPO_LABEL" \
  -o "APT::FTPArchive::Release::Suite=$REPO_SUITE" \
  -o "APT::FTPArchive::Release::Codename=$REPO_SUITE" \
  -o "APT::FTPArchive::Release::Components=$REPO_COMPONENT" \
  -o "APT::FTPArchive::Release::Architectures=$REPO_ARCHITECTURES" \
  -o "APT::FTPArchive::Release::Description=MAMA CLI - Telugu terminal buddy" \
  > "$DIST_DIR/Release"

# 4. Sign. InRelease (inline) is what modern apt prefers; Release.gpg is kept
#    for older clients.
if [ "${SKIP_SIGN:-0}" = "1" ]; then
  echo "==> SKIP_SIGN=1: leaving the repository unsigned (apt will reject it)"
else
  key_args=()
  [ -n "$REPO_GPG_KEY" ] && key_args=(--default-key "$REPO_GPG_KEY")
  # In CI there is no terminal, so a passphrase-protected key needs loopback
  # pinentry. Interactive use leaves GPG_PASSPHRASE unset and gpg prompts.
  if [ -n "${GPG_PASSPHRASE:-}" ]; then
    key_args+=(--pinentry-mode loopback --passphrase "$GPG_PASSPHRASE")
  fi

  gpg "${key_args[@]}" --batch --yes --clearsign \
    -o "$DIST_DIR/InRelease" "$DIST_DIR/Release"
  gpg "${key_args[@]}" --batch --yes --detach-sign --armor \
    -o "$DIST_DIR/Release.gpg" "$DIST_DIR/Release"
  gpg "${key_args[@]}" --armor --export > "$OUT/$REPO_KEY_FILE"

  [ -s "$OUT/$REPO_KEY_FILE" ] || { echo "public key export is empty" >&2; exit 1; }
  echo "==> Signed with: ${REPO_GPG_KEY:-gpg default key}"
fi

# 5. A landing page, since this URL is what people will actually visit.
sed -e "s|@PAGES_URL@|$PAGES_URL|g" \
    -e "s|@KEY_FILE@|$REPO_KEY_FILE|g" \
    -e "s|@SUITE@|$REPO_SUITE|g" \
    -e "s|@COMPONENT@|$REPO_COMPONENT|g" \
    -e "s|@VERSION@|$DEB_VERSION|g" \
    -e "s|@OWNER@|$REPO_OWNER|g" \
    -e "s|@REPO@|$REPO_NAME|g" \
    "$ROOT/packaging/index.html.in" > "$OUT/index.html"

# GitHub Pages runs Jekyll by default, which strips files and directories
# beginning with an underscore and can rewrite things unexpectedly.
touch "$OUT/.nojekyll"

echo "==> Repository written to $OUT"
find "$OUT" -type f | sed "s|^$OUT|   .|" | sort
