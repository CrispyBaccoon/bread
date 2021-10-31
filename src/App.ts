import * as files from "./lib/files";
// import Configstore from "configstore";
import CLI from "./CLI";
import Conf from "./lib/conf";
import inquirer, { InputQuestion } from "inquirer";
import { textChangeRangeIsUnchanged } from "typescript";
// const conf = new Configstore("bread");

export default class App {
  constructor() {
    this.conf = new Conf();
    this.cli = new CLI();
    this.cli.clear();
  }
  // Objects
  cli: CLI;
  conf: Conf;
  // Properties
  // Functions
  Run = async () => {
    this.cli.ConsoleLogo();
    if (!this.CheckForBread()) {
      this.cli.sendInfoMessage("No Bread Module Found in this Directory!");

      const CreateModuleBool: boolean | unknown =
        await this.cli.SendBoolQuestion("Do You want to add a Bread Module?");
      if (CreateModuleBool) {
        (async () => {
          this.CreateBreadModule();
        })();
      } else {
        process.exit();
      }
    }

    this.AddBreadCrumb("hi");
    this.AddBreadCrumb("hii");
    this.AddBreadCrumb("hi");

    this.test_ToggleSolveBreadCrumb("hii");

    this.DisplayBreadCrumbs();

    this.RunOption();
  };

  // Backend
  CheckForBread = () => files.pathExists(".bread");
  CreateBreadModule = () => {
    files.createDirectory(".bread");
    files.createFile(".bread/breadcrumbs.json");
    this.conf.UpdateConfig();
    this.conf.fillConfig();
  };
  ReturnBreadFiles = () => files.returnFiles(".bread");
  MarkDone = (name: string) => {
    this.conf.Mark(name, true);
  };
  MarkUnDone = (name: string) => {
    this.conf.Mark(name, false);
  };

  // Frontend
  DisplayBreadCrumbs = () => {
    this.cli.ShowNonInterActiveCheckBoxList(
      this.conf.returnBreadCrumbs() as crumb[]
    );
  };
  Options = [
    "Display BreadCrumbs",
    new inquirer.Separator(),
    "Add BreadCrumb",
    "Solve BreadCrumbs",
  ];
  DisplayOptions = async () => {
    const Answer: Promise<string> = new Promise((resolve, reject) => {
      inquirer
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
            console.log(
              "Prompt couldn't be rendered in the current environment"
            );
          } else {
            console.log(error);
          }
        });
    });
    return (await Answer) as string;
  };
  RunOption = async () => {
    this.cli.clear();
    var answer: string = await this.DisplayOptions();
    switch (answer) {
      case "Display BreadCrumbs": {
        this.DisplayBreadCrumbs();
        break;
      }
      case "Add BreadCrumb": {
        await this.PromptAddBreadCrumb();
        break;
      }
      case "Solve BreadCrumbs": {
        await this.PromptSolveBreadCrumbs().then(() => {
          return;
        });
        break;
      }
      default: {
        // this.RunOption();
        break;
      }
    }
  };
  PromptAddBreadCrumb = async () => {
    const Answer: Promise<string> = new Promise((resolve, reject) => {
      inquirer
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
            console.log(
              "Prompt couldn't be rendered in the current environment"
            );
          } else {
            console.log(error);
          }
        });
    });
    this.AddBreadCrumb(await Answer);
  };
  PromptSolveBreadCrumbs = async () => {
    const Answer = new Promise((resolve, reject) => {
      inquirer
        .prompt({
          name: "SolveStates",
          type: "checkbox",
          message: "Check the boxes to mark them as done",
          choices: [
            new inquirer.Separator(" = Your Breadcrumbs = "),
            ...(() => {
              const breadcrumbs = this.conf.returnBreadCrumbs() as crumb[];
              var choices: { name: string; checked: boolean }[] = [];
              breadcrumbs.map((crumb) =>
                choices.push({ name: crumb.name, checked: crumb.done })
              );
              return choices;
            })(),
          ],
        })
        .then((answers) => {
          resolve(answers.SolveStates);
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log(
              "Prompt couldn't be rendered in the current environment"
            );
          } else {
            console.log(error);
          }
        });
    });
    const solved: string[] = (await Answer) as string[];
    const breadcrumbs: crumb[] = this.conf.returnBreadCrumbs() as crumb[];
    const nextBreadCrumbs: crumb[] = breadcrumbs.map((crumb) => {
      if (solved.filter((solv) => solv == crumb.name).length > 0) {
        crumb.done = true;
      } else {
        crumb.done = false;
      }
      return crumb;
    });
    this.conf.config.crumbs = nextBreadCrumbs;

    this.conf.UpdateConf();
  };

  // Testing
  AddBreadCrumb = (name: string) => {
    this.conf.AddBreadCrumb({ name: name, done: false });
  };
  test_ToggleSolveBreadCrumb = (name: string) => {
    this.conf.ToggleSolveBreadCrumb(name);
  };
}
