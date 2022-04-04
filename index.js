// Api-Key https://api.themoviedb.org/3/movie/550?api_key=b3d17551f1a2e933e6c7f2e94553a80c

// npm init -y
// npm install axios
// npm install express
// npm install ejs
// npm install nodemon
// pagage-jason extra script "start": "nodemon index.js"
// npm run start zum starten

const axios = require("axios")
const express = require("express")
const PORT = 1818
const apiBaseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b3d17551f1a2e933e6c7f2e94553a80c"
const apiDetailsUrls = "https://api.themoviedb.org/3/movie/"
const apiKey = 'b3d17551f1a2e933e6c7f2e94553a80c'

const app = express()

app.set("view engine", "ejs")

app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next()
})

app.use(express.static('public'))

app.get("/", (_, res) => {
    axios.get(apiBaseUrl)
        .then(respo => {
            // console.log(respo.data.results);
            res.render("home", { filmList: respo.data.results })
        })
})

app.get("/film/:id", (req, res) => {
    const filmId = req.params.id
    console.log('test');
    axios.get(apiDetailsUrls + filmId + "?api_key=" + apiKey)
        .then(respo => {
            // console.log('detail API' + );
            console.log(respo);
            res.render("details", { filmDetail: respo.data })
        })
})

app.listen(PORT, () => console.log("Server listening to Port:", PORT))