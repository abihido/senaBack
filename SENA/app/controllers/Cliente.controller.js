const Cliente = require("../models/Cliente.model.js");

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const ClienteC = new Cliente({
        mail : req.body.mail,
        name : req.body.name,
        password : req.body.password,
        avatar :req.body.avatar,
        documento: req.body.documento,
        celular: req.body.celular,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        curriculum : req.body.curriculum,
        facebook : req.body.facebook,
        linkedin : req.body.linkedin,
        twitter : req.body.twitter,
        instagram : req.body.instagram
    });

    Cliente.create(ClienteC,(err,data) => {
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
    Cliente.getAll((err,data) =>{
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
    Cliente.findById(req.params.clienteId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el cliente con id ${req.params.clienteId}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.clienteId
                });
            }
        } else res.send(data);
    });
};
exports.confirm = (req,res) => {
    Cliente.Confirm(req.params.mail,req.params.password, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se encontro el cliente con mail ${req.params.mail}` 
                });
            }
            else {
                res.status(500).send({
                    message: "error con el usuario "+req.params.mail
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

    Cliente.updateById(
        req.params.clienteId,
        new Cliente(req.body),
        (err,data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Cliente con la id ${req.params.clienteId} no encontrado`
                    });
                 } else {
                     res.status(500).send({
                         message: "Error actualizando el Cliente con id"+ req.params.clienteId
                     });
                 }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req,res) =>{
    Cliente.remove(req.params.clienteId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Cliente con la id ${req.params.clienteId} no encontrado`
                });
             } else {
                 res.status(500).send({
                     message: "Error borrando el Cliente con id"+ req.params.clienteId
                 });
             }
        }else res.send({ message: `El cliente fue borrado` });
    });
};

exports.deleteAll = (req,res) =>{
    Cliente.removeAll((err,data)=> {
        if(err){
            res.status(500).send({
                message: err.message || "Un error ocurrio mientras se removian los clientes"
            });
        }
        else res.send({
            message: "todos los clientes fueron borrados"
        });
    });
};

