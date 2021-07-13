const Aprovacion = require("../models/Aprovacion.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const AprovacionC = new Aprovacion({
        idCliente : req.body.idCliente,
        idProyecto : req.body.idProyecto,
        calificacion : req.body.calificacion,
        comentario : req.body.comentario
    });

    Aprovacion.create(AprovacionC,(err,data) => {
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
    Aprovacion.getAll((err,data) =>{
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
    Aprovacion.findById(req.params.aprovacionId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el aprovacion con id ${req.params.aprovacionId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.aprovacionId
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

    Aprovacion.updateById(
        req.params.aprovacionId,
        new Aprovacion(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Aprovacion con la id ${req.params.aprovacionId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Aprovacion con id"+ req.params.aprovacionId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Aprovacion.remove(req.params.aprovacionId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Aprovacion con la id ${req.params.aprovacionId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Aprovacion con id"+ req.params.aprovacionId
                 });
             }
        }else res.send({ message: `El aprovacion fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Aprovacion.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los aprovacions"
            });
        }
        else res.send({
            message: "todos los aprovacions fueron borrados"
        });
    });
};

