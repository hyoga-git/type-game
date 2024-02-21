const btn = document.getElementById('btn');
const input = document.getElementById('input');
const time = document.getElementById('time');
const type = document.getElementById("type");

document.addEventListener('keydown',function(event) {
    if (event.key === 'Enter') {
        enter();
     　document.getElementById('type').value="";
        
    }
});


function ramdamNumber(){
    return Math.floor(Math.random() * 46) + 1; 
}

let atai=0;
let index = ramdamNumber()
let elapsed = 0;
let interval = null;

function uptime() {
    const ms = elapsed % 1000; 
    const s = Math.floor(elapsed / 1000) % 60;
    const m = Math.floor(elapsed / (1000 * 60)) % 60;
    const h = Math.floor(elapsed / (1000 * 60 * 60));

    const msStr = ms.toString().padStart(3, '0');
    const sStr = s.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const hStr = h.toString().padStart(2, '0');
    time.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
}

function timeset() {
    if (interval !== null) {
        return;
    }

    let start = new Date();
    console.log(start);
    interval = setInterval(() => {
        let now = new Date();
        elapsed += now - start;
        start = now;
        uptime();
    }, 10);
}

const questions = [
    "ほっかいどう",
    "あおもりけん",
    "いわてけん",
    "みやぎけん",
    "あきたけん",
    "やまがたけん",
    "ふくしまけん",
    "いばらきけん",
    "とちぎけん",
    "ぐんまけん",
    "さいたまけん",
    "ちばけん",
    "とうきょうと",
    "かながわけん",
    "にいがたけん",
    "とやまけん",
    "いしかわけん",
    "ふくいけん",
    "やまなしけん",
    "ながのけん",
    "ぎふけん",
    "しずおかけん",
    "あいちけん",
    "みえけん",
    "しがけん",
    "きょうとふ",
    "おおさかふ",
    "ひょうごけん",
    "ならけん",
    "わかやまけん",
    "とっとりけん",
    "しまねけん",
    "おかやまけん",
    "ひろしまけん",
    "やまぐちけん",
    "とくしまけん",
    "かがわけん",
    "えひめけん",
    "こうちけん",
    "ふくおかけん",
    "さがけん",
    "ながさきけん",
    "くまもとけん",
    "おおいたけん",
    "みやざきけん",
    "かごしまけん",
    "おきなわけん"
];



input.innerHTML = questions[index];

function enter() {
    const type = document.getElementById('type').value;
    console.log(type);
   

    const ques = questions[index];
    if (type === ques) {
        alert("正解");
        index = ramdamNumber();
        document.getElementById('type').value = ''; // 入力フォームの値を空に設定
        
        
        if (atai <= 3) {
            input.innerHTML = questions[index];
            document.getElementById('type').value = '';
            atai++
        } else {
            sendData();  // 全ての質問に回答したらデータを送信
            ok();
        }
    } else {
        alert("もう一度入力してください");
        input.innerHTML = questions[index];
        document.getElementById('type').value = ''; // 入力フォームの値を空に設定
    }
}





function stop() {
    clearInterval(interval);
    interval = null;
}

function ok() {
    document.getElementById('type').value = '';
    type.remove();
    btn.remove();
    stop();
    input.innerHTML = "終了";
}

function sendData() {
    const ms = elapsed % 1000; 
    const s = Math.floor(elapsed / 1000) % 60;
    const m = Math.floor(elapsed / (1000 * 60)) % 60;
    const h = Math.floor(elapsed / (1000 * 60 * 60));

    const msStr = ms.toString().padStart(3, '0');
    const sStr = s.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const hStr = h.toString().padStart(2, '0');
    const time = `${hStr}:${mStr}:${sStr}.${msStr}`;
    const timeElapsed = time;
    const playerName = prompt("あなたの名前を入力してください："); // プレイヤーの名前を取得するための適切な方法を使用する方が良いでしょう


    axios.post("/submit-result", { playerName, timeElapsed })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

}