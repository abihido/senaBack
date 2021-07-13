const Solicitud = require("../models/Solicitud.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const SolicitudC = new Solicitud({

        idCliente : req.body.idCliente,
        idProyecto : req.body.idProyecto,
        aprovadacion : req.body.aprovacion
    });

    Solicitud.create(SolicitudC,(err,data) => {
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
    Solicitud.getAll((err,data) =>{
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
    Solicitud.findById(req.params.solicitudId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el solicitud con id ${req.params.solicitudId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.solicitudId
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

    Solicitud.updateById(
        req.params.solicitudId,
        new Solicitud(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Solicitud con la id ${req.params.solicitudId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Solicitud con id"+ req.params.solicitudId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Solicitud.remove(req.params.solicitudId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Solicitud con la id ${req.params.solicitudId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Solicitud con id"+ req.params.solicitudId
                 });
             }
        }else res.send({ message: `El solicitud fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Solicitud.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los solicituds"
            });
        }
        else res.send({
            message: "todos los solicituds fueron borrados"
        });
    });
};

