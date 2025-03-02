import { execSync } from "child_process";

describe("Shibbir CLI Greeting", () => {
  test("should print the correct output", () => {
    const output = execSync("node dist/index.js").toString().trim();
    expect(output).toBe("Greeting from Shibbir's CLI!");
  });
});
