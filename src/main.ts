import express from "express";
import pgp from "pg-promise";

async function main() {
  const connectionString = "postgres://postgres:123456@localhost:5432/app";
  const connection = pgp()(connectionString);

  const app = express();
  app.use(express.json());

  app.post("/signup", async (req, res) => {
    // Simulate account creation logic
    const accountId = crypto.randomUUID(); // Generate a random account ID

    await connection.query(
      "INSERT INTO ccca.account (account_id, name, document, email, password) VALUES ($1, $2, $3, $4, $5)",
      [
        accountId,
        req.body.name,
        req.body.document,
        req.body.email,
        req.body.password,
      ],
    );

    res.status(201).json({ accountId });
  });

  app.get("/accounts/:accountId", async (req, res) => {
    const { accountId } = req.params;

    // Simulate fetching account data logic
    const [account] = await connection.query(
      "SELECT account_id, name, document, email FROM ccca.account WHERE account_id = $1",
      [accountId],
    );

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const accountData = {
      accountId: account.account_id,
      name: account.name,
      document: account.document,
      email: account.email,
    };

    res.status(200).json(accountData);
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main().catch((err) => {
  console.error("Error starting the application:", err);
});
