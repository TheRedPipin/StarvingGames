//class
let background = [
    {"strength":2, "intelligence":8, "speed":3, "constitution": 5, "charisma":5},
    {"strength":8, "intelligence":2, "speed":5, "constitution": 5, "charisma":5},
    {"strength":2, "intelligence":5, "speed":8, "constitution": 5, "charisma":5}
];
let lastValue = 0;
let statBlock = {}
let contestents = []
//dictionary of backgrounds
background["strength"] = 0;
background["intelligence"] = 0;
background["speed"] = 0;
background["constitution"] = 0;
background["charisma"] = 0;

//backgroundSelect holds the button click. gender is the second index
function backgroundClick(backgroundSelect, gender){
    contestents[lastValue][gender].background = backgroundSelect;

    const statBlock = ["strength", "intelligence", "speed", "constitution", "charisma"].reduce((stats, stat) => {
        let statValue = background[backgroundSelect][stat] + Math.floor(Math.random() * background[backgroundSelect][stat]);
        stats[stat] = statValue > 10 ? 10 : statValue;
        return stats;
    }, {});
    
    contestents[lastValue][gender].stats = statBlock;
    console.log(statBlock)
};




class mother {
    constructor({contestentName,age,gender,district,background,stats}) { 
        this.contestentName = contestentName;
        this.age = age;
        this.gender = gender;
        this.district = district;
        this.background = background;
        this.stats = stats;
    };
};

for(let i = 0; i < 12; i++){
    contestents.push(
        [new mother({contestentName:"", age:0, gender:"M", district:i, background:0, stats:{}}), new mother({contestentName:"", age:0, gender:"F", district:i, background:0, stats:{}})]
        );
}


function end(){
    //male
    contestents[lastValue][0].contestentName = document.getElementById("tempNameInputMale").value;
    contestents[lastValue][0].age = document.getElementById("tempAgeInputMale").value;
    

    
    //female
    contestents[lastValue][1].contestentName = document.getElementById("tempNameInputFemale").value;
    contestents[lastValue][1].age = document.getElementById("tempAgeInputFemale").value;
    
    return
}

//calls in html creationIndex with alll the indexes (trust)
function districtChoice(districtNumber){
    //drop down name change
    document.getElementById("dropButton").innerHTML = "District " + (districtNumber+1);
    
    //male
    contestents[lastValue][0].contestentName = document.getElementById("tempNameInputMale").value;
    document.getElementById("tempNameInputMale").value = contestents[districtNumber][0].contestentName;
    contestents[lastValue][0].age = document.getElementById("tempAgeInputMale").value;
    document.getElementById("tempAgeInputMale").value = contestents[districtNumber][0].age;

    //female
    contestents[lastValue][1].contestentName = document.getElementById("tempNameInputFemale").value;
    document.getElementById("tempNameInputFemale").value = contestents[districtNumber][1].contestentName;
    contestents[lastValue][1].age = document.getElementById("tempAgeInputFemale").value;
    document.getElementById("tempAgeInputFemale").value = contestents[districtNumber][1].age;
    //reset 
    lastValue = districtNumber;
}



//switch page
function switchARoo(){
    end()
    localStorage.setItem("contestentData" , JSON.stringify(contestents))
    window.location.href = "./simulationIndex.html";
}

setInterval(function update(){
    //pass
},10)