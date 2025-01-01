const randomFirstNames = [
    "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Avery", "Peyton", "Quinn",
    "Skyler", "Ella", "Dakota", "Harper", "Rowan", "Sawyer", "Emerson", "Finley", "Hayden", "Parker",
    "Blake", "Cameron", "Drew", "Elliot", "Jesse", "Kai", "Logan", "Micah", "Nico", "Phoenix",
    "River", "Sage", "Tatum", "Wren", "Arden", "Briar", "Charlie", "Dylan", "Eden", "Frankie",
    "Gray", "Hollis", "Indigo", "Jules", "Kendall", "Lennon", "Ryan", "Noel", "Oakley", "Reagan"
];

const randomLastNames = [
    "Smith", "Johnson", "Engel", "Hastwell", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Brown", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

window.onload = function(){
    document.getElementById("tempAgeInputMale").value = 0;
    document.getElementById("tempAgeInputFemale").value = 0;

    setInterval(function update(){
        let checks = [false, false];
        if (document.getElementById("tempAgeInputMale").value && document.getElementById("tempAgeInputMale").value != 0 && document.getElementById("tempNameInputMale").value && contestants[lastValue][0].background !== null){
            document.getElementById("maleStatus").style.color = "green";
            checks[0] = true;
        }
        else{
            document.getElementById("maleStatus").style.color = "black";
            checks[0] = false;
        }
        if (document.getElementById("tempAgeInputFemale").value && document.getElementById("tempNameInputFemale").value && contestants[lastValue][1].background !== null){
            document.getElementById("femaleStatus").style.color = "green";
            checks[1] = true;
        }
        else{
            document.getElementById("femaleStatus").style.color = "black";
            checks[1] = false;
        }
        if (checks[0] == true && checks[1] == true){
           completeDistricts[lastValue] = true;
        }
        else{
            completeDistricts[lastValue] = false;
        }
    },10);
    
    setInterval(function update(){
        completeDistricts.forEach((item, index) => {
            if (item){
                document.getElementById(`district${index}`).style.color = "black";
                document.getElementById(`district${index}`).style.fontWeight = "bolder";
                document.getElementById(`district${index}`).style.backgroundColor = "Chartreuse"
            }
            else{
                document.getElementById(`district${index}`).style.color = "";
                document.getElementById(`district${index}`).style.backgroundColor = ""
                document.getElementById(`district${index}`).style.fontWeight = "";
            }
        });
    },10);
};

//defines the background stats
let background = [
    {"strength":2, "intelligence":9, "speed":3, "constitution": 4, "charisma":6}, // Scholar
    {"strength":8, "intelligence":2, "speed":4, "constitution": 7, "charisma":3}, // Miner
    {"strength":3, "intelligence":5, "speed":9, "constitution": 4, "charisma":2}, // Thief
    {"strength":4, "intelligence":4, "speed":4, "constitution": 4, "charisma":4}, // Average Joe
    {"strength":9, "intelligence":3, "speed":2, "constitution": 8, "charisma":4}, // Warrior
    {"strength":3, "intelligence":5, "speed":6, "constitution": 4, "charisma":8}  // Diplomat
];
let lastValue = 0; //tracks the last selected district
let contestants = []; //array to store all contestants
let completeDistricts = [];
for (let i = 0; i < 12; i++) {
    completeDistricts.push(false);
}

//backgroundSelect holds the button click. gender is the second index
function backgroundClick(backgroundSelect, gender){
    //change the button color to green when clicked
    document.getElementById(`bkg${backgroundSelect}${gender}`).style.backgroundColor = "green";
    //reset all other buttons of the same gender to grey
    for (let i = 0; i < background.length; i++) {
        if (i !== backgroundSelect) {
            document.getElementById(`bkg${i}${gender}`).style.backgroundColor = "";
        }
    }
    //sets the chosen contestants background to the selected
    contestants[lastValue][gender].background = backgroundSelect;
    
    //creates a array of all stats and loops through it
    const statBlock = ["strength", "intelligence", "speed", "constitution", "charisma"].reduce((stats, stat) => {
        //sets statValue according to the stat formula
        let statValue = background[backgroundSelect][stat] + Math.floor(Math.random() * background[backgroundSelect][stat]);
        //caps stats at 10
        stats[stat] = Math.min(statValue, 10);
        //ends the function
        return stats;
    }, {});
    
    //sets the contestants stats to the generated ones
    contestants[lastValue][gender].stats = statBlock;
}

//Class Innit
class mother {
    constructor({contestantName,age,gender,district,background,stats}) { 
        this.contestantName = contestantName;
        this.age = age;
        this.gender = gender;
        this.district = district;
        this.background = background;
        this.stats = stats;
    }
}

//create an array of 12 districts, each with a male and female contestant
for(let i = 0; i < 12; i++){
    contestants.push(
        [new mother({contestantName:"", age:0, gender:"M", district:i, background:null, stats:{}}), new mother({contestantName:"", age:0, gender:"F", district:i, background:null, stats:{}})]
    );
}

//Final update of contestant data
function end(){
    //male
    contestants[lastValue][0].contestantName = document.getElementById("tempNameInputMale").value;
    contestants[lastValue][0].age = document.getElementById("tempAgeInputMale").value;
    
    //female
    contestants[lastValue][1].contestantName = document.getElementById("tempNameInputFemale").value;
    contestants[lastValue][1].age = document.getElementById("tempAgeInputFemale").value;
    
    return;
}

//handles district selection and updates the inputs to match selected district
function districtChoice(districtNumber){
    //drop down name change
    document.getElementById("dropButton").innerHTML = "District " + (districtNumber+1);

    //resets button colours
    for (let i = 0; i < background.length; i++) {
        document.getElementById(`bkg${i}${0}`).style.backgroundColor = "";
        document.getElementById(`bkg${i}${1}`).style.backgroundColor = "";
    }
    
    //saves male contestant data
    contestants[lastValue][0].contestantName = document.getElementById("tempNameInputMale").value;
    contestants[lastValue][0].age = document.getElementById("tempAgeInputMale").value;

    //saves female contestant data
    contestants[lastValue][1].contestantName = document.getElementById("tempNameInputFemale").value;
    contestants[lastValue][1].age = document.getElementById("tempAgeInputFemale").value;
    
    //loads new male values into the input fields
    document.getElementById("tempNameInputMale").value = contestants[districtNumber][0].contestantName;
    document.getElementById("tempAgeInputMale").value = contestants[districtNumber][0].age;
    if (contestants[districtNumber][0].background !== null) {
        document.getElementById(`bkg${contestants[districtNumber][0].background}0`).style.backgroundColor = "green";
    }
    
    //loads new female values into the input fields
    document.getElementById("tempNameInputFemale").value = contestants[districtNumber][1].contestantName;
    document.getElementById("tempAgeInputFemale").value = contestants[districtNumber][1].age;
    if (contestants[districtNumber][1].background !== null) {
        document.getElementById(`bkg${contestants[districtNumber][1].background}1`).style.backgroundColor = "green";
    }
    //reset 
    lastValue = districtNumber;
}

function randomise(tempGender){
    let tempName = randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)] + " " + randomLastNames[Math.floor(Math.random() * randomLastNames.length)];
    let tempAge = Math.floor(Math.random() * (20 - 12) + 12);
    for (let i = 0; i < background.length; i++) {
        document.getElementById(`bkg${i}${tempGender}`).style.backgroundColor = "";
    }
    if (tempGender == 0){
        document.getElementById("tempNameInputMale").value = tempName;
        document.getElementById("tempAgeInputMale").value = tempAge;
    }
    else{
        document.getElementById("tempNameInputFemale").value = tempName;
        document.getElementById("tempAgeInputFemale").value = tempAge;
    }
    backgroundClick(Math.floor(Math.random() * background.length), tempGender)
}

//switch page
function switchARoo(){
    end(); //finalize current contestant data
    contestants.forEach((district, index) => {
        for (let g = 0; g < 2; g++){
            console.log(district[g])
            if ((district[g].contestantName == "") || (district[g].age == 0) || (district[g].background == null)){
                district[g].contestantName = "N/A"
                district[g].age = 0
                district[g].background = null
                district[g].stats = {}
            }
        }
    });
    localStorage.setItem("contestantData" , JSON.stringify(contestants)); //save data to local storage
    window.location.href = "./simulationIndex.html";  //save data to local storage
}