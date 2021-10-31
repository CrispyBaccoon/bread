import chalk, { ColorSupport } from "chalk";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";
import { askQuestion } from "./lib/Interaction";

export default class CLI {
  constructor() {}
  clear = () => {
    clear();
  };
  ConsoleLogo = () => {
    console.log(
      chalk.yellow(figlet.textSync("Bread", { horizontalLayout: "full" }))
    );
  };
  sendInfoMessage: (str: string) => void = (str) => {
    console.log(chalk.red("! ") + chalk.yellow(str));
  };

  SendBoolQuestion = (question: string, name?: string) => {
    const Answer = new Promise((resolve, reject) => {
      inquirer
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
            console.log(
              "Prompt couldn't be rendered in the current environment"
            );
          } else {
            console.log(error);
          }
        });
    });
    return Answer;
  };

  ShowNonInterActiveList = (list: string[]) => {
    list.map((item) => {
      console.log(chalk.white("* ") + chalk.cyan(item));
    });
  };
  ShowNonInterActiveCheckBoxList = (breadcrumbs: crumb[]) => {
    breadcrumbs.map((crumb) => {
      if (crumb.done) {
        console.log(chalk.green("[*] ") + crumb.name);
      } else {
        console.log(chalk.white("[ ] ") + crumb.name);
      }
    });
  };
}
