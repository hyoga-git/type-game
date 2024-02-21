const express = require("express");
const app = express();
const PORT = 3000;
const pool = require("./db");
const axios=require("axios");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
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

app.post("https://type-game.onrender.com/type", (req, res) => {
    const playerName = req.body.playerName;
    const timeElapsed = req.body.timeElapsed;

    pool.query(
        'INSERT INTO ranking (name,time) VALUES ($1,$2)',[playerName, timeElapsed],
        (error, results) => {
            if (error) {
                console.log("データベースにデータを入れれませんでした.", error);
                return res.status(500).send("Internal Server Error");
            }
            console.log(`名前: ${playerName} レコード: ${timeElapsed} `);
            res.status(200).send("OK");
        }
    );
});


app.listen(process.env.PORT || PORT, () => {
    console.log("サーバー起動");
});
