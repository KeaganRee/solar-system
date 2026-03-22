import express from 'express';
const planets = (await import('npm-solarsystem')).default;

let data = "";
let nasa = "";

getImg();
getNasa();
async function getImg(){
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar-system";
   let response = await fetch(url);
   data = await response.json();
}

async function getNasa(){
   let d = new Date();
   d.setDate(d.getDate() - 1);
   let yesterday = d.toISOString().slice(0, 10);
   let url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=" + yesterday;
   let response = await fetch(url);
   nasa = await response.json(); 
   console.log(nasa);
}

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root route
app.get('/', (req, res) => {
   let randNum = Math.floor(Math.random() * 50 + 1);
   let ssImage = data.hits[randNum].webformatURL;
   res.render('home.ejs', {ssImage});
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    res.render('planet.ejs', {planetInfo, planet});
});

app.get('/nasaPod', (req, res) => {
   let nasaImg = nasa.hdurl;
   console.log(nasaImg);
   res.render('nasapod.ejs', {nasaImg});
});

app.get('/comet', (req, res) => {
   let comet = planets.getComets();
   res.render('comet.ejs', {comet});
})

app.get('/asteroid', (req, res) => {
   let asteroid = planets.getAsteroids();
   res.render('asteroid.ejs', {asteroid});
})

app.listen(3000, () => {
   console.log('server started');
});

