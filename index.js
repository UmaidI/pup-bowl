const main = document.querySelector(`main`);


const getTeams = async () => {
  const response =  await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/teams`);
  const teamInfo =  await response.json();
  const allTeams = teamInfo.data.teams;
  const teamNames = allTeams.map((team) => {
    return `
      <h2>${team.name}</h2>
  `
})
  const div = document.querySelector(`div`);
  div.innerHTML = teamNames.join(``);
}
getTeams();

const getPlayers = async () => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players`)
  const playerInfo = await response.json();
  const players = playerInfo.data.players;
  const listOfNamedPlayers = players.map((individualPlayer) => {
    return `
      <li>${individualPlayer.name}</li>
      `
  })
    const OL = document.createElement(`ol`);
    OL.innerHTML = listOfNamedPlayers.join(``)
    main.append(OL);
}
const renderAllPlayers = async () =>{
await getPlayers();
}



