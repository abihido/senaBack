const sql = require("./db.js");

const Afiliacion = function(afiliacion){
    this.idCliente = afiliacion.idCliente;
    this.idOrganizacion = afiliacion.idOrganizacion;
    this.active = afiliacion.active;
};

Afiliacion.create = (newAfiliacion, result) => {
    sql.query("INSERT INTO afiliaciones SET ?", newAfiliacion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Afiliacion creado: ", { id: res.insertId, ...newAfiliacion });
      result(null, { id: res.insertId, ...newAfiliacion });
    });
  };
  
  Afiliacion.findById = (afiliacionId, result) => {
    sql.query(`SELECT * FROM afiliaciones WHERE idAfiliaciones = ${afiliacionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Afiliacion encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Afiliacion with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Afiliacion.getAll = result => {
    sql.query("SELECT * FROM afiliaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("afiliaciones: ", res);
      result(null, res);
    });
  };
  
  Afiliacion.updateById = (id, afiliacion, result) => {
    sql.query(
      "UPDATE afiliaciones SET idCliente = ?, idOrganizacion = ?, active = ? WHERE idAfiliaciones = ?",
      [afiliacion.idCliente, afiliacion.idOrganizacion, afiliacion.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Afiliacion with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...afiliacion });
        result(null, { id: id, ...afiliacion });
      }
    );
  };
  
  Afiliacion.remove = (id, result) => {
    sql.query("DELETE FROM afiliaciones WHERE idAfiliaciones = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Afiliacion with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El afiliacion fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Afiliacion.removeAll = result => {
    sql.query("DELETE FROM afiliaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`afiliaciones borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Afiliacion;