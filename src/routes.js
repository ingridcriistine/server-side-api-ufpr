const { Router } = require("express");

const routes = Router();

routes.get("/", (request, response) => {
  console.log(request.query);
  response.json({ message: "Professor Lucas" });
});

//rota "/users" - TIPO POST
routes.post("/users", (request, response) => {
  console.log(request.body);
  response.json({ message: "Rota /users METODO POST" });
});

module.exports = routes;
