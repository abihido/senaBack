module.exports = app =>{
    const proyecto = require("../controllers/Proyecto.controller.js");

    app.post("/proyectos",proyecto.create);

    app.get("/proyectos",proyecto.findAll);

    app.get("/proyectos/ByName/:name",proyecto.findOneByN);
    
    app.get("/proyectos/ByCat/:categoria",proyecto.findByCategoria);

    app.get("/proyectos/:proyectoId",proyecto.findOne);

    app.put("/proyectos/:proyectoId",proyecto.update);

    app.delete("/proyectos/:proyectoId",proyecto.delete);

    app.delete("/proyectos",proyecto.deleteAll);
}