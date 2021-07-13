module.exports = app =>{
    const organizacion = require("../controllers/Organizacion.controller.js");

    app.post("/organizaciones",organizacion.create);

    app.get("/organizaciones",organizacion.findAll);

    app.get("/organizaciones/:organizacionId",organizacion.findOne);

    app.put("/organizaciones/:organizacionId",organizacion.update);

    app.delete("/organizaciones/:organizacionId",organizacion.delete);

    app.delete("/organizaciones",organizacion.deleteAll);
}