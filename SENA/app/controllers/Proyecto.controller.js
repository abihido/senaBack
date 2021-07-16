const Proyecto = require("../models/Proyecto.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const ProyectoC = new Proyecto({
        name : req.body.name,
        avatar :req.body.avatar,
        ciudad: req.body.ciudad,
        requisitos : req.body.requisitos,
        descripcion : req.body.descripcion,
        active : req.body.active,
        categoria : req.body.categoria,
        idOrganizacion : req.body.idOrganizacion
    });

    Proyecto.create(ProyectoC,(err,data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });       
        }
        else{ res.send(data);}
    });
};

exports.findAll = (req,res) => {
    Proyecto.getAll((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Algo no sirvio"
            });
        }
        else res.send(data);
    })
};

exports.findOne = (req,res) => {
    Proyecto.findById(req.params.proyectoId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el proyecto con id ${req.params.proyectoId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.proyectoId
                });
            }
        } else res.send(data);
    });
};

exports.findByCategoria = (req,res) => {
    Proyecto.findByCategoria(req.params.categoria, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el proyecto con categoria ${req.params.categoria}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.proyectoId
                });
            }
        } else res.send(data);
    });
};

exports.findOneByN = (req,res) => {
    Proyecto.findByName(req.params.name, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el proyecto con el nombre ${req.params.name}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el nombre "+req.params.name
                });
            }
        } else res.send(data);
    });
};
exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    Proyecto.updateById(
        req.params.proyectoId,
        new Proyecto(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Proyecto con la id ${req.params.proyectoId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Proyecto con id"+ req.params.proyectoId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Proyecto.remove(req.params.proyectoId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Proyecto con la id ${req.params.proyectoId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Proyecto con id"+ req.params.proyectoId
                 });
             }
        }else res.send({ message: `El proyecto fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Proyecto.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los proyectos"
            });
        }
        else res.send({
            message: "todos los proyectos fueron borrados"
        });
    });
};

