import { validateCpf } from "../src/validateCpf.js";

test.each(["87507400085", "91126693006", "58689464050"])(
  "should validate a valid CPF %s",
  (validCpf) => {
    // when/act
    const isValid = validateCpf(validCpf);

    // then/assert
    expect(isValid).toBe(true);
  },
);

test.each(["87507400086", "91126693007", "58689464051", null, undefined])(
  "should invalidate an invalid CPF %s",
  (invalidCpf) => {
    // when/act
    const isValid = validateCpf(invalidCpf);

    // then/assert
    expect(isValid).toBe(false);
  },
);
