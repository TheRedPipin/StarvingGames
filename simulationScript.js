let minutes = 0;
let hours = 0;
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
    let startingDate = new Date('2021-01-01T00:00:00');
    //speed up time
    setInterval(function updateStartingDate(){

        minutes += 1;
        if (minutes == 60) {
            minutes = 0;
            hours += 1;
        }
        document.getElementById("timeText").innerText = `Time: ${hours.toString()}:${minutes < 10 ? minutes.toString() : "0" + minutes.toString()}`;
    }, 1000);

};