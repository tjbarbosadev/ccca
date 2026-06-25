import axios from "axios";

test("Should create an account", async () => {
  const input = {
    name: "John Doe",
    document: "87507400085",
    email: "john.doe@example.com",
    password: "password123",
  };

  const response = await axios.post("http://localhost:3000/signup", input);
  expect(response.status).toBe(201);
  const output = response.data;
  expect(output.accountId).toBeDefined();

  const responseAccount = await axios.get(
    `http://localhost:3000/accounts/${output.accountId}`,
  );
  expect(responseAccount.status).toBe(200);
  const accountData = responseAccount.data;
  expect(accountData.name).toBe(input.name);
  expect(accountData.document).toBe(input.document);
  expect(accountData.email).toBe(input.email);
});
