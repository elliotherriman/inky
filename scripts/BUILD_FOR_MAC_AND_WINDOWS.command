cd "`dirname "$0"`"
cd ..

# Uses: https://github.com/electron-userland/electron-packager
# To install it globally:
#
#     npm install electron-packager -g
#

# Clean
rm -rf Inky-darwin-x64/
rm ReleaseUpload/Inky_mac.dmg
rm -rf Inky-win32-x64/

# Create icon from PNG
./resources/makeIcns.command

# Mac
electron-packager app Inky --platform=darwin --arch=x64 --icon=resources/Icon.icns --extend-info=resources/info.plist --app-bundle-id=com.inkle.inky --prune --ignore="inklecate_win.exe"

# Windows
electron-packager app Inky --platform=win32  --arch=x64 --icon=resources/Icon1024.png.ico --prune --asar.unpackDir="main-process/ink" --ignore="inklecate_mac" --win32metadata.ProductName="Inky" --win32metadata.CompanyName="inkle Ltd" --win32metadata.FileDescription="Inky" --win32metadata.OriginalFilename="Inky" --win32metadata.InternalName="Inky" --overwrite

# Remove .icns again
rm resources/Icon.icns
