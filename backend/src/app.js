const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    name: "Lucas",
    telefone: "(51) 9 92226056",
  });
});

app.listen(3333);
