const CPF_LENGTH = 11;

export function validateCpf(cpf: string | null | undefined): boolean {
  if (!cpf) return false;
  cpf = cleanCpf(cpf);
  if (cpf.length !== 11) return false;
  if (allTheSame(cpf)) return false;
  const digit1 = calculateDigit(cpf, 10);
  const digit2 = calculateDigit(cpf, 11);
  return extractDigit(cpf) === `${digit1}${digit2}`;
}

function cleanCpf(cpf: string) {
  return cpf.replace(/[^\d]+/g, "");
}

function allTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return [...cpf].every((digit) => digit === firstDigit);
}

function extractDigit(cpf: string) {
  return cpf.slice(9);
}

function calculateDigit(cpf: string, factor: number) {
  let sum = 0;
  for (const digit of cpf) {
    if (factor > 1) sum += Number(digit) * factor--;
  }
  const rest = sum % CPF_LENGTH;
  return rest < 2 ? "0" : String(CPF_LENGTH - rest);
}
