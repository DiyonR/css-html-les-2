document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";




// gamestttate
let gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false,
    "swordPickedUp": false
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



    document.getElementById("mainTitle").innerText = "'The Escape Room Game where it all starts with the door.'";

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
    const swordElement = document.getElementById("sword");

    if (gameState.keyPickedUp) {
        document.getElementById("key").remove();
    }
    if (gameState.swordPickedUp) {
        document.getElementById("sword").remove();
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
                    } break;
                case "sword":

                    changeInventory("sword", "Add");
                    document.getElementById("sword").remove();
                    gameState.swordPickedUp = true;
                    saveGameState(gameState);
                    console.log("yooooo");
                    break;

                case "doorWizardHut":
                    if (checkItem("key")) {
                        changeInventory("key", "remove");
                        showMessage(heroSpeech, "the door opened!, anybody inside?", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4 * sec, counterSpeech, "do you have the coin?", counterAudio);
                        setTimeout(showMessage, 8 * sec, heroSpeech, "erm no, where can i find it?", heroAudio);
                        setTimeout(showMessage, 12 * sec, counterSpeech, "'somewhere far from here on the end of the pathway to heaven, now search'", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                        console.log("opened door");

                    } else if (checkItem("coin")) {
                        changeInventory("coin", "remove");
                        showMessage(heroSpeech, "I found the coin you asked for", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4 * sec, counterSpeech, "very well now i just need sword", counterAudio);
                        setTimeout(showMessage, 8 * sec, heroSpeech, "soooo, where is it?", heroAudio);
                        setTimeout(showMessage, 12 * sec, counterSpeech, "'like pirates they always find the treasure in a ...'", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                    }
                    else if (checkItem("sword")) {
                        changeInventory("sword", "remove");
                        document.getElementById("mainTitle").innerText = "You Win!";
                        showMessage(heroSpeech, "Finally I am FREE!", heroAudio);
                    }
                    else {
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
                case "chest1":
                    showMessage(heroSpeech, "hmm not here", heroAudio)
                    break;
                case "chest2":
                    showMessage(heroSpeech, "sup wooden chest", heroAudio)
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4 * sec, counterSpeech, "my guyyy, how are you??", counterAudio);
                    setTimeout(showMessage, 8 * sec, heroSpeech, "no time for chatting, give me the sword", heroAudio);
                    setTimeout(showMessage, 12 * sec, counterSpeech, "ugh its by some logs", counterAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);

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