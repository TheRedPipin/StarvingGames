window.onload = function(){
    document.getElementById("tempAgeInputMale").value = 0;
    document.getElementById("tempAgeInputFemale").value = 0;

    setInterval(function update(){
        let checks = [false, false];
        if (document.getElementById("tempAgeInputMale").value && document.getElementById("tempNameInputMale").value && contestants[lastValue][0].background !== null){
            document.getElementById("maleStatus").style.color = "green";
            checks[0] = true;
        }
        else{
            document.getElementById("maleStatus").style.color = "black";
        }
        if (document.getElementById("tempAgeInputFemale").value && document.getElementById("tempNameInputFemale").value && contestants[lastValue][1].background !== null){
            document.getElementById("femaleStatus").style.color = "green";
            checks[1] = true;
        }
        else{
            document.getElementById("femaleStatus").style.color = "black";
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
                document.getElementById(`district${index}`).style.color = "green";
                document.getElementById(`district${index}`).style.fontWeight = "bolder";
            }
            else{
                document.getElementById(`district${index}`).style.color = "";
            }
        });
    },10);
};

//defines the background stats
let background = [
    {"strength":2, "intelligence":8, "speed":3, "constitution": 5, "charisma":5},
    {"strength":8, "intelligence":2, "speed":5, "constitution": 5, "charisma":5},
    {"strength":2, "intelligence":5, "speed":8, "constitution": 5, "charisma":5}
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

//switch page
function switchARoo(){
    end(); //finalize current contestant data
    localStorage.setItem("contestantData" , JSON.stringify(contestants)); //save data to local storage
    window.location.href = "./simulationIndex.html";  //save data to local storage
}