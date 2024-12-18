
//class
let contestentList = [];
let stats = {};
let background = 0;
let tempNames = [];
let tempAge = [];
let lastValue = 0;

for(let i = 0; i < 12; i++){
    tempNames.push(["",""]);
    tempAge.push(["", ""]);
    
}

class mother {
    constructor({name,age,gender,district,stats}) { 
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.district = district;
        this.stats = stats;
    }
}


function end(){
    //ask for contestent names
    let count = 0;
    while (count < 12) {
        contestentList.push(tempNames[count][0]);
        contestentList.push(tempNames[count][1]);
        //strength is a key
        stats["strength"] = 0;
        stats["speed"] = 0;
        stats["intelligence"] = 0;
        stats["charisma"] = 0;
        console.log(stats);
        count +=1;
    }
}
//calls in html creationIndex with alll the indexes (trust)
function districtChoice(districtNumber){
    //temp name
    tempNames[lastValue][0] = document.getElementById("tempNameInputMale").value;
    document.getElementById("tempNameInputMale").value = tempNames[districtNumber][0];

    tempNames[lastValue][1] = document.getElementById("tempNameInputFemale").value;
    document.getElementById("tempNameInputFemale").value = tempNames[districtNumber][1];
    //temp age
    tempAge[lastValue][0] = document.getElementById("tempAgeInputMale").value;
    document.getElementById("tempAgeInputMale").value = tempAge[districtNumber][0];
    tempAge[lastValue][1] = document.getElementById("tempAgeInputFemale").value;
    document.getElementById("tempAgeInputFemale").value = tempAge[districtNumber][1];
    //reset 
    lastValue = districtNumber;
}



//switch page
function switchARoo(){
    end()
    localStorage.setItem("names" , JSON.stringify(contestentList))
    window.location.href = "./simulationIndex.html";
}
