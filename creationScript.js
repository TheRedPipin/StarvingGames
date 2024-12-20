//class
let background = 0;
let lastValue = 0;
let contestents = []

class mother {
    constructor({contestentName,age,gender,district,stats}) { 
        this.contestentName = contestentName;
        this.age = age;
        this.gender = gender;
        this.district = district;
        this.stats = stats;
    }
}

for(let i = 0; i < 12; i++){
    contestents.push(
        [new mother({contestentName:"", age:0, gender:"M", district:i, stats:{}}), new mother({contestentName:"", age:0, gender:"F", district:i, stats:{}})]
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