module.exports = app =>{
    const solicitud = require("../controllers/Solicitud.controller.js");

    app.post("/solicitudes",solicitud.create);

    app.get("/solicitudes",solicitud.findAll);

    app.get("/solicitudes/:solicitudId",solicitud.findOne);

    app.put("/solicitudes/:solicitudId",solicitud.update);

    app.delete("/solicitudes/:solicitudId",solicitud.delete);

    app.delete("/solicitudes",solicitud.deleteAll);
}