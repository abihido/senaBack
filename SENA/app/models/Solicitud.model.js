const sql = require("./db.js");

const Solicitud = function(solicitud){
    this.idCliente = solicitud.idCliente;
    this.idProyecto = solicitud.idProyecto;
    this.aprovacion = solicitud.aprovacion;
};

Solicitud.create = (newSolicitud, result) => {
    sql.query("INSERT INTO solicitudes SET ?", newSolicitud, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Solicitud creado: ", { id: res.insertId, ...newSolicitud });
      result(null, { id: res.insertId, ...newSolicitud });
    });
  };
  
  Solicitud.findById = (solicitudId, result) => {
    sql.query(`SELECT * FROM solicitudes WHERE idSolicitudes = ${solicitudId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Solicitud encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Solicitud with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Solicitud.getAll = result => {
    sql.query("SELECT * FROM solicitudes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("solicitudes: ", res);
      result(null, res);
    });
  };
  
  Solicitud.updateById = (id, solicitud, result) => {
    sql.query(
      "UPDATE solicitudes SET idCliente = ?, idOrganizacion = ?, aprovacion = ? WHERE idSolicitudes = ?",
      [solicitud.idCliente, solicitud.idOrganizacion, solicitud.aprovacion, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Solicitud with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...solicitud });
        result(null, { id: id, ...solicitud });
      }
    );
  };
  
  Solicitud.remove = (id, result) => {
    sql.query("DELETE FROM solicitudes WHERE idSolicitudes = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Solicitud with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El solicitud fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Solicitud.removeAll = result => {
    sql.query("DELETE FROM solicitudes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`solicitudes borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Solicitud;