window.onload = function(){
    let names = JSON.parse(localStorage.getItem("names"));
    console.log(names);
    for (let i = 0; i < 24; i++){
        console.log(i)
        console.log(names[i])
        document.getElementById("name" + i).innerHTML = names[i];
    };
    console.log(id="name1");
}