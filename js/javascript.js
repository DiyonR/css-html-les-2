document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";

// gameWindow reference
const gameWindow = document.getElementById("gameWindow");

//FOREGROUND
const door1 = document.getElementById("door1")

//main character code
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    console.log(e.target.id);

    switch (e.target.id) {
        case "door1":
            MainCharacter.style.backgroundColor = "#ffff00"
            door1.style.opacity = 0.7;

        case "key":
            console.log("you found a key!");

            break;

        default:
            MainCharacter.style.backgroundColor = "#ffff00"
            door1.style.opacity = 1;

            break;
    }

}
