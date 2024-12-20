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
   statBlock = {"strength":0, "intelligence":0, "speed":0, "constitution": 0, "charisma":0};

   statBlock["strength"] = background[backgroundSelect]["strength"]  + Math.floor(Math.random() * background[backgroundSelect]["strength"]);
   if (statBlock["strength"] > 10){
    statBlock["strength"] = 10;
   }
   statBlock["intelligence"] = background[backgroundSelect]["intelligence"]  + Math.floor(Math.random() * background[backgroundSelect]["intelligence"]);
   if (statBlock["intelligence"] > 10){
    statBlock["intelligence"] = 10
   }
   statBlock["speed"] = background[backgroundSelect]["speed"]  + Math.floor(Math.random() * background[backgroundSelect]["speed"]);
   if (statBlock["speed"] > 10){
    statBlock["speed"] = 10
   }
   statBlock["constitution"] = background[backgroundSelect]["constitution"]  + Math.floor(Math.random() * background[backgroundSelect]["constitution"]);
   if (statBlock["constitution"] > 10){
    statBlock["constitution"] = 10
   }
   statBlock["charisma"] = background[backgroundSelect]["charisma"] + Math.floor(Math.random() * background[backgroundSelect]["charisma"]);
   if (statBlock["charisma"] > 10){
    statBlock["charisma"] = 10;
   }
   contestents[lastValue][gender].stats = statBlock;
   console.log(contestents[lastValue][gender]);
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

    //stats
    /*
    contestents[lastValue][0].stats = document.getElementById("statsMale").value;
    document.getElementById("statsMale").value = contestents[districtNumber][0].stats;
    */

    //female
    contestents[lastValue][1].contestentName = document.getElementById("tempNameInputFemale").value;
    document.getElementById("tempNameInputFemale").value = contestents[districtNumber][1].contestentName;
    contestents[lastValue][1].age = document.getElementById("tempAgeInputFemale").value;
    document.getElementById("tempAgeInputFemale").value = contestents[districtNumber][1].age;
    /*stats
    contestents[lastValue][1].stats = document.getElementById("statsFemale").value;
    document.getElementById("statsFemale").value = contestents[districtNumber][1].stats;
    */
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