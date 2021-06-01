cd "`dirname "$0"`"
cd ..

# Uses: https://github.com/electron-userland/electron-packager
# To install it globally:
#
#     npm install electron-packager -g
#

# Clean
rm -rf Inky-darwin-x64/
rm -rf Inky-win32-x64/
rm -rf Inky-win32-ia32/
rm -rf Inky-linux-x64/
rm -rf release

# Create a zip files ready for upload on Windows/Linux
mkdir -p release

# Create icon from PNG
./resources/makeIcns.command

# Mac
electron-packager app Inky --platform=darwin --arch=x64 --icon=resources/Icon.icns --extend-info=resources/info.plist --app-bundle-id=com.inkle.inky --prune --asar.unpackDir="main-process/ink" --ignore="inklecate_win.exe" --ignore="inklecate_linux" --target="dmg"

zip -r -y release/Inky_mac.zip Inky-darwin-x64/*
rm -rf Inky-darwin-x64/

# Windows 64 bit (requires Wine - `brew install wine`)
electron-packager app Inky --platform=win32  --arch=x64 --icon=resources/Icon1024.png.ico --prune --asar.unpackDir="main-process/ink" --ignore="inklecate_mac" --ignore="inklecate_linux" --win32metadata.ProductName="Inky" --win32metadata.CompanyName="inkle Ltd" --win32metadata.FileDescription="Inky" --win32metadata.OriginalFilename="Inky" --win32metadata.InternalName="Inky" --target="zip"

zip -r release/Inky_windows_64.zip Inky-win32-x64
rm -rf Inky-win32-x64/

# Windows 32 bit
electron-packager app Inky --platform=win32  --arch=ia32 --icon=resources/Icon1024.png.ico --prune --asar.unpackDir="main-process/ink" --ignore="inklecate_mac" --ignore="inklecate_linux" --win32metadata.ProductName="Inky" --win32metadata.CompanyName="inkle Ltd" --win32metadata.FileDescription="Inky" --win32metadata.OriginalFilename="Inky" --win32metadata.InternalName="Inky" --target="zip"

zip -r release/Inky_windows_32.zip Inky-win32-ia32
rm -rf Inky-win32-ia32/

# Linux
electron-packager app Inky --platform=linux --arch=x64 --icon=resources/Icon.icns --extend-info=resources/info.plist --prune --asar.unpackDir="main-process/ink" --ignore="inklecate_win.exe" --ignore="inklecate_mac" --target="zip"

zip -r release/Inky_linux.zip Inky-linux-x64
rm -rf Inky-linux-x64/

# Remove .icns again
rm resources/Icon.icns