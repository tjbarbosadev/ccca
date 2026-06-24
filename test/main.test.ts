import { somar } from "../src/main.js";

test("somar 2 + 2 deve retornar 4", () => {
  const result = somar(2, 2);
  expect(result).toBe(4);
});
