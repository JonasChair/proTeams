const log = (logs) => {console.log(logs)};

const main = document.getElementsByTagName(`main`)[0];

const diplayPlayer = (player) => {
    const playerWrapper = document.createElement(`div`);
    playerWrapper.classList.add(`player-wrapper`);
    playerWrapper.innerText = player;
    return playerWrapper;
}

const openTeam = (team) => {
    localStorage.setItem(`teamId`,team.id);
    window.location.replace(`./team.html`);
}

const displayTeam = (team) => {
    const teamWrapper = document.createElement(`div`);
    teamWrapper.classList.add(`team-wrapper`);
    teamWrapper.addEventListener(`click`, () => {
        openTeam(team);
    });

    const orgWrapper = document.createElement(`div`);
    orgWrapper.classList.add(`org-wrapper`);

    const teamLogo = document.createElement(`img`);
    teamLogo.src = team.logo;

    const teamName = document.createElement(`h2`);
    teamName.innerText = team.name;

    orgWrapper.append(teamLogo,teamName);

    const teamRegion = document.createElement(`div`);
    teamRegion.innerText = `Region: ${team.region}` ;

    teamWrapper.append(orgWrapper);
    teamWrapper.append(teamRegion);

    const playersWrapper = document.createElement(`div`);
    playersWrapper.classList.add(`players-wrapper`);

    team.players.forEach((player) => {
        playersWrapper.append(diplayPlayer(player));
    })
    
    teamWrapper.append(playersWrapper);     
    
    const teamCoach = document.createElement(`div`);
    teamCoach.innerText = `Coach: ${team.coach || `vacant`}`;
    teamWrapper.append(teamCoach);

    const establishedWrapper = document.createElement(`div`);
    establishedWrapper.innerText = `Established: ` + new Date(team.established).getFullYear();

    
    teamWrapper.append(establishedWrapper);

    return teamWrapper;
}

const displayTeams = (teams) =>{
    const teamsWrapper = document.createElement(`div`);
    teamsWrapper.classList.add(`teams-wrapper`);
    teams.forEach((team) => {
        teamsWrapper.append(displayTeam(team));
    });
    return teamsWrapper;
}

const getData = async () => {
    const response = await fetch(`https://64e32b8abac46e480e784eb4.mockapi.io/team`);
    const teams = await response.json();
    main.append(displayTeams(teams));
}

getData();