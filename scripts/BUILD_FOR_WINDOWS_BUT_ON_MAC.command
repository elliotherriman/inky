cd "`dirname "$0"`"
cd ..

# Uses: https://github.com/electron-userland/electron-packager
# To install it globally:
#
#     npm install electron-packager -g
#

# Ensure it's correctly/fully installed first
( cd app && npm install )

# Create icon from PNG
./resources/makeIcns.command

# Mac
electron-packager app Inky --platform=win32  --arch=x64 --icon=resources/Icon1024.png.ico --prune --asar.unpackDir="main-process/ink" --ignore="inklecate_mac" --win32metadata.ProductName="Inky" --win32metadata.CompanyName="inkle Ltd" --win32metadata.FileDescription="Inky" --win32metadata.OriginalFilename="Inky" --win32metadata.InternalName="Inky"

# Create a DMG
# Requires appdmg: npm install -g appdmg
# https://www.npmjs.com/package/appdmg
mkdir -p ReleaseUpload
appdmg resources/appdmg.json ReleaseUpload/Inky_mac.dmg

# Remove .icns again
rm resources/Icon.icns
