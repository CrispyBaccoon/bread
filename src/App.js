"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const files = __importStar(require("./lib/files"));
// import Configstore from "configstore";
const CLI_1 = __importDefault(require("./CLI"));
const conf_1 = __importDefault(require("./lib/conf"));
const inquirer_1 = __importDefault(require("inquirer"));
// const conf = new Configstore("bread");
class App {
    constructor() {
        // Properties
        // Functions
        this.Run = () => __awaiter(this, void 0, void 0, function* () {
            this.cli.ConsoleLogo();
            if (!this.CheckForBread()) {
                this.cli.sendInfoMessage("No Bread Module Found in this Directory!");
                const CreateModuleBool = yield this.cli.SendBoolQuestion("Do You want to add a Bread Module?");
                if (CreateModuleBool) {
                    (() => __awaiter(this, void 0, void 0, function* () {
                        this.CreateBreadModule();
                    }))();
                }
                else {
                    process.exit();
                }
            }
            this.AddBreadCrumb("hi");
            this.AddBreadCrumb("hii");
            this.AddBreadCrumb("hi");
            this.test_ToggleSolveBreadCrumb("hii");
            this.DisplayBreadCrumbs();
            this.RunOption();
        });
        // Backend
        this.CheckForBread = () => files.pathExists(".bread");
        this.CreateBreadModule = () => {
            files.createDirectory(".bread");
            files.createFile(".bread/breadcrumbs.json");
            this.conf.UpdateConfig();
            this.conf.fillConfig();
        };
        this.ReturnBreadFiles = () => files.returnFiles(".bread");
        this.MarkDone = (name) => {
            this.conf.Mark(name, true);
        };
        this.MarkUnDone = (name) => {
            this.conf.Mark(name, false);
        };
        // Frontend
        this.DisplayBreadCrumbs = () => {
            this.cli.ShowNonInterActiveCheckBoxList(this.conf.returnBreadCrumbs());
        };
        this.Options = [
            "Display BreadCrumbs",
            new inquirer_1.default.Separator(),
            "Add BreadCrumb",
            "Solve BreadCrumbs",
        ];
        this.DisplayOptions = () => __awaiter(this, void 0, void 0, function* () {
            const Answer = new Promise((resolve, reject) => {
                inquirer_1.default
                    .prompt({
                    name: "OptionsList",
                    type: "list",
                    message: "What do you want to do?",
                    choices: this.Options,
                    default: 0,
                })
                    .then((answers) => {
                    resolve(answers.OptionsList);
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
            return (yield Answer);
        });
        this.RunOption = () => __awaiter(this, void 0, void 0, function* () {
            this.cli.clear();
            var answer = yield this.DisplayOptions();
            switch (answer) {
                case "Display BreadCrumbs": {
                    this.DisplayBreadCrumbs();
                    break;
                }
                case "Add BreadCrumb": {
                    yield this.PromptAddBreadCrumb();
                    break;
                }
                case "Solve BreadCrumbs": {
                    yield this.PromptSolveBreadCrumbs().then(() => {
                        return;
                    });
                    break;
                }
                default: {
                    // this.RunOption();
                    break;
                }
            }
        });
        this.PromptAddBreadCrumb = () => __awaiter(this, void 0, void 0, function* () {
            const Answer = new Promise((resolve, reject) => {
                inquirer_1.default
                    .prompt({
                    name: "BreadCrumbName",
                    type: "input",
                    message: "What would you like to call your breadcrumb?",
                })
                    .then((answers) => {
                    resolve(answers.BreadCrumbName);
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
            this.AddBreadCrumb(yield Answer);
        });
        this.PromptSolveBreadCrumbs = () => __awaiter(this, void 0, void 0, function* () {
            const Answer = new Promise((resolve, reject) => {
                inquirer_1.default
                    .prompt({
                    name: "SolveStates",
                    type: "checkbox",
                    message: "Check the boxes to mark them as done",
                    choices: [
                        new inquirer_1.default.Separator(" = Your Breadcrumbs = "),
                        ...(() => {
                            const breadcrumbs = this.conf.returnBreadCrumbs();
                            var choices = [];
                            breadcrumbs.map((crumb) => choices.push({ name: crumb.name, checked: crumb.done }));
                            return choices;
                        })(),
                    ],
                })
                    .then((answers) => {
                    resolve(answers.SolveStates);
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
            const solved = (yield Answer);
            const breadcrumbs = this.conf.returnBreadCrumbs();
            const nextBreadCrumbs = breadcrumbs.map((crumb) => {
                if (solved.filter((solv) => solv == crumb.name).length > 0) {
                    crumb.done = true;
                }
                else {
                    crumb.done = false;
                }
                return crumb;
            });
            this.conf.config.crumbs = nextBreadCrumbs;
            this.conf.UpdateConf();
        });
        // Testing
        this.AddBreadCrumb = (name) => {
            this.conf.AddBreadCrumb({ name: name, done: false });
        };
        this.test_ToggleSolveBreadCrumb = (name) => {
            this.conf.ToggleSolveBreadCrumb(name);
        };
        this.conf = new conf_1.default();
        this.cli = new CLI_1.default();
        this.cli.clear();
    }
}
exports.default = App;
