const express = require("express");
const app = express();
const PORT = 3000;
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

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

    connection.query(
        "SELECT * FROM ranking ORDER BY time ASC",
        (error, results) => {
            if (error) {
                console.log("データベース内を表示できませんでした。", error);
                return res.status(500).send("Internal Server Error");
            }
            res.render("ranking.ejs", { ranking: results });
        }
    );
});

app.post("/submit-result", (req, res) => {
    const playerName = req.body.playerName;
    const timeElapsed = req.body.timeElapsed;

    connection.query(
        'INSERT INTO ranking (name, time) VALUES (?, ?)',
        [playerName, timeElapsed],
        (error, results) => {
            if (error) {
                console.log("データベースにデータを入れれませんでした.", error);
                return res.status(500).send("Internal Server Error");
            }

        }
    );

    console.log(`名前: ${playerName} レコード: ${timeElapsed} `);
});

app.listen(process.env.PORT || PORT, () => {
    console.log("サーバー起動");
});
