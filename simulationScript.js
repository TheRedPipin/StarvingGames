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

    // populate name and age data into boxes
    for (let boxNum = 0; boxNum < 24; boxNum++) {
        const genderIndex = boxNum % 2; // determine gender (0 for male, 1 for female)
        if (contestants[districtNumber][genderIndex].contestantName == "") {
            document.getElementById("name" + boxNum).innerHTML = "N/A";
        } else {
            document.getElementById("name" + boxNum).innerHTML = contestants[districtNumber][genderIndex].contestantName;
            document.getElementById("age" + boxNum).innerHTML = contestants[districtNumber][genderIndex].age;
        }
        if (boxNum % 2 == 1) {
            districtNumber += 1; // move to the next district after two boxes
        }
    }

    // add hover events to display contestant stats
    boxElements.forEach(districtBox => {
        districtBox.addEventListener("mouseover", () => {
            const rect = districtBox.getBoundingClientRect();
            infoBoxOuter.style.display = "flex";
            infoBoxOuter.style.top = `${rect.bottom + 5}px`;
            infoBoxOuter.style.left = `${rect.left}px`;

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
    
        // hide the stats box when mouse leaves
        districtBox.addEventListener("mouseout", () => {
            infoBoxOuter.style.display = "none";
        });
    });
};
