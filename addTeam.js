const postData = async (team) => {
    const response = await fetch(`https://64e32b8abac46e480e784eb4.mockapi.io/team`, {
        method: `POST`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
    })
    const addedTeam = await response.json();
    console.log(addedTeam);
}

const submitButton = document.getElementById(`submit-team`);
const teamNameInput = document.getElementById(`team-name`);
const teamLogoInput = document.getElementById(`team-logo`);
const teamRegionInput = document.getElementById(`team-region`);
const teamPlayers = document.getElementById(`team-players`);
const teamCoachInput = document.getElementById(`team-coach`);
const teamEstablishedInput = document.getElementById(`team-established`);

const submitTeam = () => {
    const team = {};

    team.name = teamNameInput.value;
    team.logo = teamLogoInput.value;
    team.region = teamRegionInput.value;
    team.players = teamPlayers.value.split(`,`);
    team.coach = teamCoachInput.value;
    const established = new Date(teamEstablishedInput.value);
    team.established = Date.parse(established);

    postData(team);

}

submitButton.addEventListener(`click`, submitTeam);