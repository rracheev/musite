const express = require("express");
const bodyParser = require('body-parser')
const request = require('request');
const app = express();
const urlencodedParser = bodyParser.urlencoded({
    extended: false,
})
const JSONParser = bodyParser.json();


app.get("/", function (request, response) {
    response.sendFile(__dirname + "/site/html/main.html");
})

//Можно и объединить, но пока так ---
app.use(express.static(__dirname + '/site/css'));
app.use(express.static(__dirname + '/site/js'));
app.use(express.static(__dirname + '/site/im'));
//---

app.post('/search', JSONParser, function (
    req,
    res
) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    let limit = 1;
    let term=req.body.autor_text+"+"+req.body.song_text;
    let media = "music"
    let str= 'limit='+limit+'&media='+media+'&term='+term;
    console.log("req start")
    request('https://itunes.apple.com/search?'+str, (err, response, body) => {
        if (err) return res.status(500).send({ message: err });
        //console.log( body);
        //let b =JSON.parse(body)
        let b=JSON.parse(body).results[0]
        //console.log( b);
        //console.log( music.artworkUrl100);
        console.log(JSON.stringify({album : b.artworkUrl100,music : b.previewUrl}));
        res.send(JSON.stringify({album : b.artworkUrl100,music : b.previewUrl}))
    });
})
app.listen(3000)