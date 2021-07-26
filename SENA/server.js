const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));

app.get("/",(req,res) => {
    res.json({message:"que onda"});
});

require("./app/routes/Afiliacion.routes.js")(app);
require("./app/routes/Aprovacion.routes.js")(app);
require("./app/routes/Cliente.routes.js")(app);
require("./app/routes/Financiacion.routes.js")(app);
require("./app/routes/Organizacion.routes.js")(app);
require("./app/routes/Proyecto.routes.js")(app);
require("./app/routes/Solicitud.routes.js")(app);
require("./app/routes/Foto.routes.js")(app);

/////////////////////////////////////////////////

///////////////////////////////////////////////////









app.listen(3001,() => {
    console.log("server is running on port 3000");
});