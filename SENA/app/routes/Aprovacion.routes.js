module.exports = app =>{
    const aprovacion = require("../controllers/Aprovacion.controller.js");

    app.post("/aprovaciones",aprovacion.create);

    app.get("/aprovaciones",aprovacion.findAll);

    app.get("/aprovaciones/:aprovacionId",aprovacion.findOne);

    app.put("/aprovaciones/:aprovacionId",aprovacion.update);

    app.delete("/aprovaciones/:aprovacionId",aprovacion.delete);

    app.delete("/aprovaciones",aprovacion.deleteAll);
}