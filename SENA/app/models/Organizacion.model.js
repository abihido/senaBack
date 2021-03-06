const sql = require("./db.js");

const Organizacion = function(organizacion){
    this.name = organizacion.name;
    this.avatar =organizacion.avatar;
    this.celular= organizacion.celular;
    this.direccion= organizacion.direccion;
    this.descripcion = organizacion.descripcion;
    this.palabrasClave = organizacion.palabrasClave;
    
};

Organizacion.create = (newOrganizacion, result) => {
    sql.query("INSERT INTO organizaciones SET ?", newOrganizacion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Organizacion creado: ", { id: res.insertId, ...newOrganizacion });
      result(null, { id: res.insertId, ...newOrganizacion });
    });
  };
  
  Organizacion.findById = (organizacionId, result) => {
    sql.query(`SELECT * FROM organizaciones WHERE idOrganizaciones = ${organizacionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Organizacion encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Organizacion with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Organizacion.getAll = result => {
    sql.query("SELECT name ,celular, direccion,descripcion,palabrasClave,idOrganizaciones FROM organizaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("organizaciones: ", res);
      result(null, res);
    });
  };
  
  Organizacion.updateById = (id, organizacion, result) => {
    sql.query(
      "UPDATE organizaciones SET name = ?, avatar = ?,celular=?, direccion=?,descripcion=?,palabrasClave=? WHERE idOrganizaciones = ?",
      [organizacion.name, organizacion.avatar,organizacion.celular,organizacion.direccion,organizacion.descripcion,organizacion.palabrasClave, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        
        if (res.affectedRows == 0) {
          // not found Organizacion with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
        console.log("Actualizado correctamente ", { id: id, ...organizacion });
        result(null, { id: id, ...organizacion });
      }
    );
  };
  
  Organizacion.remove = (id, result) => {
    sql.query("DELETE FROM organizaciones WHERE idOrganizaciones = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Organizacion with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El organizacion fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Organizacion.removeAll = result => {
    sql.query("DELETE FROM organizaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`organizaciones borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Organizacion;