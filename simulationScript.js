window.onload = function(){
    let contestents = JSON.parse(localStorage.getItem("contestentData"));
    console.log(contestents);
    let districtNumber = 0;

    //male
    for (boxNum = 0; boxNum < 24; boxNum+=2){
        document.getElementById("name" + boxNum).innerHTML = contestents[districtNumber][0].contestentName;
        document.getElementById("age" + boxNum).innerHTML = contestents[districtNumber][0].age;
        districtNumber += 1;
    };

    //female
    districtNumber = 0;
    for (boxNum = 1; boxNum < 25; boxNum+=2){
        document.getElementById("name" + boxNum).innerHTML = contestents[districtNumber][1].contestentName;
        document.getElementById("age" + boxNum).innerHTML = contestents[districtNumber][1].age;
        districtNumber += 1;
    };
};

