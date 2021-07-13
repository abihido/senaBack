module.exports = app =>{
    const financiacion = require("../controllers/Financiacion.controller.js");

    app.post("/financiaciones",financiacion.create);

    app.get("/financiaciones",financiacion.findAll);

    app.get("/financiaciones/:financiacionId",financiacion.findOne);

    app.put("/financiaciones/:financiacionId",financiacion.update);

    app.delete("/financiaciones/:financiacionId",financiacion.delete);

    app.delete("/financiaciones",financiacion.deleteAll);
}