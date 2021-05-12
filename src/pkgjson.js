import fs from "fs";
const path = require("path");
import {exec} from "child_process";

export function getPath() {
  if (process.env.JEST_WORKER_ID) {
    return path.resolve(process.cwd(), './test/package.json');
  }
  return path.resolve(process.cwd(), './package.json');
}

export function read() {
  const package_json_path = getPath();
  const raw_package_json = fs.readFileSync(package_json_path, { encoding: 'utf8'});
  return JSON.parse(raw_package_json);
}

export function getPatch() {
  return read().version.split(".").pop();
}

export function getVersion() {
  return read().version;
}

export function setVersion(version) {
  return new Promise((resolve, reject) => {
    const prefix = process.env.JEST_WORKER_ID ? "./test/" : "./"
    exec(`npm version ${version} --no-git-tag-version --prefix ${prefix}`, (error, stdout) => {
      if (error) { reject(error); }
      resolve(stdout);
    })
  })
}

export default {
  getPath,
  read,
  getPatch,
  getVersion,
  setVersion,
}
