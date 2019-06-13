# DOM sniper
Remove HTML elements from the page by clicking on them. Install the firefox extension [here](https://addons.mozilla.org/en-US/firefox/addon/html-sniper/?src=search.).

## How to use?
  1. Once the page is loaded click on the extension icon in the toolbar.
  2. Once the icon is clicked you can hover on the HTML element you want to delete. The element will be highlighted in green.
  3. When you click on the element the element will be deleted. Actually it's display will be set to none which will virtually remove it from the display.
  4. You can click on the toolbar icon again or press ESC key to return to normal.
  5. This extension supports undo operation. Press CTRL + Z to undo any deletes you make to the web page.

## Build
### Requirements
  * OS: Linux Mint 19 Tara x86_64 or Ubuntu 18.04.2 LTS (Bionic Beaver)
  * yarn v1.13.0
  * node v10.14.1

### Steps to build extension
  1. Install dependencies by running `yarn install`.
  2. Source code is available in src directory. src/index.js is the contentscript file and src/backgroud.js is background script file.
  3. The contentscript is built and can be found in dist folder as main.js. Background script does not go through build process and is used as is.
  4. Build the extension by running `npx webpack --watch`.
  5. The above command will build contentscript index.js in src folder and copy it to dist folder as main.js.

### Build script
  1. The build.sh script will automatically build the extension. Run './build.sh' to execute the build script.
