"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const inquirer_1 = __importDefault(require("inquirer"));
class CLI {
    constructor() {
        this.clear = () => {
            (0, clear_1.default)();
        };
        this.ConsoleLogo = () => {
            console.log(chalk_1.default.yellow(figlet_1.default.textSync("Bread", { horizontalLayout: "full" })));
        };
        this.sendInfoMessage = (str) => {
            console.log(chalk_1.default.red("! ") + chalk_1.default.yellow(str));
        };
        this.SendBoolQuestion = (question, name) => {
            const Answer = new Promise((resolve, reject) => {
                inquirer_1.default
                    .prompt({
                    name: name ? name : "boolQuestion",
                    type: "confirm",
                    message: question,
                    default: "y",
                })
                    .then((answers) => {
                    resolve(answers[name ? name : "boolQuestion"]);
                })
                    .catch((error) => {
                    if (error.isTtyError) {
                        console.log("Prompt couldn't be rendered in the current environment");
                    }
                    else {
                        console.log(error);
                    }
                });
            });
            return Answer;
        };
        this.ShowNonInterActiveList = (list) => {
            list.map((item) => {
                console.log(chalk_1.default.white("* ") + chalk_1.default.cyan(item));
            });
        };
        this.ShowNonInterActiveCheckBoxList = (breadcrumbs) => {
            breadcrumbs.map((crumb) => {
                if (crumb.done) {
                    console.log(chalk_1.default.green("[*] ") + crumb.name);
                }
                else {
                    console.log(chalk_1.default.white("[ ] ") + crumb.name);
                }
            });
        };
    }
}
exports.default = CLI;
