const log = (logs) => {console.log(logs)};

const main = document.getElementsByTagName(`main`)[0];

const diplayPlayer = (player) => {
    const playerWrapper = document.createElement(`div`);
    playerWrapper.classList.add(`player-wrapper`);
    playerWrapper.innerText = player;
    return playerWrapper;
}


const deleteTeam = async (team) => {
    const response = await fetch(`https://64e32b8abac46e480e784eb4.mockapi.io/team/${team.id}`, {
        method: `DELETE`
    })
    const deletedTeam = await response.json();
    log(deletedTeam);
    setTimeout(() => {window.location.replace(`./index.html`)},3000);
};

const displayTeam = (team) => {
    const teamWrapper = document.createElement(`div`);
    teamWrapper.classList.add(`team-wrapper`);

    const orgWrapper = document.createElement(`div`);
    orgWrapper.classList.add(`org-wrapper`);

    const teamInfoWrapper = document.createElement(`div`);
    teamInfoWrapper.classList.add(`team-info-wrapper`);

    const teamLogo = document.createElement(`img`);
    teamLogo.src = team.logo;

    const teamName = document.createElement(`h2`);
    teamName.innerText = team.name;

    

    const teamRegion = document.createElement(`div`);
    teamRegion.innerText = `Region: ${team.region}` ;


    const playersWrapper = document.createElement(`div`);
    playersWrapper.classList.add(`players-wrapper`);
    playersWrapper.innerText = `Players:`;

    team.players.forEach((player) => {
        playersWrapper.append(diplayPlayer(player));
    })
        
    const teamCoach = document.createElement(`div`);
    teamCoach.innerText = `Coach: ${team.coach || `vacant`}`;
    

    const establishedWrapper = document.createElement(`div`);
    establishedWrapper.innerText = `Established: ` + new Date(team.established).getFullYear();
    
    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`delete-button`);
    deleteButton.id = `delete-button`;
    deleteButton.innerText = `Delete this team`;

    deleteButton.addEventListener(`click`, () => {
        deleteTeam(team);
    })

    orgWrapper.append(teamLogo,teamName);
    teamInfoWrapper.append(teamRegion,playersWrapper,teamCoach,establishedWrapper);
    
    teamWrapper.append(orgWrapper);
    teamWrapper.append(teamInfoWrapper);    
    teamWrapper.append(deleteButton);

    return teamWrapper;
}

const getData = async () => {
    const response = await fetch(`https://64e32b8abac46e480e784eb4.mockapi.io/team/` + localStorage.teamId);
    const team = await response.json();
    main.append(displayTeam(team));
}

getData();