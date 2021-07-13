const sql = require("./db.js");

const Cliente = function(cliente){
    this.mail = cliente.mail;
    this.name = cliente.name;
    this.password = cliente.password;
    this.avatar =cliente.avatar;
    this.documento= cliente.documento;
    this.celular= cliente.celular;
    this.direccion= cliente.direccion;
    this.ciudad= cliente.ciudad;
    this.curriculum = cliente.curriculum;
    // contenido audiovisual de muestra 
    //PORTAFOLIOS
    //CIIU DISCRIMINACION
    this.facebook = cliente.facebook;
    this.linkedin = cliente.linkedin;
    this.twitter = cliente.twitter;
    this.instagram = cliente.instagram;
    
};

Cliente.create = (newCliente, result) => {
    sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Cliente creado: ", { id: res.insertId, ...newCliente });
      result(null, { id: res.insertId, ...newCliente });
    });
  };
  
  Cliente.findById = (clienteId, result) => {
    sql.query(`SELECT * FROM clientes WHERE idClientes = ${clienteId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Cliente encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Cliente with the id
      result({ kind: "not_found" }, null);
    });
  };
  Cliente.Confirm = (mail,password,result) =>{
    sql.query(`SELECT * FROM clientes WHERE mail="${mail}"`,(err,res) =>{
      if(err){
        console.log("error:",err);
        result(err, null);
        return;
      }
      if(res.length){
        if(res[0].password===password){
          delete res[0].password;
          result(null,res[0]);
          return;
        }
        else{
          console.log("contraseña equivocada");
          result(null,false);
          return;
        }
      }

      result({ kind: "not_found" }, null);
    });
  }
  Cliente.getAll = result => {
    sql.query("SELECT * FROM clientes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("clientes: ", res);
      result(null, res);
    });
  };
  
  Cliente.updateById = (id, cliente, result) => {
    sql.query(
      "UPDATE clientes SET mail = ?, name = ?, password = ?, avatar = ?,  documento=? ,celular=?, direccion=?,ciudad=?,curriculum=? , facebook =?,linkedin=?,twitter=?,instagram=? WHERE idClientes = ?",
      [cliente.mail, cliente.name, cliente.password, cliente.avatar,cliente.documento,cliente.celular,cliente.direccion,cliente.ciudad,cliente.curriculum,cliente.facebook,cliente.linkedin,cliente.twitter,cliente.instagram, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Cliente with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...cliente });
        result(null, { id: id, ...cliente });
      }
    );
  };
  
  Cliente.remove = (id, result) => {
    sql.query("DELETE FROM clientes WHERE idClientes = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Cliente with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El cliente fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Cliente.removeAll = result => {
    sql.query("DELETE FROM clientes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`clientes borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Cliente;