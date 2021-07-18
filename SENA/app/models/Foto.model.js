const sql = require("./db.js");

const Foto = function(foto){
    this.foto = foto.foto;
    this.idProyecto = foto.idProyecto;
    this.aprovacion = foto.principal;
};

Foto.create = (newFoto, result) => {
    sql.query("INSERT INTO fotos SET ?", newFoto, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Foto creada: ", { id: res.insertId, ...newFoto });
      result(null, { id: res.insertId, ...newFoto });
    });
  };
  
  Foto.findById = (fotoId, result) => {
    sql.query(`SELECT * FROM fotos WHERE id = ${fotoId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Foto encontrada ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Foto with the id
      result({ kind: "not_found" }, null);
    });
  };

  Foto.findByProject = (proyectoId, result) => {
    sql.query(`SELECT * FROM fotos WHERE proyectoId = ${proyectoId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Fotos encontradas ", res);
        result(null, res);
        return;
      }
  
      // not found Foto with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Foto.getAll = result => {
    sql.query("SELECT * FROM fotos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("fotos: ", res);
      result(null, res);
    });
  };
  
  Foto.updateById = (id, foto, result) => {
    sql.query(
      "UPDATE fotos SET foto = ?, proyectoId = ?, principal = ? WHERE id = ?",
      [foto.foto, foto.idProyecto, foto.principal, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Foto with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Actualizado correctamente ", { id: id, ...foto });
        result(null, { id: id, ...foto });
      }
    );
  };
  
  Foto.remove = (id, result) => {
    sql.query("DELETE FROM fotos WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Foto with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El foto fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Foto.removeAll = result => {
    sql.query("DELETE FROM fotos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`fotos borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Foto;