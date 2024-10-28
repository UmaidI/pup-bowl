const main = document.querySelector(`main`);
// made main a global variable 

const getTeams = async () => {
  // to grab the team names I used fetch to call the api 
  const response =  await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/teams`);
  const teamInfo =  await response.json(); 
  // created a json to make it a readable stream
  const allTeams = teamInfo.data.teams;
  // used dot notation to find where the team names were 
  const teamNames = allTeams.map((team) => {
    return `
      <h2>${team.name}</h2>
  `
  // returned the team name
})
  const div = document.querySelector(`div`);
  // grabbed the div element
  div.innerHTML = teamNames.join(``);
  // this is where I put the team names 
}
getTeams();

const getPlayers = async () => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players`)
  const playerInfo = await response.json();
  const players = playerInfo.data.players;
  // this is how i used crud to get the players 
  const listOfNamedPlayers = players.map((individualPlayer) => {
    return `
      <li data-id ="${individualPlayer.id}">${individualPlayer.name}</li>
      `
      // I created a data set so i could use it to call the api and find each individual player
  })
    const OL = document.createElement(`ol`);
    // grabbed the ol
    OL.innerHTML = listOfNamedPlayers.join(``)
    // seperated them so there were no commas
    main.replaceChildren(OL);
    // used replace children method so we don't see the previous result of the click
}
const renderAllPlayers = async () => {
  await getPlayers();
// had to await getPlayers function because there were no list items on the page yet

const LIs = document.querySelectorAll(`li`);
LIs.forEach((playerLI)=>{
  playerLI.addEventListener(`click`, async (event)=>{
   const playerName = event.target.dataset.id;
   displayPlayerDetails(playerName);
      })
      // add an event listener for the function below for when you click on the name
    
  const displayPlayerDetails = async (playerName) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players/${playerName}`);
  // why i used the data-id so i could fetch correctly... I was very confused here 
  const responseJson = await response.json();
  const playerDetails = responseJson.data.player
    // replace the mains inner html using dot notation
  main.innerHTML = `
    <h2>${playerDetails.name}</h2>
    <img src="${playerDetails.imageUrl}">
    <p>Team- ${playerDetails.team.name}</p>
    <p>CohortID- ${playerDetails.cohortId}<p>
    <p>Breed- ${playerDetails.breed}</p>
    <p>Age- ${playerDetails.createdAt}</p>
    <p>Team ID- ${playerDetails.teamId}</p>
    <p>Position- ${playerDetails.status}</p>
    <button>Go Back</button>
      `
    // grab the button
    const button = document.querySelector(`button`)
    // add an event listener for when you click to go back to render all players
    button.addEventListener(`click`, ()=>{
      renderAllPlayers()
    })
   }
  
  

})

}
renderAllPlayers();
