document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";

// gameWindow reference
const gameWindow = document.getElementById("gameWindow");


let inventory = [];
console.log(inventory);
const inventoryList = document.getElementById("inventoryList");
//FOREGROUND


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
        case "key":
            getItem("Rusty key", "rustyKey");
            break;
        case "well":
            getItem("Coin", "Coin");
            break;
        case "doorWizardHut":
            if (checkItem("Rusty key")) {
                console.log("opened door");
            } else if (checkItem("Coin")) {
                removeItem("Coin", "Coin");
                console.log("oh no my lucky Coin fell through the door opening");
            } else {
                console.log("fuck this door");
            }
            break;
        default:
            break;

    }


    /**   
     * removes item from array
     * @param {string} itemName 
     * @param {string} itemId 
     */

    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log(inventory);
    }
    function checkItem(itemId) {
        return inventory.includes(itemId);
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
        //remove item in array
        inventory = inventory.filter(function (newInventory) {
            return newInventory !== itemName;
        }
        );
        document.getElementById(itemId).remove();
    }

}
