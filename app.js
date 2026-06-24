let currentToken = "";
let countdown;
let timeLeft = CONFIG.tokenExpireTime;
let tokenExpired = false;

/* LOAD CONFIG */

window.onload = function(){

    const alertText =
    document.getElementById("alertText");

    alertText.innerText =
    CONFIG.alertMessage;

    alertText.style.animationDuration =
    CONFIG.tickerSpeed + "s";

};

/* LOGIN */

function startLogin(){

    document.getElementById("loginSection")
    .style.display = "none";

    document.getElementById("loadingSection")
    .classList.remove("hidden");

    setTimeout(function(){

        document.getElementById("loadingSection")
        .classList.add("hidden");

        document.getElementById("tokenSection")
        .classList.remove("hidden");

        generateToken();

    },3000);

}

/* TOKEN */

function generateToken(){

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&#@?";

    currentToken = "";

    for(let i=0;i<CONFIG.tokenLength;i++){

        currentToken += chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    document.getElementById("tokenBox")
    .innerText = currentToken;

    startTimer();

}

/* TIMER */

function startTimer(){

    clearInterval(countdown);

    timeLeft = CONFIG.tokenExpireTime;
    tokenExpired = false;

    document.getElementById("timer")
    .innerText = timeLeft + "s";

    countdown = setInterval(function(){

        timeLeft--;

        document.getElementById("timer")
        .innerText = timeLeft + "s";

        if(timeLeft <= 0){

            clearInterval(countdown);

            tokenExpired = true;

            document.getElementById("timer")
            .innerText = "Expired";

            document.getElementById("status")
            .innerText = "Token Expired";

        }

    },1000);

}

/* COPY */

function copyToken(){

    navigator.clipboard.writeText(currentToken);

    document.getElementById("status")
    .innerText = "Token Copied";

}

/* TELEGRAM */

function openTelegram(){

    window.location.href =
    "https://t.me/" + CONFIG.telegramUsername;

}