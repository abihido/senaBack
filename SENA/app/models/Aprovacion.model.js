const sql = require("./db.js");

const Aprovacion = function(aprovacion){
    this.idCliente = aprovacion.idCliente;
    this.idProyecto = aprovacion.idProyecto;
    this.calificacion = aprovacion.calificacion;
    this.comentario = aprovacion.comentario;
};

Aprovacion.create = (newAprovacion, result) => {
    sql.query("INSERT INTO aprovaciones SET ?", newAprovacion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Aprovacion creado: ", { id: res.insertId, ...newAprovacion });
      result(null, { id: res.insertId, ...newAprovacion });
    });
  };
  
  Aprovacion.findById = (aprovacionId, result) => {
    sql.query(`SELECT * FROM aprovaciones WHERE idAprovaciones = ${aprovacionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Aprovacion encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Aprovacion with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Aprovacion.getAll = result => {
    sql.query("SELECT * FROM aprovaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("aprovaciones: ", res);
      result(null, res);
    });
  };
  
  Aprovacion.updateById = (id, aprovacion, result) => {
    sql.query(
      "UPDATE aprovaciones SET idCliente = ?, idOrganizacion = ?, calificacion = ?, comentario =? WHERE idAprovaciones = ?",
      [aprovacion.idCliente, aprovacion.idOrganizacion, aprovacion.calificacion,aprovacion.comentario, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Aprovacion with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...aprovacion });
        result(null, { id: id, ...aprovacion });
      }
    );
  };
  
  Aprovacion.remove = (id, result) => {
    sql.query("DELETE FROM aprovaciones WHERE idAprovaciones = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Aprovacion with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El aprovacion fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Aprovacion.removeAll = result => {
    sql.query("DELETE FROM aprovaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`aprovaciones borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Aprovacion;