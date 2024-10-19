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

/***/ "./src/controllers/userControllers.ts":
/*!********************************************!*\
  !*** ./src/controllers/userControllers.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst usersModel_1 = __importDefault(__webpack_require__(/*! ../models/usersModel */ \"./src/models/usersModel.ts\"));\nconst interface_1 = __webpack_require__(/*! ../interface/interface */ \"./src/interface/interface.ts\");\nclass UserControllers {\n    constructor() {\n        this.command = new usersModel_1.default();\n    }\n    switchMethodUrl(request, response) {\n        const url = request.url || '';\n        if (url.startsWith(interface_1.UrlUsers.ALL)) {\n            switch (request.method) {\n                case interface_1.HttpMethod.GET:\n                    this.methodGet(request, response);\n                    break;\n                case interface_1.HttpMethod.POST:\n                    this.methodPost(request, response);\n                    break;\n                case interface_1.HttpMethod.PUT:\n                    this.methodPut(request, response);\n                    break;\n                case interface_1.HttpMethod.DELETE:\n                    this.methodDelete(request, response);\n                    break;\n                default:\n                    this.defaultMethod(request, response);\n                    break;\n            }\n        }\n    }\n    methodGet(request, response) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const url = request.url || '';\n            const id = url.split('/')[3] || '';\n            if ((url === interface_1.UrlUsers.ALL || url === interface_1.UrlUsers.ALL_ID) && id === '') {\n                const result = yield this.command.getAllUsers();\n                response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });\n                response.end(JSON.stringify(result.body));\n            }\n            else if (url.startsWith(interface_1.UrlUsers.ALL_ID) && id !== '') {\n                const result = yield this.command.getUserById(url.split('/')[3]);\n                response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });\n                response.end(JSON.stringify(result.body));\n            }\n        });\n    }\n    methodPost(request, response) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let body = '';\n            request.on('data', (chunk) => {\n                body += chunk.toString();\n            });\n            request.on('end', () => __awaiter(this, void 0, void 0, function* () {\n                var _a;\n                const id = ((_a = request.url) === null || _a === void 0 ? void 0 : _a.split('/')[3]) || '';\n                if (id !== '') {\n                    response.writeHead(interface_1.HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' });\n                    response.end(JSON.stringify({ error: interface_1.ErrorUser.INCORRECT_ID }));\n                }\n                else {\n                    const result = yield this.command.createUser(JSON.parse(body));\n                    response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });\n                    response.end(JSON.stringify(result.body));\n                }\n            }));\n        });\n    }\n    methodPut(request, response) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let body = '';\n            request.on('data', (chunk) => {\n                body += chunk.toString();\n            });\n            request.on('end', () => __awaiter(this, void 0, void 0, function* () {\n                var _a;\n                const userId = ((_a = request.url) === null || _a === void 0 ? void 0 : _a.split('/')[3]) || '';\n                const result = yield this.command.updateUser(userId, JSON.parse(body));\n                response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });\n                response.end(JSON.stringify(result.body));\n            }));\n            request.on('error', (error) => {\n                response.writeHead(interface_1.HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' });\n                response.end(JSON.stringify({ error: error.message }));\n            });\n        });\n    }\n    methodDelete(request, response) {\n        return __awaiter(this, void 0, void 0, function* () {\n            var _a;\n            const userId = ((_a = request.url) === null || _a === void 0 ? void 0 : _a.split('/')[3]) || '';\n            const result = yield this.command.deleteUser(userId);\n            response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });\n            response.end(JSON.stringify(result.body));\n        });\n    }\n    defaultMethod(request, response) {\n        response.writeHead(interface_1.HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' });\n        response.end(JSON.stringify({ error: interface_1.ErrorUser.INCORRECT_METHOD }));\n    }\n}\nconst userControllers = new UserControllers();\nexports[\"default\"] = userControllers;\n\n\n//# sourceURL=webpack://crud_api/./src/controllers/userControllers.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst userControllers_1 = __importDefault(__webpack_require__(/*! ./controllers/userControllers */ \"./src/controllers/userControllers.ts\"));\nconst interface_1 = __webpack_require__(/*! ./interface/interface */ \"./src/interface/interface.ts\");\ndotenv_1.default.config();\nconst PORT = \"4000\" || 0;\nconst server = http_1.default.createServer((req, res) => {\n    try {\n        const { url } = req;\n        const urlPath = url || '';\n        if (urlPath === '/') {\n            res.writeHead(200, { 'Content-Type': 'text/plain' });\n            res.end('Hello, World!');\n        }\n        else if (urlPath.startsWith('/api/users')) {\n            userControllers_1.default.switchMethodUrl(req, res);\n        }\n        else if (urlPath !== '/' && !urlPath.startsWith('/api/users')) {\n            res.writeHead(interface_1.HttpCode.NOT_FOUND, { 'Content-Type': 'application/json' });\n            res.end(JSON.stringify({ error: interface_1.ErrorUser.INCORRECT_ROUTE }));\n        }\n    }\n    catch (error) {\n        res.writeHead(interface_1.HttpCode.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });\n        res.end(JSON.stringify({ error: error.message }));\n        console.log(error);\n    }\n});\nserver.listen(PORT, () => {\n    console.log(`Server is running on port ${PORT}`);\n});\n\n\n//# sourceURL=webpack://crud_api/./src/index.ts?");

