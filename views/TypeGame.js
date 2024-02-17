const input = document.getElementById('input');
const time = document.getElementById('time');
const typeInput = document.getElementById("typeInput");

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        enter();
    }
});

function randomIndex() {
    return Math.floor(Math.random() * 46) + 1; 
}

let count = 0;
let index = randomIndex();
let elapsed = 0;
let interval = null;

function updateTime() {
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

function startTimer() {
    if (interval !== null) {
        return;
    }

    let start = new Date();
    interval = setInterval(() => {
        let now = new Date();
        elapsed += now - start;
        start = now;
        updateTime();
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
    const typedValue = typeInput.value;
    console.log(typedValue);

    const question = questions[index];
    if (typedValue === question) {
        alert("正解");
        index = randomIndex();
        typeInput.value = ''; 
        if (count <= 3) {
            input.innerHTML = questions[index];
            typeInput.value = '';
            count++;
        } else {
            sendData(); 
            endGame();
        }
    } else {
        alert("もう一度入力してください");
        input.innerHTML = questions[index];
        typeInput.value = ''; 
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function endGame() {
    typeInput.value = '';
    typeInput.remove();
    btn.remove();
    stopTimer();
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
    const timeElapsed = `${hStr}:${mStr}:${sStr}.${msStr}`;
    const playerName = prompt("あなたの名前を入力してください：");

    axios.post("https://type-game.onrender.com/submit-result", { playerName, timeElapsed })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}
