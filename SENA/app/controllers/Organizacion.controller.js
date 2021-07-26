const Organizacion = require("../models/Organizacion.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const OrganizacionC = new Organizacion({
        name : req.body.name,
        avatar :req.body.avatar,
        celular: req.body.celular,
        direccion: req.body.direccion,
        descripcion : req.body.descripcion,
        palabrasClave : req.body.palabrasClave
    });

    Organizacion.create(OrganizacionC,(err,data) => {
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
    Organizacion.getAll((err,data) =>{
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
    Organizacion.findById(req.params.organizacionId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el organizacion con id ${req.params.organizacionId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.organizacionId
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

    Organizacion.updateById(
        req.params.organizacionId,
        new Organizacion(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Organizacion con la id ${req.params.organizacionId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Organizacion con id"+ req.params.organizacionId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Organizacion.remove(req.params.organizacionId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Organizacion con la id ${req.params.organizacionId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Organizacion con id"+ req.params.organizacionId
                 });
             }
        }else res.send({ message: `El organizacion fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Organizacion.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los organizacions"
            });
        }
        else res.send({
            message: "todos los organizacions fueron borrados"
        });
    });
};

