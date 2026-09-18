#!/usr/bin/env bash
#
# Build mama_<version>_all.deb.
#
# Deliberately uses only dpkg-deb and fakeroot so the package can be built on
# a stock Ubuntu or Debian box with nothing extra installed. debhelper is not
# required: this package installs plain files and runs no maintainer scripts.
#
# Usage:  ./packaging/build-deb.sh  [output-dir]

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${1:-$ROOT/build}"

VERSION="$(node -p "require('$ROOT/package.json').version")"
PKG="mama"
# Debian revision. Bump the -N suffix for packaging-only changes.
DEB_VERSION="${VERSION}-1"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "==> Building $PKG $DEB_VERSION"

# 1. Compile TypeScript.
( cd "$ROOT" && npm run --silent build )

# 2. Lay out the filesystem exactly as it will appear on the target machine.
#    Program files go under /usr/lib, not /usr/share: they are architecture
#    independent but they are executable code, and Debian Policy 9.1.1 puts
#    those in /usr/lib.
install -d "$STAGE/usr/lib/$PKG"
install -d "$STAGE/usr/bin"
install -d "$STAGE/usr/share/doc/$PKG"
install -d "$STAGE/usr/share/man/man1"
install -d "$STAGE/DEBIAN"

cp -r "$ROOT/dist/src/." "$STAGE/usr/lib/$PKG/"

# The compiled output is ESM. Without a package.json marking the directory as
# a module, node treats every .js here as CommonJS and the import statements
# fail at startup. npm gets this from the package's own package.json; a .deb
# has to carry its own.
printf '{\n  "type": "module"\n}\n' > "$STAGE/usr/lib/$PKG/package.json"

find "$STAGE/usr/lib/$PKG" -type f -exec chmod 644 {} +

# Debian Policy 10.4 forbids /usr/bin/env in shebangs of packaged scripts:
# the interpreter path must be absolute. The nodejs package provides
# /usr/bin/node. (The npm build keeps /usr/bin/env node, which is correct
# there - nvm users have no /usr/bin/node.)
sed -i '1s|^#!/usr/bin/env node$|#!/usr/bin/node|' "$STAGE/usr/lib/$PKG/cli.js"
head -1 "$STAGE/usr/lib/$PKG/cli.js" | grep -qx '#!/usr/bin/node' \
  || { echo "shebang rewrite failed" >&2; exit 1; }
chmod 755 "$STAGE/usr/lib/$PKG/cli.js"

ln -s "../lib/$PKG/cli.js" "$STAGE/usr/bin/$PKG"

# 3. Documentation. A copyright file is mandatory (Policy 12.5); a changelog
#    is mandatory for non-native packages (Policy 12.7).
cp "$ROOT/packaging/copyright" "$STAGE/usr/share/doc/$PKG/copyright"
sed "s/@VERSION@/$DEB_VERSION/" "$ROOT/packaging/changelog.Debian" \
  | gzip -9n > "$STAGE/usr/share/doc/$PKG/changelog.Debian.gz"
gzip -9nc "$ROOT/packaging/mama.1" > "$STAGE/usr/share/man/man1/$PKG.1.gz"
chmod 644 "$STAGE/usr/share/doc/$PKG/"* "$STAGE/usr/share/man/man1/$PKG.1.gz"

# 4. Normalise directory permissions. mktemp -d gives 0700 and cp -r carries
#    the umask through, which would ship world-unreadable directories.
chmod 755 "$STAGE"
find "$STAGE/usr" -type d -exec chmod 755 {} +

# 5. Control file. Installed-Size is in kibibytes (Policy 5.6.20).
INSTALLED_SIZE="$(du -ks "$STAGE/usr" | cut -f1)"
sed -e "s/@VERSION@/$DEB_VERSION/" -e "s/@INSTALLED_SIZE@/$INSTALLED_SIZE/" \
  "$ROOT/packaging/control" > "$STAGE/DEBIAN/control"

# 6. md5sums, so `dpkg --verify mama` and debsums can check the install.
( cd "$STAGE" && find usr -type f -print0 | sort -z \
  | xargs -0 md5sum > DEBIAN/md5sums )
chmod 644 "$STAGE/DEBIAN/md5sums"

# 7. Build. --root-owner-group avoids needing real root for ownership.
mkdir -p "$OUT_DIR"
DEB="$OUT_DIR/${PKG}_${DEB_VERSION}_all.deb"
fakeroot dpkg-deb --build --root-owner-group "$STAGE" "$DEB" >/dev/null

echo "==> $DEB"
dpkg-deb --info "$DEB" | sed -n '2,20p'
