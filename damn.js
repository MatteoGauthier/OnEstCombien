"use strict";
var odo = document.querySelector('.odometer');
var ve = document.getElementById('viewers');
var tv = document.getElementById('TotalViews');
var input = document.querySelector("#inputUserName");

function handleEnter(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        console.log('You pressed enter! - plain javascript');
        main()
    }
}

function main() {


    function laValeur() {
        return input.value
    };



    var userName = laValeur();

    // const json = await fetch(`https://api.twitch.tv/helix/users?login=${userName}`, {
    //             "headers": {
    //                 "client-id": "6mrxy6lqs4m9svcim8ssr44ypzvk1c",
    //             }
    //         }).then(response => response.json());
    // console.log(json);

    let userId;


    fetch(`https://api.twitch.tv/helix/users?login=${userName}`, {
        "headers": {
            "client-id": "6mrxy6lqs4m9svcim8ssr44ypzvk1c",
        }
    }).then(response => response.json()).then(data => {
        userId = data.data[0].id;
        console.log("Id du streamer: " + userId);
        streamStatus(userId);
    });

    function streamStatus(x) {
        fetch(`https://api.twitch.tv/helix/streams?user_id=${x}`, {
            "headers": {
                "client-id": "6mrxy6lqs4m9svcim8ssr44ypzvk1c"
            }
        }).then(response => response.json()).then(data => {
            console.log(data)


            //console.log(data.data[0].view_count);
            if (data.data[0] === undefined) {
                console.log('Stream Offline');
                // array exists and is not empty
            } else {
                console.log('Stream Online');
                console.log(userName + ' stream avec ' + data.data[0].viewer_count + ' viewers');
                //streamViewers();
            };
        });
    }

}