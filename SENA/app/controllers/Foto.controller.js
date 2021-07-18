const Foto = require("../models/Foto.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const FotoC = new Foto({

        idCliente : req.body.foto,
        idProyecto : req.body.idProyecto,
        aprovadacion : req.body.principal
    });

    Foto.create(FotoC,(err,data) => {
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
    Foto.getAll((err,data) =>{
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
    Foto.findById(req.params.fotoId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro la foto con id ${req.params.fotoId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con la id "+req.params.fotoId
                });
            }
        } else res.send(data);
    });
};
exports.findByProject = (req,res) => {
    Foto.findById(req.params.proyectId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontraron las fotos del proyecto ${req.params.proyectId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con la id "+req.params.proyectId
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

    Foto.updateById(
        req.params.fotoId,
        new Foto(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Foto con la id ${req.params.fotoId} no encontrada`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando la Foto con id"+ req.params.fotoId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Foto.remove(req.params.fotoId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Foto con la id ${req.params.fotoId} no encontrada`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando la Foto con id"+ req.params.fotoId
                 });
             }
        }else res.send({ message: `La foto fue borrada` });
    });
};

exports.deleteAll = (req,res) =>{
    Foto.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian las fotos"
            });
        }
        else res.send({
            message: "todos las fotos fueron borradas"
        });
    });
};
