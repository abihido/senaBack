module.exports = app =>{
    const foto = require("../controllers/Foto.controller.js");

    app.post("/fotos",foto.create);

    app.get("/fotos",foto.findAll);

    app.get("/fotos/:fotoId",foto.findOne);
    
    app.get("/fotos/ByP/:proyectoId",foto.findByProject);

    app.put("/fotos/:fotoId",foto.update);

    app.delete("/fotos/:fotoId",foto.delete);

    app.delete("/fotos",foto.deleteAll);
}