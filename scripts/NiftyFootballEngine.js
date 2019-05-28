const _ = require('lodash');

const HOME_CODE = 1;
const AWAY_CODE = 2;
const DRAW = 3;

const GOAL_DICE_NO = 1;
const SAMPLE_START_SIZE = 90;
const SAMPLE_MULTIPLIER = 1.75;

module.exports = class NiftyFootballEngine {

  constructor() {}

  init(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;

    this.homeGoals = 0;
    this.awayGoals = 0;

    this.homeScorers = [];
    this.awayScorers = [];
  }

  getTeam(teamCode) {
    return teamCode === HOME_CODE ? this.homeTeam : this.awayTeam;
  }

  attackFormation(teamCode) {
    const team = this.getTeam(teamCode);

    const sortedStrikers = _.orderBy(team.strikers, ['attributeAvg', 'tokenId'], ['desc', 'desc']);
    const sortedMidfield = _.orderBy(team.midfield, ['attributeAvg', 'tokenId'], ['desc', 'desc']);
    const sortedDefence = _.orderBy(team.defence, ['attributeAvg', 'tokenId'], ['desc', 'desc']);

    let attackOptions = sortedStrikers;
    attackOptions = _.concat(attackOptions, sortedStrikers);
    attackOptions = _.concat(attackOptions, sortedStrikers);
    attackOptions.push(sortedStrikers[0]);
    attackOptions.push(sortedStrikers[0]);
    attackOptions = _.concat(attackOptions, sortedMidfield);
    attackOptions.push(_.sample(sortedDefence));

    return attackOptions;
  }

  defenceFormation(teamCode) {
    const team = this.getTeam(teamCode);

    const sortedDefence = _.orderBy(team.defence, ['attributeAvg', 'tokenId'], ['desc', 'desc']);

    let defenceOptions = sortedDefence;
    defenceOptions = _.concat(defenceOptions, sortedDefence);
    defenceOptions.push(defenceOptions[0]);
    defenceOptions.push(team.goalkeepers[0]);
    defenceOptions.push(team.goalkeepers[0]);

    return defenceOptions;
  }

  attack(attackFormation, defenceFormation, teamCode, min) {

    const attacker = _.sample(attackFormation);
    const defender = _.sample(defenceFormation);

    const playerDifference = attacker.attributeAvg - defender.attributeAvg;

    const sampleSize = SAMPLE_START_SIZE - Math.floor(playerDifference * SAMPLE_MULTIPLIER); // secret-sauce

    const diceThrow = _.random(0, sampleSize);

    if (diceThrow === GOAL_DICE_NO) {
      if (teamCode === HOME_CODE) {
        this.homeGoals++;

        let goalAttacker = _.clone(attacker);
        goalAttacker['goalTime'] = min;
        this.homeScorers.push(goalAttacker);

        return HOME_CODE;
      } else if (teamCode === AWAY_CODE) {
        this.awayGoals++;

        let goalAttacker = _.clone(attacker);
        goalAttacker['goalTime'] = min;
        this.awayScorers.push(goalAttacker);

        return AWAY_CODE;
      }
    }

    return DRAW;
  }

  getHomeGoals() {
    return this.homeGoals;
  }

  getAwayGoals() {
    return this.awayGoals;
  }

  getHomeScorers() {
    return this.homeScorers;
  }

  getAwayScorers() {
    return this.awayScorers;
  }

  result() {
    if (this.homeGoals === this.awayGoals) return DRAW;
    if (this.homeGoals > this.awayGoals) return HOME_CODE;
    if (this.awayGoals > this.homeGoals) return AWAY_CODE;
  }
};
