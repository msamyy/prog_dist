const express = require("express")
const app = express()
const routes = require("./routes")
const PORT = 3000

app.use(express.json())

app.use('/', routes)

// app.use((req, res) => {
//     res.send("<h1>Medico-dz REST API</h1>");

// });

app.listen(PORT, () => {
    console.log("Gateway has started on port " + PORT);
})