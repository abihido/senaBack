const Financiacion = require("../models/Financiacion.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const FinanciacionC = new Financiacion({
        idCliente : req.body.idCliente,
        idProyecto : req.body.idProyecto,
        cantidad : req.body.cantidad
    });

    Financiacion.create(FinanciacionC,(err,data) => {
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
    Financiacion.getAll((err,data) =>{
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
    Financiacion.findById(req.params.financiacionId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el financiacion con id ${req.params.financiacionId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.financiacionId
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

    Financiacion.updateById(
        req.params.financiacionId,
        new Financiacion(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Financiacion con la id ${req.params.financiacionId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Financiacion con id"+ req.params.financiacionId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Financiacion.remove(req.params.financiacionId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Financiacion con la id ${req.params.financiacionId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Financiacion con id"+ req.params.financiacionId
                 });
             }
        }else res.send({ message: `El financiacion fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Financiacion.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los financiacions"
            });
        }
        else res.send({
            message: "todos los financiacions fueron borrados"
        });
    });
};

