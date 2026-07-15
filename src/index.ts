import {app} from "./app.js";
const port = process.env.PORT || 8989;

// Rodar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});         