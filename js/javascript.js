document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";




// gamestttate
let gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false
}


localStorage.removeItem("gameState");


if (Storage) {
    if (localStorage.gameState) {
        // uses localstorage gamestate string and convert it to an object then store it into gameState
        gameState = JSON.parse(localStorage.gameState);
    } else {
        // convert local object variable to a string then store it to local storage
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}



function runGame() {

    // gameWindow reference
    const gameWindow = document.getElementById("gameWindow");
    const inventoryList = document.getElementById("inventoryList");

    const sec = 1000;
    //main character code

    const mainCharacter = document.getElementById("hero");
    const offsetCharacter = 16;
    //speechBubbles
    const heroSpeech = document.getElementById("heroSpeech");
    const counterSpeech = document.getElementById("counterSpeech");
    //audio for dialoge
    const heroAudio = document.getElementById("heroAudio");
    const counterAudio = document.getElementById("counterAudio");
    //avatar 
    const counterAvatar = document.getElementById("counterAvatar");

    // objects
    const KeyElement = document.getElementById("key");

    if (gameState.keyPickedUp) {
        document.getElementById("key").remove();
    }

    updateInventory(gameState.inventory, inventoryList);
    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;


        if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {

            if (e.target.id !== "heroImage") {
                mainCharacter.style.left = x - offsetCharacter + "px";
                mainCharacter.style.top = y - offsetCharacter + "px";
                console.log(e.target.id);
            }
            switch (e.target.id) {
                case "key":

                    changeInventory("key", "Add");
                    document.getElementById("key").remove();
                    gameState.keyPickedUp = true;
                    saveGameState(gameState);
                    break;
                case "Well":
                    if (gameState.coinPickedUp == false) {

                        changeInventory("coin", "Add");

                        gameState.coinPickedUp = true;
                        showMessage(heroSpeech, "Wow a coin", heroAudio);

                    } else {
                        console.log("There's no more coins in this well :(");
                        showMessage(heroSpeech, "hmm there are no coins here", heroAudio);
                    }

                    break;
                case "doorWizardHut":
                    if (checkItem("key")) {
                        showMessage(heroSpeech, "the door opened!, anybody inside?", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4 * sec, counterSpeech, "do you have the coin?", counterAudio);
                        setTimeout(showMessage, 8 * sec, heroSpeech, "erm no, where can i find it?", heroAudio);
                        setTimeout(showMessage, 12 * sec, counterSpeech, "somewhere far from here on the end of the pathway to heaven, now search", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                        console.log("opened door");

                    } else if (checkItem("key") && checkItem("coin")) {
                        changeInventory("coin", "remove");
                        showMessage(heroSpeech, "I found the coin you asked for", heroAudio);
                    } else if (checkItem("coin")) {
                        showMessage(counterSpeech, "No key?", counterAudio);
                    } else {
                        showMessage(heroSpeech, "I need a key..", heroAudio);

                        setTimeout(showMessage, 4 * sec, heroSpeech, "maybe I should look at the signs?", heroAudio);
                        console.log("fuck this door");
                    }
                    break;
                case "statue":
                    showMessage(heroSpeech, "hey a sign, looks alright..", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4 * sec, counterSpeech, "ALRIGHT?? I look amazing", counterAudio);
                    setTimeout(showMessage, 8 * sec, heroSpeech, "wait, do you know where the key is?", heroAudio);
                    setTimeout(showMessage, 12 * sec, counterSpeech, "yes, it is by the mushrooms.", counterAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);

                    console.log("hey wanna know where the key is? it is behind some grave i heard");
                    break;
                default:
                    break;
            }
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
        updateInventory(gameState.inventory, inventoryList);
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
    /**
     *  will show dialog and trigger sound
     * @param {getElementById} targetBubble 
     * @param {string} message 
     * @param {getElementById} targetSound
     */
    function showMessage(targetBubble, message, targetSound) {
        targetSound.currentTime = 0;
        targetSound.play();
        targetBubble.innerText = message;
        targetBubble.style.opacity = "1";
        checkDialog = true;
        setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);

    }
    /**
     * hides  the message and pauses the audio
     * @param {getElementById} targetBubble 
     * @param {getElementById} targetSound 
     */
    function hideMessage(targetBubble, targetSound) {
        targetSound.pause();

        targetBubble.style.opacity = "0";
    }
}
/**
 * saves gamestate into localStorage
 * @param {object} gameState 
 */
function saveGameState(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}

runGame();