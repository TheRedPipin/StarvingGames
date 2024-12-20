window.onload = function(){
    let contestents = JSON.parse(localStorage.getItem("contestentData"));
    console.log(contestents);
    for (let i = 0; i < 12; i++){
        console.log(contestents[i]);
        document.getElementById("name" + i).innerHTML = contestents[i][0].contestentName;
        document.getElementById("name" + (i+1)).innerHTML = contestents[i][1].contestentName;
    }
}