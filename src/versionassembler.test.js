import versionAssembler from "./versionassembler";
import mockDate from "mockdate";

const mockTimestamp = 1620814490901;
mockDate.set(mockTimestamp);

const cases = [
  ['V.yyyy.MM', true, '3.2021.05'],
  ['V.yyyy.MM.P', false, '3.2021.05.1'],
  ['V.yyyy.MM.P', true, '3.2021.05.2'],
  ['V.yyyy.P', true, '3.2021.2'],
  ['yyyy.MM.P', true, '2021.05.2'],
  ['V.yyMM.P', true, '3.2105.2'],
  ['V.yy.QQ.P', true, '3.21.02.2'],
]
const V = 3;

describe("Ensure mock environment", () => {
  test("MockDate works", () => {
    expect(new Date().getTime()).toBe(mockTimestamp);
  })
})

describe("Test different version strings", () => {
  test.each(cases)(`Given schema=%p and V=${V}, generates version=%p`, (schema, increasePatch, outcome) => {
    const version = versionAssembler(schema, V, increasePatch);
    expect(version).toBe(outcome);
  })
})
