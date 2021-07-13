module.exports = app =>{
    const afiliacion = require("../controllers/Afiliacion.controller.js");

    app.post("/afiliaciones",afiliacion.create);

    app.get("/afiliaciones",afiliacion.findAll);

    app.get("/afiliaciones/:afiliacionId",afiliacion.findOne);

    app.put("/afiliaciones/:afiliacionId",afiliacion.update);

    app.delete("/afiliaciones/:afiliacionId",afiliacion.delete);

    app.delete("/afiliaciones",afiliacion.deleteAll);
}