import core from "@actions/core";
import versionAssembler from "./versionassembler.js"
import pkgjson from "./pkgjson.js";

(function run() {
  const V = core.getInput("V");
  const schema = core.getInput("schema");
  const increasePatch = core.getInput("increase-patch").toLowerCase() === 'true';

  const versionString = versionAssembler(schema, V, increasePatch);
  return pkgjson.setVersion(versionString)
    .catch((error) => {
      core.setFailed(error);
    });
})()
