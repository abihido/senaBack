module.exports = app =>{
    const cliente = require("../controllers/Cliente.controller.js");

    app.post("/clientes",cliente.create);

    app.get("/clientes",cliente.findAll);

    app.get("/clientes/:clienteId",cliente.findOne);

    app.get("/clientes/login/:mail/:password",cliente.confirm);

    app.put("/clientes/:clienteId",cliente.update);

    app.delete("/clientes/:clienteId",cliente.delete);

    app.delete("/clientes",cliente.deleteAll);
}