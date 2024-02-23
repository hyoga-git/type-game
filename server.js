const express = require("express");
const app = express();
const PORT = 3000;
const pool = require("./db");
const axios=require("axios");
app.use(express.static("views"));
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("home.ejs");
    console.log("ルートディレクトリーに入っています。");
});

app.get("/type", (req, res) => {
    console.log("タイピングゲーム起動中");
    res.render("type.ejs");
});

app.get("/ranking", (req, res) => {
    console.log("ranking表示");

    pool.query(
        "SELECT * FROM ranking ORDER BY time ASC",
        (error, results) => {
            if (error) {
                console.log("データベース内を表示できませんでした。", error);
                return res.status(500).send("Internal Server Error");
            }
            res.render("ranking.ejs", { ranking: results.rows });
        }
    );
});

app.post("/submit-result", (req, res) => {
    const times = req.body.times;
    console.log(times);
    pool.query(
        'INSERT INTO ranking (time) VALUES ($1)',[times],
        (error, results) => {
            if (error) {
                console.log("データベースにデータを入れれませんでした.", error);
                return res.status(500).send("Internal Server Error");
            }
            console.log(`レコード: ${times} `);
            res.status(200).send("OK");
        }
    );
});


app.listen(process.env.PORT || PORT, () => {
    console.log("サーバー起動");
});
