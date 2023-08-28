const main = document.getElementsByTagName(`main`)[0];

const buildPlayerWrapper = (player) => {
    const playerWrapper = document.createElement(`div`);
    playerWrapper.classList.add(`player-wrapper`);
    playerWrapper.innerText = player;
    return playerWrapper;
}

const openTeam = (team) => {
    window.location.replace(`./team.html?teamId=${team.id}`);
}

const buildTeamWrapper = (team) => {
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

    const teamRegion = document.createElement(`div`);
    teamRegion.innerText = `Region: ${team.region}`;

    const playersWrapper = document.createElement(`div`);
    playersWrapper.classList.add(`players-wrapper`);

    team.players.forEach((player) => playersWrapper.append(buildPlayerWrapper(player)))

    const teamCoach = document.createElement(`div`);
    teamCoach.innerText = `Coach: ${team.coach || `vacant`}`;

    const establishedWrapper = document.createElement(`div`);
    establishedWrapper.innerText = `Established: ` + new Date(team.established).getFullYear();

    orgWrapper.append(teamLogo, teamName);

    teamWrapper.append(orgWrapper);
    teamWrapper.append(teamRegion);
    teamWrapper.append(playersWrapper);
    teamWrapper.append(teamCoach);
    teamWrapper.append(establishedWrapper);

    return teamWrapper;
}

const buildTeamsWrapper = (teams) => {
    const teamsWrapper = document.createElement(`div`);
    teamsWrapper.classList.add(`teams-wrapper`);
    teams
        .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        .forEach((team) => {
            teamsWrapper.append(buildTeamWrapper(team));
        });
    return teamsWrapper;
}

const buildMessageWrapper = (message, status) => {
    const messageWrapper = document.createElement(`div`);
    messageWrapper.innerText = message;
    switch (status) {
        case (`error`):
            messageWrapper.style.color = `red`;
            break;
        default:
            messageWrapper.style.color = `green`;
    }
    return messageWrapper;
}

const buildContent = (data) => {
    if (data) {
        return buildTeamsWrapper(data);
    } else {
        return buildMessageWrapper(`Something went wrong try again`, `error`)
    }
}

const getData = async () => {
    try {
        const response = await fetch(`https://64e32b8abac46e480e784eb4.mockapi.io/team`);
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
    }
}

const displayContent = (content) => {
    main.append(content);
};

const buildMain = async () => {
    const data = await getData();
    const content = buildContent(data);
    displayContent(content);
}

buildMain();