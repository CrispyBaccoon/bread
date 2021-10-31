import fs from "fs";
import path from "path";

export const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

export const pathExists = (filePath: string) => {
  return fs.existsSync(filePath);
};

export const createDirectory = (filePath: string) => {
  return fs.mkdirSync(filePath);
};

export const returnFiles = (filePath: string) => {
  if (pathExists(filePath)) {
    return fs.readdirSync(filePath);
  }
};

export const createFile = (filePath: string) => {
  fs.appendFileSync(filePath, "");
};

export const readFile = (filePath: string) => {
  if (pathExists(filePath)) {
    return fs.readFileSync(filePath, "utf-8");
  }
};

export const appendFile = (filePath: string, data: string) => {
  fs.appendFileSync(filePath, data);
};

export const writeFile = (filePath: string, data: string) => {
  fs.writeFileSync(filePath, data);
};
