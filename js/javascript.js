document.getElementById("mainTitle").innerText = "Point And Click Adventure Game";




// gamestttate
gameState = {
    "inventory": [],
    "coinPickedUp": false
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
                        showMessage(heroSpeech, "the door has opened", heroAudio);
                        console.log("opened door");

                    } else if (checkItem("coin")) {
                        changeInventory("coin", "remove");
                        showMessage(heroSpeech, "oh no my lucky Coin fell through the door opening", heroAudio);


                    } else {
                        showMessage(heroSpeech, "fuck this door", heroAudio);
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

runGame();