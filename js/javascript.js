document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";

// gameWindow reference
const gameWindow = document.getElementById("gameWindow");



const inventoryList = document.getElementById("inventoryList");
//FOREGROUND


// gamestttate
gameState = {
    "inventory": [],
    "coinPickedUp": false
}

//main character code
const KeyElement = document.getElementById("key");
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

runGame();

function runGame() {



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

                changeInventory("key", "Add")
                document.getElementById("key").remove();

                break;
            case "Well":
                if (gameState.coinPickedUp == false) {

                    changeInventory("coin", "Add");
                    gameState.coinPickedUp = true;

                } else {
                    console.log("There's no more coins in this well :(");
                }

                break;
            case "doorWizardHut":
                if (checkItem("key")) {
                    console.log("opened door");

                } else if (checkItem("coin")) {
                    changeInventory("coin", "remove");
                    console.log("oh no my lucky Coin fell through the door opening");
                } else {
                    console.log("fuck this door");
                }
                break;
            case "statue":
                console.log("hey wanna know where the key is? it is behind some grave i heard");
            default:
                break;

        }

    }


    /**
     *  this function adds or removes item in inventory
     * @param {string} itemName 
     * @param {string} action 
     */
    function changeInventory(itemName, action) {
        if (itemName == null || action == null) {
            console.error("wrong parameters given to changeInventory");
            return;
        }
        switch (action) {

            case "Add":
                gameState.inventory.push(itemName);
                break;
            case "remove":
                gameState.inventory = gameState.inventory.filter(function (newInventory) {
                    return newInventory !== itemName;
                });
                document.getElementById("inv-" + itemName).remove();

                break;

        }
        updateInventory(gameState.inventory, inventoryList)
    }




    /**   
     * removes item from array
     * @param {string} itemName 
     * @param {string} itemId 
     */

    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            gameState.inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log(inventory);
    }
    function checkItem(itemId) {
        return gameState.inventory.includes(itemId);
    }



    function updateInventory(inventory, inventoryList) {
        inventoryList.innerHTML = '';
        inventory.forEach(function (item) {
            const inventoryItem = document.createElement("li");
            inventoryItem.id = "inv-" + item;
            inventoryItem.innerText = item;
            inventoryList.appendChild(inventoryItem);
        }
        );
    }
}