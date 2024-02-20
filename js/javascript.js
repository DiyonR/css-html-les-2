document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";

// gameWindow reference
const gameWindow = document.getElementById("gameWindow");


let inventory = [];
const inventoryList = document.getElementById("inventoryList");
//FOREGROUND

const door1 = document.getElementById("door1")
const KeyElement = document.getElementById("key");
//main character code
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;



gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;





    if (e.target.id !== "heroImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);

    switch (e.target.id) {
        case "door1": door1.style.opacity = 0.7;
            break;


        case "key":

            showItem("rusty key", "rustyKey")

            break;

        default: door1.style.opacity = 1;

            break;
    }

    function getItem(itemName, itemId) {

    }
    function checkItem(itemId) {

    }
    /**
     * needs a name for displaying item and a html id name
     * @param {string} itemId 
     * @param {string} itemName 
     */
    function showItem(itemName, itemId) {
        console.log("you found a " + itemName + "!");
        const KeyElement = document.createElement("li");
        KeyElement.id = itemId;
        KeyElement.innerText = itemName;
        inventoryList.appendChild(KeyElement);
    }
    function removeItem(itemId, itemName) {

    }

}
