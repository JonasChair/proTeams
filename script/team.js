const log = (logs) => {console.log(logs)};
const TEAM_URL = 'https://64e32b8abac46e480e784eb4.mockapi.io/team/';
const main = document.getElementsByTagName(`main`)[0];

const url = new URL(window.location.href);
const teamId = url.searchParams.get('teamId');

const deleteTeam = async () => {
    const response = await fetch(TEAM_URL + teamId, {
        method: `DELETE`
    })
    const deletedTeam = await response.json();
    if (deletedTeam) {
        log(deletedTeam);
        main.append(buildMessageWrapper(`Team "${deletedTeam.name}" has been deleted`));
        setTimeout(() => {window.location.replace(`./index.html`)},3000);
    } else {
        main.append(buildMessageWrapper(`Something went wrong, please try again.`,`error`));
    }
};

const buildPlayerWapper = (player) => {
    const playerWrapper = document.createElement(`div`);
    playerWrapper.classList.add(`player-wrapper`);
    playerWrapper.innerText = player;
    return playerWrapper;
}

const buildTeamWrapper = (team) => {
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
        playersWrapper.append(buildPlayerWapper(player));
    })
        
    const teamCoach = document.createElement(`div`);
    teamCoach.innerText = `Coach: ${team.coach || `vacant`}`;
    
    const establishedWrapper = document.createElement(`div`);
    establishedWrapper.innerText = `Established: ` + new Date(team.established).getFullYear();
    
    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`delete-button`);
    deleteButton.id = `delete-button`;
    deleteButton.innerText = `Delete this team`;

    deleteButton.addEventListener(`click`,deleteTeam)

    orgWrapper.append(teamLogo,teamName);
    teamInfoWrapper.append(teamRegion,playersWrapper,teamCoach,establishedWrapper);
    
    teamWrapper.append(orgWrapper);
    teamWrapper.append(teamInfoWrapper);    
    teamWrapper.append(deleteButton);

    return teamWrapper;
}

const getData = async () => {
    try {
        const response = await fetch(TEAM_URL + teamId);
        const data = await response.json();
        return data;        
    } catch (err) {
        return false;
    }
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
    let contentWrapper;
    if (data) {
        contentWrapper = buildTeamWrapper(data);
    } else {
        contentWrapper = buildMessageWrapper(`Something went wrong try again`, `error`)
    }
    return contentWrapper;

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