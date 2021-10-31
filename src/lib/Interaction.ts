import inquirer from "inquirer";

export const askFormQuestions = () => {
  const questions = [
    {
      name: "username",
      type: "input",
      message: "Enter your GitHub username or e-mail address:",
      validate: function (value: string | any[]) {
        if (value.length) {
          return true;
        } else {
          return "Please enter your username or e-mail address.";
        }
      },
    },
    {
      name: "password",
      type: "password",
      message: "Enter your password:",
      validate: function (value: string | any[]) {
        if (value.length) {
          return true;
        } else {
          return "Please enter your password.";
        }
      },
    },
  ];
  return inquirer.prompt(questions);
};

export const askQuestion: (
  question: inquirer.QuestionCollection<inquirer.Answers>
) => Promise<any> = (question) => inquirer.prompt(question);
