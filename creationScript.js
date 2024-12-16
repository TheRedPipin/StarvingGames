//class
class mother {
    constructor({name,age,gender,district}) { 
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.district = district;
    
    }
}
/*
function start(){
    //ask for contestent names
    let count = 0;
    let contestentList = [];
    while (count < 24) {
        let contestentName = prompt("Enter contestent" +count);
        count +=1;
        contestentList.push(contestentName);
        console.log(contestentList);
    }
    switchARoo()
}
*/

function switchARoo(){
    localStorage.setItem("names", document.getElementById("theInput").value)
    window.location.href = "./simulationIndex.html";
}

/*
    //objects
    //district 1
    const contestent1 = new mother({name:contestentList[0], age:"30", gender:"M", district:1});
    const contestent2 = new mother({name:contestentList[1], age:"45", gender:"F", district:1});
    //district 2
    const contestent3 = new mother({name:contestentList[2], age:"12", gender:"M", district:2});
    const contestent4 = new mother({name:contestentList[3], age:"16", gender:"F", district:2});
    //district 3
    const contestent5 = new mother({name:contestentList[4], age:"32", gender:"M", district:3});
    const contestent6 = new mother({name:contestentList[5], age:"41", gender:"F", district:3});
    //district 4
    const contestent7 = new mother({name:contestentList[6], age:"78", gender:"M", district:4});
    const contestent8 = new mother({name:contestentList[7], age:"18", gender:"F", district:4});
    //district 5
    const contestent9 = new mother({name:contestentList[8], age:"23", gender:"M", district:5});
    const contestent10 = new mother({name:contestentList[9], age:"34", gender:"F", district:5});
    //district 6
    const contestent11 = new mother({name:contestentList[10], age:"17", gender:"M", district:6});
    const contestent12 = new mother({name:contestentList[11], age:"42", gender:"F", district:6});
    //district 7
    const contestent13 = new mother({name:contestentList[12], age:"14", gender:"M", district:7});
    const contestent14 = new mother({name:contestentList[13], age:"56", gender:"F", district:7});
    //district 8
    const contestent15 = new mother({name:contestentList[14], age:"16", gender:"M", district:8});
    const contestent16 = new mother({name:contestentList[15], age:"27", gender:"F", district:8});
    //district 9
    const contestent17 = new mother({name:contestentList[16], age:"29", gender:"M", district:9});
    const contestent18 = new mother({name:contestentList[17], age:"21", gender:"F", district:9});
    //district 10
    const contestent19 = new mother({name:contestentList[18], age:"11", gender:"M", district:10});
    const contestent20 = new mother({name:contestentList[19], age:"27", gender:"F", district:10});
    //district 11
    const contestent21 = new mother({name:contestentList[20], age:"17", gender:"M", district:11});
    const contestent22 = new mother({name:contestentList[21], age:"36", gender:"F", district:11});
    //district 12
    const contestent23 = new mother({name:contestentList[22], age:"15", gender:"M", district:12});
    const contestent24 = new mother({name:contestentList[23], age:"14", gender:"F", district:12});
*/