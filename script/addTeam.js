const teamNameInput = document.getElementById(`team-name`);
const teamLogoInput = document.getElementById(`team-logo`);
const teamRegionInput = document.getElementById(`team-region`);
const teamPlayersInput = document.getElementById(`team-players`);
const teamCoachInput = document.getElementById(`team-coach`);
const teamEstablishedInput = document.getElementById(`team-established`);

const submitTeamButton = document.getElementById(`submit-team`);
const responseMessageWrapper = document.getElementById(`response-message`);
const inputFields = [teamNameInput,teamLogoInput,teamRegionInput,teamPlayersInput,teamCoachInput,teamEstablishedInput]

const postTeamData = async (team) => {

    try {
        const response = await fetch(`https://64e32b8abac46e480e784eb4.mockapi.io/team`, {
            method: `POST`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(team)
        })
        const addedTeam = await response.json();
        return addedTeam;
    } catch (err) {
        return false;
    }
}

const createTeam = () => {
    const team = {};

    team.name = teamNameInput.value;
    team.logo = teamLogoInput.value;
    team.region = teamRegionInput.value;
    team.players = teamPlayersInput.value.split(`,`);
    team.coach = teamCoachInput.value;
    const established = new Date(teamEstablishedInput.value);
    team.established = Date.parse(established);

    return team;
}

const clearInputFields = () =>{
    inputFields.forEach(input => {
        input.value = ``;
    });
}

const onTeamSubmited = (team) => {
    if (team) {
        responseMessageWrapper.innerText = `Team: "${team.name}", was added.`;
        responseMessageWrapper.style.color = `green`;
        clearInputFields();
    } else {
        responseMessageWrapper.innerText = `Something went wrong please try again.`;
        responseMessageWrapper.style.color = `red`;
    }
}

const clearResponseMessage = () => responseMessageWrapper.innerText = ``;

const onClickSubmitTeam = async () => {
    clearResponseMessage();
    const team = createTeam();
    const response = await postTeamData(team);
    onTeamSubmited(response);
}

submitTeamButton.addEventListener(`click`, onClickSubmitTeam);