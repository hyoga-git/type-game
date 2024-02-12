const express = require("express");
const app = express();
const PORT = 3000;
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  // ビューエンジンの設定

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0603",
    database: "ranking",
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
        "SELECT * FROM ranking ORDER BY time ASC", // timeの昇順（低い順）でソート
        (error, results) => {
            if (error) {
                console.log("データベース内を表示できませんでした。");
                return res.status(500).send("Internal Server Error");
            }
            res.render("ranking.ejs", { ranking: results });
        }
    );
});




app.post("/submit-result", (req, res) => {
    const playerName = req.body.playerName;
    const timeElapsed = req.body.timeElapsed;

    // ここでデータベースへの保存などを行う

connection.query(
    'insert into ranking (name,time) values(?,?)',
    [playerName,timeElapsed],
    (error,results)=>{
        if(error){
            console.log("データベースにデータを入れれませんでした.")
        }
connection.query(
    `select * from ranking`,
    (error,results)=>{
        if(error){
            console.log("データベース内を表示できません。")
        }console.log(results);

    }
);
    }
);
    console.log(`名前: ${playerName} レコード: ${timeElapsed} `);
});

app.listen(PORT, () => {
    console.log("サーバー起動");
});
