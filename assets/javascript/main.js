var player1 = {
    char: "Jerry",
    hp: 120,
    ap: 8,
    cap: 8
}
var player2 = {
    char: "Elaine",
    hp: 100,
    ap: 5,
    cap: 5
}
var player3 = {
    char: "George",
    hp: 150,
    ap: 20,
    cap: 20
}
var player4 = {
    char: "Cosmo",
    hp: 180,
    ap: 25,
    cap: 25
}

var yourChar;
var yourCharDamage;
var yourCharAP = 0;
var defendChar;
var defendCharDamage;
var enemy = false;
var losers = [];



$(document).ready(function () {
    $(".reset").hide();
    $(".points1").text(player1.hp);
    $(".points2").text(player2.hp);
    $(".points3").text(player3.hp);
    $(".points4").text(player4.hp);
    $(".name1").text(player1.char);
    $(".name2").text(player2.char);
    $(".name3").text(player3.char);
    $(".name4").text(player4.char);
    $(".playerPick").on("click", function () {
        if ($(this).attr("id") == ("char1")) {
            yourChar = Object.assign({}, player1);
            $(".points1").text(yourChar.hp);
        } else if ($(this).attr("id") == ("char2")) {
            yourChar = Object.assign({}, player2);
            $(".points2").text(yourChar.hp);
        } else if ($(this).attr("id") == ("char3")) {
            yourChar = Object.assign({}, player3);
            $(".points3").text(yourChar.hp);
        } else if ($(this).attr("id") == ("char4")) {
            yourChar = Object.assign({}, player4);
            $(".points4").text(yourChar.hp);
        }
        console.log(yourChar);
        $(".playerPick").not(this).insertAfter("#enemies").removeClass("playerPick").addClass("enemy").off("click");
        $(this).insertAfter("#yourChar");

        //how to select the element that is chosen
        $(".enemy").on("click", function () {
            $(this).insertAfter("#defend").removeClass("enemy").addClass("defender").off("click");
            enemy = true;
            $(".message").empty();
            console.log(enemy);
            if ($(this).attr("id") == ("char1")) {
                defendChar = Object.assign({}, player1);
                $(".points1").text(defendChar.hp);
            } else if ($(this).attr("id") == ("char2")) {
                defendChar = Object.assign({}, player2);
                $(".points2").text(defendChar.hp);
            } else if ($(this).attr("id") == ("char3")) {
                defendChar = Object.assign({}, player3);
                $(".points3").text(defendChar.hp);
            } else if ($(this).attr("id") == ("char4")) {
                defendChar = Object.assign({}, player4);
                $(".points4").text(defendChar.hp);
            }
            console.log(losers);
        })
    });
    $(".attack").on("click", function () {
        if (enemy === false) {
            $(".message").html("No enemy here.");
        } else {
            yourCharAP += yourChar.ap;
            defendChar.hp -= yourCharAP;
            yourChar.hp -= defendChar.ap;
            $(".defender p:last").html(defendChar.hp);
            $(".playerPick p:last").html(yourChar.hp);
            $(".message").html("You attacked " + defendChar.char + " for " + yourCharAP + " damage." + "<br> " + defendChar.char + " attacked you for " + defendChar.ap + " damage")
            console.log(defendChar.hp);
            console.log(yourChar.hp);
        }
        if (defendChar.hp < yourChar.ap) {
            yourChar.hp += defendChar.ap;
            $(".playerPick p:last").html(yourChar.hp);
            $(".message").html("You have defeated " + defendChar.char + ", you can choose to fight another enemy.")
            defendChar = "";
            enemy = false;
            losers.push(defendChar.char);
            console.log(losers.length);
            $(".defender").remove();
        }
        if (yourChar.hp <= 0) {
            if (yourChar.char === "Jerry") {
                $(".loss").css('background-image', 'url(assets/images/jerryloses.gif)');
            } else if (yourChar.char === "Elaine") {
                $(".loss").css('background-image', 'url(assets/images/elaineloses.gif)');
            } else if (yourChar.char === "George") {
                $(".loss").css('background-image', 'url(assets/images/georgeloses.gif)');
            } else if (yourChar.char === "Cosmo") {
                $(".loss").css('background-image', 'url(assets/images/kramerloses.gif)');
            }
            $(".loss").fadeIn(1000);
            $(".lossmessage").html("You have been defeated.  GAME OVER!!!!");
            $(".attack").prop("disabled", true);
            $(".lossreset").show();
        }
        if (losers.length === 3) {
            if (yourChar.char === "Jerry") {
                $(".win").css('background-image', 'url(assets/images/jerrywins.gif)');
            } else if (yourChar.char === "Elaine") {
                $(".win").css('background-image', 'url(assets/images/elainewins.gif)');
            } else if (yourChar.char === "George") {
                $(".win").css('background-image', 'url(assets/images/georgewins.gif)');
            } else if (yourChar.char === "Cosmo") {
                $(".win").css('background-image', 'url(assets/images/kramerwins.gif)');
            }
            $(".win").fadeIn(1000);
            $(".winMessage").text("You have defeated your enemies!  Play Again!")
            $(".winReset").show();
        }
    })

    $(".reset, .winReset, .lossreset").on("click", function () {
        location.reload();
    })
})




//attack button triggers minus of character's damage
//attack message1 : "You attacked " + name2 + " for " + player2 + " damage." Player attack doubles every time. Last attack value is stored from previous play.
//attack message2 : name2 + " attacked you for " + player2 + " damage."  Counter attack always same amount.

//If attack button is pressed with no enemy,
//empty button message: "No enemy here."

//------------WIN LOGIC----------------
//win message: "You have defeated " + name2 + ", you can choose to fight another enemy."
//Defender is removed.
//Player can choose new opponent
//------------LOSS LOGIC---------------
//loss message: "You have been defeated.  GAME OVER!!!!"
//restart button appears once player points reach 0.
//attack button disabled.