let seconds = 0;
let minutes = 0;
let hours = 7;
let days = 0;
let aliveCount = 0;
let mapData = []
let actionWords = ["Moves", "Eat", "Fight", "Sleep", "Environment"]
let colours = ["blue", "yellow", "red", "yellow"]
let letters = ["A","B","C","D","E"]
window.onload = function() {
    //[boxIndex, district, gender]
    const districts = [
        { name: "District 1", numbers: [[0,0,0], [1,0,1]] },
        { name: "District 4", numbers: [[6,3,0], [7,3,1]] },
        { name: "District 2", numbers: [[2,1,0], [3,1,1]] },
        { name: "District 5", numbers: [[8,4,0], [9,4,1]] },
        { name: "District 3", numbers: [[4,2,0], [5,2,1]] },
        { name: "District 6", numbers: [[10,5,0], [11,5,1]] },
        { name: "District 7", numbers: [[12,6,0], [13,6,1]] },
        { name: "District 10", numbers: [[18,9,0], [19,9,1]] },
        { name: "District 8", numbers: [[14,7,0], [15,7,1]] },
        { name: "District 11", numbers: [[20,10,0], [21,10,1]] },
        { name: "District 9", numbers: [[16,8,0], [17,8,1]] },
        { name: "District 12", numbers: [[22,11,0], [23,11,1]] },
    ];

    // get references to the outer containers for the districts
    const districtsOuterLeft = document.querySelector("#districtsOuterLeft");
    const districtsOuterRight = document.querySelector("#districtsOuterRight");

    // loop through each district and build the structure dynamically
    districts.forEach((district, index) => {
        const districtWrapper = document.createElement("div"); // container for each district
        // create the district name text
        const districtText = document.createElement("div");
        districtText.classList.add("disctrictText");
        districtText.innerText = district.name;
        districtWrapper.appendChild(districtText);
    
        // create the grid container for district boxes
        const griddy = document.createElement("div");
        griddy.classList.add("griddy");
    
        // create individual boxes for contestants
        district.numbers.forEach((nums) => {
            const districtBox = document.createElement("div");
            districtBox.classList.add("disctrictBox");
            districtBox.setAttribute("boxIndex", nums[0]);
            districtBox.setAttribute("boxDistrict", nums[1]);
            districtBox.setAttribute("boxGender", nums[2]);
            
            // add name and age fields inside the box
            const namesText = document.createElement("div");
            namesText.classList.add("namesText");
            namesText.id = `name${nums[0]}`;
            districtBox.appendChild(namesText);
    
            const ageText = document.createElement("div");
            ageText.classList.add("ageText");
            ageText.id = `age${nums[0]}`;
            districtBox.appendChild(ageText);
    
            griddy.appendChild(districtBox);
        });
    
        districtWrapper.appendChild(griddy);

        // append district to the left or right container based on index
        if (index < 6) {
            districtsOuterLeft.appendChild(districtWrapper);
        } else {
            districtsOuterRight.appendChild(districtWrapper);
        }
    });

    // load contestant data from local storage
    let contestants = JSON.parse(localStorage.getItem("contestantData"));
    let districtNumber = 0;

    // get all district boxes and the info box for displaying stats
    const boxElements = document.querySelectorAll(".disctrictBox");
    const infoBoxOuter = document.querySelector(".infoBoxOuter");

    // append infoBoxOuter to the body
    document.body.appendChild(infoBoxOuter);

    // populate name and age data into boxes
    for (let boxNum = 0; boxNum < 24; boxNum++) {
        const genderIndex = boxNum % 2; // determine gender (0 for male, 1 for female)
        const contestant = contestants[districtNumber][genderIndex];
        console.log(contestant)
        if (contestant.contestantName == "") {
            document.getElementById("name" + boxNum).innerHTML = "N/A";
        } else {
            document.getElementById("name" + boxNum).innerHTML = contestant.contestantName;
            document.getElementById("age" + boxNum).innerHTML = contestant.age;
        }
        if (contestant.status === 0) {
            const boxElement = document.getElementById("name" + boxNum).parentElement;
            boxElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)"; // faint red background
            const tempDiv = document.createElement("div")
            tempDiv.innerHTML = "X"
            tempDiv.style.color = "red"
            tempDiv.style.fontSize = "40px"
            tempDiv.style.textAlign = "center"
            tempDiv.style.justifyContent = "center"
            boxElement.appendChild(tempDiv)
        }
        else{
            aliveCount += 1
        }
        if (boxNum % 2 == 1) {
            districtNumber += 1; // move to the next district after two boxes
        }
    }

    // add hover events to display contestant stats
    boxElements.forEach(districtBox => {
        districtBox.addEventListener("mouseover", () => {
            const rect = districtBox.getBoundingClientRect();
            infoBoxOuter.style.top = `${rect.bottom + window.scrollY + 5}px`;
            infoBoxOuter.style.left = `${rect.left + window.scrollX}px`;
            infoBoxOuter.classList.add("show");

            // get contestant stats and display them
            const district = districtBox.getAttribute("boxDistrict");
            const gender = districtBox.getAttribute("boxGender");
            const stats = contestants[district][gender].stats;
            if (Object.keys(stats).length == 0) {
                infoBoxOuter.innerHTML = "N/A";
            } else {
                infoBoxOuter.innerHTML = `Strength: ${stats.strength}<br>Intelligence: ${stats.intelligence}<br>Speed: ${stats.speed}<br>Constitution: ${stats.constitution}<br>Charisma: ${stats.charisma}`;
            }
        });
        districtBox.addEventListener("mouseout", () => {
            infoBoxOuter.classList.remove("show");
        });
    });

    let dayNightCycle = document.getElementById("contextBoxDataText");
    
    //speed up time
    setInterval(function updateContextBoxHeading(){
        seconds +=1;
        if (seconds >= 60){
            seconds = 0;
            minutes +=1;
        }
        if (minutes >= 60) {
            minutes = 0;
            hours += 1;
        }
        if (hours >= 24) {
            hours = 0;
            days += 1;
        }
        //display time increment 
        document.getElementById("timeText").innerText = `Time: ${hours.toString()}:${minutes < 10 ? "0" + minutes.toString():  minutes.toString()}`;
        document.getElementById("dayText").innerText = `Day: ${days.toString()}`
        document.getElementById("aliveText").innerText = `Alive: ${aliveCount.toString()}`
        updateMap()
    }, 10);

    let contextQueue = [];
    let isProcessingQueue = false;

    function processQueue() {
        if (contextQueue.length > 0 && !isProcessingQueue) {
            isProcessingQueue = true;
            const { type, content } = contextQueue.shift();
            if (type === "world") {
                contextBoxContentWorld(content.location, content.event);
            } else if (type === "person") {
                contextBoxContentPerson(content.person, content.action, content.details);
                if (content.action === 0) { // Moves
                    mapData[content.person.location[0]][content.person.location[1]] -= 1;
                    let movementRandom = Math.floor(Math.random() * 4);
                    while (true) {
                        if (movementRandom == 0 && content.person.location[0] > 0) {
                            content.person.location[0] -= 1;
                            break;
                        } else if (movementRandom == 1 && content.person.location[0] < 4) {
                            content.person.location[0] += 1;
                            break;
                        } else if (movementRandom == 2 && content.person.location[1] > 0) {
                            content.person.location[1] -= 1;
                            break;
                        } else if (movementRandom == 3 && content.person.location[1] < 4) {
                            content.person.location[1] += 1;
                            break;
                        } else {
                            movementRandom = Math.floor(Math.random() * 4);
                        }
                    }
                    mapData[content.person.location[0]][content.person.location[1]] += 1;
                }
            }
            setTimeout(() => {
                isProcessingQueue = false;
                processQueue();
            }, 1000);
        }
    }

    function randomInterval(callback, min, max) {
        const interval = Math.floor(Math.random() * (max - min + 1) + min);
        setTimeout(() => {
            callback();
            randomInterval(callback, min, max);
        }, interval);
    }

    randomInterval(function humanLogicUpdate() {
        contestants.forEach((district, index) => {
            for (let i = 0; i < 2; i++) {
                if (district[i].status == 0) {
                    return;
                }
                // environmental logic
                let environmentalEvents = ["Flood", "Earthquake", "Quicksand", "Storms"];
                let environmentalRandom = Math.random();
                if (environmentalRandom > 0.8) {
                    let location = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
                    let environmentalEvent = Math.floor(Math.random() * 3);
                    contextQueue.push({ type: "world", content: { location, event: environmentalEvents[environmentalEvent] } });
                }
                // movement logic
                let instinctRandom = Math.random();
                let lightbulbMoment = Math.random();
                if (instinctRandom > 0.1) { // 10% chance of them moving
                    if ((district[i].stats.strength < district[i].stats.intelligence) && (mapData[district[i].location[0]][district[i].location[1]] >= 2) || (lightbulbMoment > 0.8)) {
                        contextQueue.push({ type: "person", content: { person: district[i], action: 0, details: `${letters[district[i].location[0]]}${district[i].location[1] + 1}` } });
                    } else if (district[i].stats.strength > district[i].stats.intelligence) {
                        contextQueue.push({ type: "person", content: { person: district[i], action: 2, details: "Jesus" } });
                    }
                }
            }
        });
        processQueue();
    }, 1000, 10000);

    function updateMap(){
        mapData = []
        for (let i = 0; i < 5; i++){
            mapData.push([])
            for (let j = 0; j < 5; j++){
                mapData[i].push(0)
            }
        }
        contestants.forEach((district) => {
            for (let i = 0;i<2;i++){
                if (district[i].status == 0){
                    return
                }
                //in [male, female (location 0 = male and location 1 = female)]
                mapData[district[i].location[0]][district[i].location[1]] += 1
            }
        })
        //Attempt at a red dot marker
        let boxId = 0;
        let mapUpdated = false;
        outerLoop:
        for (let rowIndex = 0; rowIndex < mapData.length; rowIndex++) {
            for (let colIndex = 0; colIndex < mapData[rowIndex].length; colIndex++) {
                if (document.getElementById(`section${boxId}`).childElementCount !== mapData[rowIndex][colIndex]) {
                    mapUpdated = true;
                    break outerLoop;
                }
                boxId += 1;
            }
        }
        if (mapUpdated) {
            boxId = 0;
            const dots = document.querySelectorAll('.redDot');
            dots.forEach(dot => {
                dot.remove();
            });
            mapData.forEach((element, rowIndex) => {
            element.forEach((section, colIndex) => {
                const sectionBox = document.getElementById(`section${boxId}`);
                for (let i = 0; i < section; i++) {
                    let dot = document.createElement("div");
                    dot.classList.add("redDot");
                    dot.id = `redDot${colIndex}${rowIndex}${i}`;
                    dot.style.position = "absolute";
                    dot.style.top = `${Math.random() * 90}%`;
                    dot.style.left = `${Math.random() * 90}%`;
                    sectionBox.appendChild(dot);
                }
                boxId += 1;
            });
            });
        }
    }

    function contextBoxContentWorld(location, type){
        const contextBoxText = document.getElementById("contextBoxText");
        const isScrolledToBottom = contextBoxText.scrollHeight - contextBoxText.clientHeight <= contextBoxText.scrollTop + 1;
        contextBoxText.innerHTML += `${document.getElementById("dayText").innerText} ${document.getElementById("timeText").innerText} ${letters[location[0]]}${location[1]+1} ${type}<br>`;
        if (isScrolledToBottom) {
            contextBoxText.scrollTop = contextBoxText.scrollHeight - contextBoxText.clientHeight;
        }
    }

    function contextBoxContentPerson(person, action, details){
        const contextBoxText = document.getElementById("contextBoxText");
        const isScrolledToBottom = contextBoxText.scrollHeight - contextBoxText.clientHeight <= contextBoxText.scrollTop + 1;
        let statusColors = ["red", "green"];
        let nameTextColor = statusColors[person.status];
        let actionTextColor = 0;
        if (action == 0){
            actionTextColor = "blue"
        }
        else if (action == 1){
            actionTextColor = "yellow"
        }
        else if (action == 2){
            actionTextColor = "red"
        }
        else if (action == 3){
            actionTextColor = "yellow"
        }
        contextBoxText.innerHTML += `${document.getElementById("dayText").innerText} ${document.getElementById("timeText").innerText} <span style="color:${nameTextColor};">${person.contestantName}</span> <span style="color:${colours[action]};">${actionWords[action]}</span> ${details}<br>`;
        if (isScrolledToBottom) {
            contextBoxText.scrollTop = contextBoxText.scrollHeight - contextBoxText.clientHeight;
        }
    }
};
//let actionWords = ["Moves", "Eat", "Fight", "Sleep"] let colours = ["blue", "yellow", "red", "yellow"]