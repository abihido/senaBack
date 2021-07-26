const sql = require("./db.js");

const Proyecto = function(proyecto){
    this.name = proyecto.name;
    this.avatar =proyecto.avatar;
    this.requisitos = proyecto.requisitos;
    this.descripcion = proyecto.descripcion;
    this.active = proyecto.active;
    this.categoria = proyecto.categoria;
    this.idOrganizacion = proyecto.idOrganizacion;
    this.presupuesto = proyecto.presupuesto;
    this.actividad = proyecto.actividad;

    
    
};

Proyecto.create = (newProyecto, result) => {
    sql.query("INSERT INTO proyectos SET ?", newProyecto, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Proyecto creado: ", { id: res.insertId, ...newProyecto });
      result(null, { id: res.insertId, ...newProyecto });
    });
  };
  
  Proyecto.findById = (proyectoId, result) => {
    sql.query(`SELECT * FROM proyectos WHERE idProyectos = ${proyectoId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Proyecto encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Proyecto with the id
      result({ kind: "not_found" }, null);
    });
  };

  Proyecto.findByName = (name, result) => {
    sql.query(`SELECT * FROM proyectos WHERE name LIKE '%${name}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Proyecto encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Proyecto with the id
      result({ kind: "not_found" }, null);
    });
  };
  Proyecto.findByName = (descripcion, result) => {
    sql.query(`SELECT * FROM proyectos WHERE descripcion LIKE '%${descripcion}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Proyecto encontrado ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Proyecto with the id
      result({ kind: "not_found" }, null);
    });
  };
  Proyecto.findByCategoria = (categoria, result) => {
    sql.query(`SELECT * FROM proyectos WHERE categoria LIKE '%${categoria}%'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Proyecto encontrado ", res);
        result(null, res);
        return;
      }
  
      // not found Proyecto with the id
      result({ kind: "not_found" }, null);
    });
  };
  Proyecto.getAll = result => {
    sql.query("SELECT name ,requisitos,descripcion,active,categoria,idOrganizacion, presupuesto,actividad,idProyectos  FROM proyectos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("proyectos: ", res);
      result(null, res);
    });
  };
  
  Proyecto.updateById = (id, proyecto, result) => {
    sql.query(
      "UPDATE proyectos SET name = ?, avatar = ?,requisitos=?,descripcion=?,active=?,categoria=?,idOrganizacion=?, presupuesto=?,actividad =? WHERE idProyectos = ?",
      [proyecto.name, proyecto.avatar,proyecto.requisitos,proyecto.descripcion,proyecto.active,proyecto.categoria,proyecto.idOrganizacion,proyecto.presupuesto,proyecto.actividad, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Proyecto with the id
          result({ kind: "not_found por id" }, null);
          return;
        }
        console.log("Actualizado correctamente ", { id: id, ...proyecto });
        result(null, { id: id, ...proyecto });
      }
    );
  };
  
  Proyecto.remove = (id, result) => {
    sql.query("DELETE FROM proyectos WHERE idProyectos = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Proyecto with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("El proyecto fue borrado, su id: ", id);
      result(null, res);
    });
  };
  
  Proyecto.removeAll = result => {
    sql.query("DELETE FROM proyectos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`proyectos borrados ${res.affectedRows} `);
      result(null, res);
    });
  };
  
  module.exports = Proyecto;