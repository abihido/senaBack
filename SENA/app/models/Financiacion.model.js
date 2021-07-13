const sql = require("./db.js");

const Financiacion = function(financiacion){
    this.idCliente = financiacion.idCliente;
    this.idProyecto = financiacion.idProyecto;
    this.cantidad = financiacion.cantidad;
};

Financiacion.create = (newFinanciacion, result) => {
    sql.query("INSERT INTO financiaciones SET ?", newFinanciacion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Financiacion creado: ", { id: res.insertId, ...newFinanciacion });
      result(null, { id: res.insertId, ...newFinanciacion });
    });
  };
  
  Financiacion.findById = (financiacionId, result) => {
    sql.query(`SELECT * FROM financiaciones WHERE idFinanciaciones = ${financiacionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Financiacion encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Financiacion with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Financiacion.getAll = result => {
    sql.query("SELECT * FROM financiaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("financiaciones: ", res);
      result(null, res);
    });
  };
  
  Financiacion.updateById = (id, financiacion, result) => {
    sql.query(
      "UPDATE financiaciones SET idCliente = ?, idOrganizacion = ?, cantidad=? WHERE idFinanciaciones = ?",
      [financiacion.idCliente, financiacion.idOrganizacion, financiacion.cantidad, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Financiacion with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...financiacion });
        result(null, { id: id, ...financiacion });
      }
    );
  };
  
  Financiacion.remove = (id, result) => {
    sql.query("DELETE FROM financiaciones WHERE idFinanciaciones = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Financiacion with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El financiacion fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Financiacion.removeAll = result => {
    sql.query("DELETE FROM financiaciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`financiaciones borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Financiacion;