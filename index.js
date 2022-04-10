
let userName = location.search.substring(1).split('=')[1].replace('+',' ');
// date
let dateContainer = document.querySelector("#date");

let userObject = {
    name : userName
}

let postUser = async function (userObject)
{
    try
    {
        let response = await fetch('https://node-monge-iti-project.herokuapp.com/games', {
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userObject)
        });
        return  await response.json();
    }
    catch(e)
    {
        console.log(e);
    }
}

let userDate;

window.addEventListener(`DOMContentLoaded`, async function(){

    let userLastLogindate = await getUserLastLoginDate(userName);
    userDate = new Date(userLastLogindate.date);
    
    // console.log(userDate.toLocaleString());

    dateContainer.innerText=`${userDate.toLocaleString()}`;

});

let getUserLastLoginDate = async function(userName)
{
    try
    {
        let response = await fetch(`https://node-monge-iti-project.herokuapp.com/games/${userName}`);
        let userData = await response.json();
        return userData;
    }
    catch(e)
    {
        console.log(e);
    }
}



