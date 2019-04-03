# html sniper
Remove html elements by clicking on them.

# Build
## Requirements
    - OS: Linux Mint 19 Tara x86_64 or Ubuntu 18.04.2 LTS (Bionic Beaver)
    - yarn v1.13.0
    - node v10.14.1

## Steps to build extension
    1) Install dependencies by running `yarn install`.
    2) Source code is available in src directory. src/index.js is the contentscript file and src/backgroud.js is background script file.
    3) The contentscript is built and can be found in dist folder as main.js. Background script does not go through build process and is used as is.
    4) Build the extension by running `npx webpack --watch`.
    5) The above command will build contentscript index.js in src folder and copy it to dist folder as main.js.

## Build script
    1) The build.sh script will automatically build the extension. Run './build.sh' to execute the build script on linux only.