/***/ }),

/***/ "./src/interface/interface.ts":
/*!************************************!*\
  !*** ./src/interface/interface.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ErrorUser = exports.UrlUsers = exports.HttpCode = exports.HttpMethod = void 0;\nvar HttpMethod;\n(function (HttpMethod) {\n    HttpMethod[\"GET\"] = \"GET\";\n    HttpMethod[\"POST\"] = \"POST\";\n    HttpMethod[\"PUT\"] = \"PUT\";\n    HttpMethod[\"DELETE\"] = \"DELETE\";\n})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));\nvar HttpCode;\n(function (HttpCode) {\n    HttpCode[HttpCode[\"OK\"] = 200] = \"OK\";\n    HttpCode[HttpCode[\"CREATED\"] = 201] = \"CREATED\";\n    HttpCode[HttpCode[\"NO_CONTENT\"] = 204] = \"NO_CONTENT\";\n    HttpCode[HttpCode[\"BAD_REQUEST\"] = 400] = \"BAD_REQUEST\";\n    HttpCode[HttpCode[\"UNAUTHORIZED\"] = 401] = \"UNAUTHORIZED\";\n    HttpCode[HttpCode[\"NOT_FOUND\"] = 404] = \"NOT_FOUND\";\n    HttpCode[HttpCode[\"INTERNAL_SERVER_ERROR\"] = 500] = \"INTERNAL_SERVER_ERROR\";\n})(HttpCode || (exports.HttpCode = HttpCode = {}));\nvar UrlUsers;\n(function (UrlUsers) {\n    UrlUsers[\"ALL\"] = \"/api/users\";\n    UrlUsers[\"ALL_ID\"] = \"/api/users/\";\n})(UrlUsers || (exports.UrlUsers = UrlUsers = {}));\nvar ErrorUser;\n(function (ErrorUser) {\n    ErrorUser[\"USER_NOT_FOUND\"] = \"User not found\";\n    ErrorUser[\"USER_NOT_SAVED\"] = \"USER_NOT_SAVED\";\n    ErrorUser[\"USER_NOT_UPDATED\"] = \"USER_NOT_UPDATED\";\n    ErrorUser[\"INCORRECT_ID\"] = \"incorrect user id\";\n    ErrorUser[\"INCORRECT_TYPE\"] = \"incorrect user type or missing fields\";\n    ErrorUser[\"INCORRECT_ROUTE\"] = \"incorrect route use /api/users or /api/users/:id\";\n    ErrorUser[\"INCORRECT_METHOD\"] = \"incorrect method use GET, POST, PUT or DELETE\";\n})(ErrorUser || (exports.ErrorUser = ErrorUser = {}));\n\n\n//# sourceURL=webpack://crud_api/./src/interface/interface.ts?");

/***/ }),

