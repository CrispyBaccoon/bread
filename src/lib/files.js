"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.appendFile = exports.readFile = exports.createFile = exports.returnFiles = exports.createDirectory = exports.pathExists = exports.getCurrentDirectoryBase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getCurrentDirectoryBase = () => {
    return path_1.default.basename(process.cwd());
};
exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
const pathExists = (filePath) => {
    return fs_1.default.existsSync(filePath);
};
exports.pathExists = pathExists;
const createDirectory = (filePath) => {
    return fs_1.default.mkdirSync(filePath);
};
exports.createDirectory = createDirectory;
const returnFiles = (filePath) => {
    if ((0, exports.pathExists)(filePath)) {
        return fs_1.default.readdirSync(filePath);
    }
};
exports.returnFiles = returnFiles;
const createFile = (filePath) => {
    fs_1.default.appendFileSync(filePath, "");
};
exports.createFile = createFile;
const readFile = (filePath) => {
    if ((0, exports.pathExists)(filePath)) {
        return fs_1.default.readFileSync(filePath, "utf-8");
    }
};
exports.readFile = readFile;
const appendFile = (filePath, data) => {
    fs_1.default.appendFileSync(filePath, data);
};
exports.appendFile = appendFile;
const writeFile = (filePath, data) => {
    fs_1.default.writeFileSync(filePath, data);
};
exports.writeFile = writeFile;
