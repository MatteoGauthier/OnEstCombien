var odo = document.querySelector(".odometer");
var allOdo = document.querySelectorAll(".odometer");
var ve = document.getElementById("viewers");
var tv = document.getElementById("TotalViews");
var input = document.querySelector("#inputUserName");
var statusCircle = document.querySelector(".circle-status");
var resultPseudo = document.querySelector("#UserName-String:first-child");
var resultAka = document.querySelector("div.aka > span");
var resultPPics = document.querySelector("div.profile-pics > img");

var refreshV;
var refreshT;

allOdo[0].textContent = 100000;
allOdo[1].textContent = 100000;

function handleEnter(e) {
    var keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == "13") {
        var identifiant = input.value;
        main(identifiant);
    }
}

function main(userName) {

    let userId;

    fetch(`https://api.twitch.tv/helix/users?login=${userName}`, {
            headers: {
                "client-id": "0ikjx4yg4ifvnm010hu1p5w8c4pjgm"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data[0] === undefined) {
                console.log("Streamers inéxistant, vérifiez votre entrée");
            } else {
                userId = data.data[0].id;
                resultPseudo.textContent = data.data[0].display_name;
                resultAka.textContent = data.data[0].login;
                resultPPics.src = data.data[0].profile_image_url;
                console.log("USERNAME TO ID = Id du streamer: " + userId);
                streamStatus(userId);
            }
        });

    function streamStatus(x) {
        fetch(`https://api.twitch.tv/helix/streams?user_id=${x}`, {
                headers: {
                    "client-id": "0ikjx4yg4ifvnm010hu1p5w8c4pjgm"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.data[0] === undefined) {
                    statusCircle.classList.remove("StatusOnline");
                    console.log("Stream Offline");
                    statusCircle.style.backgroundColor = "grey";
                    streamViewers(x, totalViews);
                } else {

                    statusCircle.classList.add("StatusOnline");
                    console.log("Stream Online");
                    console.log(
                        userName + " stream avec " + data.data[0].viewer_count + " viewers"
                        );

                    var totalViews = data.data[0].viewer_count;
                    streamViewers(x, totalViews);
                }
            });
            totalViewers(x);
    }

    function streamViewers(v, y) {
        clearInterval(refreshV);

        refreshV = setInterval(() => {
            fetch(`https://api.twitch.tv/helix/streams?user_id=${v}`, {
                    headers: {
                        "client-id": "0ikjx4yg4ifvnm010hu1p5w8c4pjgm"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.data[0] === undefined) {
                        console.log("Stream Offline");
                        ve.textContent = 0;
                        clearInterval(refreshV);
                    } else {
                        ve.textContent = data.data[0].viewer_count;

                    }
                });
        }, 2000);
    }

    function totalViewers(d) {
        clearInterval(refreshT);
        fetchTViewers();
        refreshT = setInterval(() => {
            fetchTViewers();
        }, 30000);

        function fetchTViewers() {
            fetch(`https://api.twitch.tv/helix/users?id=${d}`, {
                    headers: {
                        "client-id": "0ikjx4yg4ifvnm010hu1p5w8c4pjgm"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.data[0] === undefined) {
                        console.log("Error for fetching twitch.tv - Verify your input, bug report at !!!");
                        clearInterval(refreshT);
                    } else {
                        tv.textContent = data.data[0].view_count;
                    }
                });
        }
    }

}