/***/ "./src/models/usersModel.ts":
/*!**********************************!*\
  !*** ./src/models/usersModel.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst users_json_1 = __importDefault(__webpack_require__(/*! ../data/users.json */ \"./src/data/users.json\"));\nconst interface_1 = __webpack_require__(/*! ../interface/interface */ \"./src/interface/interface.ts\");\nconst uuid_1 = __webpack_require__(/*! uuid */ \"uuid\");\nclass UsersModel {\n    constructor() {\n        this.users = users_json_1.default || [];\n    }\n    getAllUsers() {\n        return Promise.resolve({ statusCode: interface_1.HttpCode.OK, body: this.users });\n    }\n    getUserById(userId) {\n        if ((0, uuid_1.validate)(userId)) {\n            const user = this.users.find((user) => user.id === userId);\n            if (user) {\n                return Promise.resolve({ statusCode: interface_1.HttpCode.OK, body: user });\n            }\n            else {\n                return Promise.resolve({\n                    statusCode: interface_1.HttpCode.NOT_FOUND,\n                    body: { error: interface_1.ErrorUser.USER_NOT_FOUND },\n                });\n            }\n        }\n        else {\n            return Promise.resolve({\n                statusCode: interface_1.HttpCode.BAD_REQUEST,\n                body: { error: interface_1.ErrorUser.INCORRECT_ID },\n            });\n        }\n    }\n    checkUserType(user) {\n        if (user && typeof user === 'object') {\n            if ('username' in user && 'age' in user && 'hobbies' in user) {\n                if (typeof user.username === 'string' &&\n                    typeof user.age === 'number' &&\n                    Array.isArray(user.hobbies)) {\n                    if (user.hobbies.every((hobby) => typeof hobby === 'string')) {\n                        return true;\n                    }\n                    else {\n                        return false;\n                    }\n                }\n                else {\n                    return false;\n                }\n            }\n        }\n        return false;\n    }\n    createUser(user) {\n        if (this.checkUserType(user)) {\n            const userCreated = user;\n            const newUser = Object.assign(Object.assign({}, userCreated), { id: (0, uuid_1.v4)() });\n            this.users.push(newUser);\n            return Promise.resolve({ statusCode: interface_1.HttpCode.CREATED, body: newUser });\n        }\n        else {\n            return Promise.resolve({\n                statusCode: interface_1.HttpCode.BAD_REQUEST,\n                body: { error: interface_1.ErrorUser.INCORRECT_TYPE },\n            });\n        }\n    }\n    updateUser(userId, user) {\n        if ((0, uuid_1.validate)(userId)) {\n            if (this.checkUserType(user)) {\n                const userUpdated = user;\n                const index = this.users.findIndex((user) => user.id === userId);\n                if (index !== -1) {\n                    this.users[index] = Object.assign({ id: this.users[index].id }, userUpdated);\n                    return Promise.resolve({\n                        statusCode: interface_1.HttpCode.OK,\n                        body: this.users[index],\n                    });\n                }\n                else {\n                    return Promise.resolve({\n                        statusCode: interface_1.HttpCode.NOT_FOUND,\n                        body: { error: interface_1.ErrorUser.USER_NOT_FOUND },\n                    });\n                }\n            }\n            else {\n                return Promise.resolve({\n                    statusCode: interface_1.HttpCode.BAD_REQUEST,\n                    body: { error: interface_1.ErrorUser.INCORRECT_TYPE },\n                });\n            }\n        }\n        return Promise.resolve({\n            statusCode: interface_1.HttpCode.BAD_REQUEST,\n            body: { error: interface_1.ErrorUser.INCORRECT_ID },\n        });\n    }\n    deleteUser(userId) {\n        if ((0, uuid_1.validate)(userId)) {\n            const index = this.users.findIndex((user) => user.id === userId);\n            if (index !== -1) {\n                this.users.splice(index, 1);\n                return Promise.resolve({\n                    statusCode: interface_1.HttpCode.NO_CONTENT,\n                    body: { message: 'User deleted successfully' },\n                });\n            }\n            else {\n                return Promise.resolve({\n                    statusCode: interface_1.HttpCode.NOT_FOUND,\n                    body: { error: interface_1.ErrorUser.USER_NOT_FOUND },\n                });\n            }\n        }\n        else {\n            return Promise.resolve({\n                statusCode: interface_1.HttpCode.BAD_REQUEST,\n                body: { error: interface_1.ErrorUser.INCORRECT_ID },\n            });\n        }\n    }\n}\nexports[\"default\"] = UsersModel;\n\n\n//# sourceURL=webpack://crud_api/./src/models/usersModel.ts?");

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

/***/ }),

/***/ "./src/data/users.json":
/*!*****************************!*\
  !*** ./src/data/users.json ***!
  \*****************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('[{\"id\":\"4833004d-f79d-48d1-b19f-09e498cd4497\",\"username\":\"admin\",\"age\":20,\"hobbies\":[\"Sports\",\"Cooking\"]},{\"id\":\"6fa98b58-c68f-4f4f-8ea2-d309d3a4f477\",\"username\":\"admin2\",\"age\":20,\"hobbies\":[\"Sports\",\"Cooking\"]}]');\n\n//# sourceURL=webpack://crud_api/./src/data/users.json?");

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