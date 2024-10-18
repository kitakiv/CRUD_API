/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst uuid_1 = __webpack_require__(/*! uuid */ \"uuid\");\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\ndotenv_1.default.config();\nconst PORT = \"3000\" || 0;\nconst server = http_1.default.createServer((req, res) => {\n    const { method, url } = req;\n    if (url === '/') {\n        res.writeHead(200, { 'Content-Type': 'text/plain' });\n        res.end('Hello, World!');\n    }\n    // Example route for fetching items\n    else if (url === '/items' && method === 'GET') {\n        const items = [\n            { id: (0, uuid_1.v4)(), name: 'Item 1' },\n            { id: (0, uuid_1.v4)(), name: 'Item 2' },\n        ];\n        res.writeHead(200, { 'Content-Type': 'application/json' });\n        res.end(JSON.stringify(items));\n    }\n    else {\n        res.writeHead(404, { 'Content-Type': 'text/plain' });\n        res.end('404 Not Found');\n    }\n});\nserver.listen(PORT, () => {\n    console.log(`Server is running on port ${PORT}`);\n});\n\n\n//# sourceURL=webpack://crud_api/./src/index.ts?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;