const Afiliacion = require("../models/Afiliacion.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const AfiliacionC = new Afiliacion({
        idCliente : req.body.idCliente,
        idOrganizacion : req.body.idOrganizacion,
        active : req.body.active
    });

    Afiliacion.create(AfiliacionC,(err,data) => {
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
    Afiliacion.getAll((err,data) =>{
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
    Afiliacion.findById(req.params.afiliacionId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el afiliacion con id ${req.params.afiliacionId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.afiliacionId
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

    Afiliacion.updateById(
        req.params.afiliacionId,
        new Afiliacion(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Afiliacion con la id ${req.params.afiliacionId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Afiliacion con id"+ req.params.afiliacionId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Afiliacion.remove(req.params.afiliacionId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Afiliacion con la id ${req.params.afiliacionId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Afiliacion con id"+ req.params.afiliacionId
                 });
             }
        }else res.send({ message: `El afiliacion fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Afiliacion.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los afiliacions"
            });
        }
        else res.send({
            message: "todos los afiliacions fueron borrados"
        });
    });
};

