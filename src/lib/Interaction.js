"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = exports.askFormQuestions = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const askFormQuestions = () => {
    const questions = [
        {
            name: "username",
            type: "input",
            message: "Enter your GitHub username or e-mail address:",
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return "Please enter your username or e-mail address.";
                }
            },
        },
        {
            name: "password",
            type: "password",
            message: "Enter your password:",
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return "Please enter your password.";
                }
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
exports.askFormQuestions = askFormQuestions;
const askQuestion = (question) => inquirer_1.default.prompt(question);
exports.askQuestion = askQuestion;
