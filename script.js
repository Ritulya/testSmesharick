const quiz = [
    {
        "q": "Ваш психологический возраст?",
        "a" : {
            "1": "Зумер)))",
            "2": "Миллениал",
            "3" : "Бумер.",
        }
    },
    {
        "q": "Больше всего вы любите...",
        "a" : {
            "1": "Кушать или ничего не делать...",
            "2": "Активничать",
            "3" : "Учиться и развиваться",
        }
    },
    {
        "q": "Ваш любимый цвет?",
        "a" : {
            "1": "Розовый",
            "2": "Голубой",
            "3" : "В мире есть вещи поважнее...",
        }
    },
];

let keys = new Map([
    ["123", "?"],
    ["313", "?"],
    ["323", "?"],
    ["212", "?"],
    ["221", "?"],
    ["111", "nusha"],
    ["311", "sova"],
    ["321", "sova"],
    ["33", "car"],
    ["322", "cop"],
    ["312", "cop"],
    ["21", "los"],
    ["23", "los"],
    ["22", "pin"],
    ["112", "krosh"],
    ["122", "krosh"],
    ["121", "ezh"],
    ["113", "bar"],
    ["13", "bar"]
]);



let answers = {
    "?" : {
        "description" : "Увы, мы не смогли определить какой вы Смешарик.<br>Возможно вы - Чёрный ловелас или Железная Няня.<br>А возможно, ожившая по ошибке, любвеобильная, круглая куча грязи...",
        "image" : "who.png",
    } ,
    "nusha" : {
        "description" : "Поздравляем!<br>Вы самовлюблённая кокетливая свинюшка!",
        "image" : "4.webp",
    } ,
    "sova" : {
        "description" : "Увы, но вы одинокая старая совушка :(<br>Зато у вас очень вкусные пироги!",
        "image" : "7.webp",
    } ,
    "car" : {
        "description" : "Наши поздравления!<br>Вы самый эстетский и роскошный ворон на районе!",
        "image" : "8.webp",
    } ,
    "cop" : {
        "description" : "Ну чтож.<br>Вы получились колхозным медведём Психопатычем -<br>главарём банды неправильных пчёл.<br>Поздравляем... (наверное).",
        "image" : "3.webp",
    } ,
    "los" : {
        "description" : "Поздравленческий парадокс.<br>Вы очень даже умный лось.<br>Как это работает мы не знаем.",
        "image" : "6.webp",
    } ,
    "pin" : {
        "description" : "Вы гений квантовой физики, но вы не можете выговорить<br>«Метилпропенилендигидрокси<br>циннаменилакрилическая кислота».<br>Поздравляем с опингвиниванием!",
        "image" : "9.webp",
    } ,
    "krosh" : {
        "description" : "Вы маленький, глупый, эгоистичный и кутёжный кролик.<br>Но всё хорошее ещё впереди...<br>Наверное...",
        "image" : "1.webp",
    } ,
    "ezh" : {
        "description" : "Вы замкнутый близорукий ёж. Наши соболезнования.<br>(Но по данным ФСБ таких, как вы, очень много. Не расстраивайтесь!)",
        "image" : "2.webp",
    } ,
    "bar" : {
        "description" : "Беспечный поэт и кудрявый баран.<br>Это про вас.<br>(Советуем задуматься о том, что вы влюблены в свинюху,<br>нам кажется это не лучшим выбором...)",
        "image" : "5.webp",
    } ,
};

document.getElementById("start").addEventListener("click", function (){
    document.getElementById("start").style.display="none";
    document.getElementById("inf").style.display="none";
    startQuiz();
});

function startQuiz() {
    var elems=document.querySelectorAll('.question, .answer');
    for(var i=0; i<elems.length; i++)elems[i].style.visibility="visible";
    let result = [0,0,0];
    let step = 0;
    function showQuestion() {
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer += `<li data-v='${key}' class="answer-variant">${quiz[step]['a'][key]}</li>`;
        }
        document.querySelector('.answer').innerHTML = answer;
    }

    document.onclick = function (event) {
        if (event.target.classList.contains('answer-variant') && step < quiz.length) {
            result[step] = event.target.dataset.v;
            step++;
            if (step == quiz.length) {
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                showResult();
            }
            else {
                showQuestion();
            }
        }
        if (event.target.classList.contains('reload-button')) {
            location.reload();
        }
    }

    function showResult() {
        let key = '';
        let str = result[0]+result[1]+result[2];
        console.log(str);
        for (let pair of keys.entries()) {
            if (str.startsWith(pair[0])) {
                key = pair[1];
                break;
            }
        }

        let div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        let img = document.createElement('img');
        img.src = 'images/' + answers[key]['image'];
        img.classList.add('result-img')
        document.querySelector('main').appendChild(img);

        let reloadButton = document.createElement('div');
        reloadButton.innerHTML = 'Ещё раз!';
        reloadButton.classList.add('reload-button');
        document.querySelector('main').appendChild(reloadButton);
    }

    showQuestion();
}

