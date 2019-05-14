"use strict";
var odo = document.querySelector('.odometer');
var ve = document.getElementById('viewers');
var tv = document.getElementById('TotalViews');
var ninjaId = "34103617504";




function search() {
    if (event.key === 'Enter') {
        getStats();
        var userName = document.querySelector("#inputUserName").value;
        return userName;
    }
}



function getStats(userId, userName) {
    var userName = document.querySelector("#inputUserName").value;

    // Transform userName input to useriD
    //
    function usernameToId() {
        fetch(`https://api.twitch.tv/helix/users?login=${userName}`, {
            "credentials": "omit",
            "headers": {
                "accept": "application/vnd.twitchtv.v3+json",
                "client-id": "6mrxy6lqs4m9svcim8ssr44ypzvk1c",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-device-id": "ce785a7487bcee5f"
            },
            "referrer": "https://www.twitch.tv/jaynim",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(response => response.json()).then(data => {

            var datas = data.data[0];
            console.log(datas.id);
            userId = data.data[0].id;

            return

        });
        console.log(userId);
        return
    };
    console.log(usernameToId());
    userId = usernameToId();
    fetch(`https://api.twitch.tv/helix/users/id?=${userId}`, {
        "credentials": "omit",
        "headers": {
            "accept": "application/vnd.twitchtv.v3+json",
            "client-id": "6mrxy6lqs4m9svcim8ssr44ypzvk1c",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-device-id": "ce785a7487bcee5f"
        },
        "referrer": "https://www.twitch.tv/jaynim",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
    }).then(response => response.json()).then(data => {
        console.log(datas);
        console.log(datas.view_count);
    });

    // Stream Status
    //
    fetch(`https://api.twitch.tv/helix/streams?user_login=gotaga`, {
        "headers": {
            "accept": "application/vnd.twitchtv.v3+json",
            "client-id": "6mrxy6lqs4m9svcim8ssr44ypzvk1c"
        },
        "mode": "cors"
    }).then(response => response.json()).then(data => {


        console.log(datas);
        //console.log(data.data[0].view_count);
        if (datas === undefined) {
            console.log('Stream Offline');
            // array exists and is not empty
        } else {
            console.log('Stream Online');
            streamViewers();
        };
    });






    /*
        setInterval(_ => {
            fetch(`https://api.twitch.tv/helix/users/id?=${userId}`, {
                "credentials": "omit",
                "headers": {
                    "accept": "application/vnd.twitchtv.v3+json",
                    "client-id": "jzkbprff40iqj646a697cyrvl0zt2m6",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-device-id": "ce785a7487bcee5f"
                },
                "referrer": "https://www.twitch.tv/jaynim",
                "referrerPolicy": "no-referrer-when-downgrade",
                "body": null,
                "method": "GET",
                "mode": "cors"
            }).then(response => response.json()).then(data => {
                console.log(data);
                if (!data) {
                    // handle empty response
                    console.log("error")

                } else if (data.error) {
                    // handle error
                    console.log("error")
                    console.log(data.error)
                } else {
                    // process results
                    console.log("good");
                    //ve.textContent = data.stream.viewers;
                    //tv.textContent = data.stream.channel.views;
                    console.log(data.data[0].view_count);
                }

            });
        }, 10000); */
    //            fetch("https://api.twitch.tv/kraken/streams/beeoneoff", {
    //                "credentials": "omit",
    //                "headers": {
    //                    "accept": "application/vnd.twitchtv.v3+json",
    //                    "client-id": "jzkbprff40iqj646a697cyrvl0zt2m6",
    //                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    //                    "x-device-id": "ce785a7487bcee5f"
    //                },
    //                "referrer": "https://www.twitch.tv/jaynim",
    //                "referrerPolicy": "no-referrer-when-downgrade",
    //                "body": null,
    //                "method": "GET",
    //                "mode": "cors"
    //            }).then(response => response.json()).then(data => {
    //                console.log(data);
    //                if (!data) {
    //                    // handle empty response
    //                    console.log("error")
    //
    //                } else if (data.error) {
    //                    // handle error
    //                    console.log("error")
    //                    console.log(data.error)
    //                } else {
    //                    // process results
    //                    console.log("good");
    //                    //ve.textContent = data.stream.viewers;
    //                    tv.textContent = data.stream.channel.views;
    //                }
    //
    //            });
};