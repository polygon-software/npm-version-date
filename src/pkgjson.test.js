import pkg from "../test/package.json";
import pkgJson from "./pkgjson.js";

let initialVersion = pkg.version;

function randInt(max=1000) {
  return Math.floor(Math.random() * max);
}

afterAll(() => {
  return pkgJson.setVersion(initialVersion);
})

test("Reading the package json", () => {
  expect(pkg.version).toBe(pkgJson.getVersion());
})

test("Setting node version", async () => {
  const random_version = `${randInt()}.${randInt()}.${randInt()}`

  const pkg_version_before = pkgJson.getVersion();
  await pkgJson.setVersion(random_version);
  const pkg_version_after = pkgJson.getVersion();

  expect(pkg_version_before).not.toEqual(pkg_version_after);
  expect(pkg_version_after).toBe(random_version);
})
