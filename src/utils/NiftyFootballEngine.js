const _ = require('lodash');

const HOME_CODE = 1;
const AWAY_CODE = 2;
const DRAW = 3;

const GOAL_DICE_NO = 1;

const SHOT_START_NO = 2;
const SHOT_END_NO = SHOT_START_NO + 3;

const CORNER_START_NO = SHOT_END_NO;
const CORNER_END_NO = SHOT_START_NO + 2;

const YELLOW_NO = CORNER_END_NO;

const SAMPLE_START_SIZE = 90;
const SAMPLE_MULTIPLIER = 1.5;

const coinFlip = () => _.random(1) === 0;

module.exports = class NiftyFootballEngine {

  constructor() {}

  init(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;

    this.homeStats = {
      goals: 0,
      shots: 0,
      corners: 0,
      scorers: [],
      yellows: [],
      reds: [],
    };

    this.awayStats = {
      goals: 0,
      shots: 0,
      corners: 0,
      scorers: [],
      yellows: [],
      reds: [],
    };

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

    const cloneWithTime = (player) => {
      let goalAttacker = _.clone(player);
      goalAttacker['goalTime'] = min;
      return goalAttacker;
    };

    if (diceThrow === GOAL_DICE_NO) {
      if (teamCode === HOME_CODE) {
        this.homeStats.goals++;
        this.homeStats.shots++;

        this.homeStats.scorers.push(cloneWithTime(attacker));
      } else if (teamCode === AWAY_CODE) {
        this.awayStats.goals++;
        this.awayStats.shots++;

        this.awayStats.scorers.push(cloneWithTime(attacker));
      }
    }

    // shots
    if (_.inRange(diceThrow, SHOT_START_NO, SHOT_END_NO)) {
      if (teamCode === HOME_CODE) {
        this.homeStats.shots++;
      } else if (teamCode === AWAY_CODE) {
        this.awayStats.shots++;
      }
    }

    // corners
    if (_.inRange(diceThrow, CORNER_START_NO, CORNER_END_NO)) {
      if (teamCode === HOME_CODE) {
        this.homeStats.corners++;
      } else if (teamCode === AWAY_CODE) {
        this.awayStats.corners++;
      }
    }

    // yellows
    if (diceThrow == YELLOW_NO) {
        if (coinFlip()) {
            this.homeStats.yellows.push(cloneWithTime(attacker));
        }
        else {
          this.awayStats.yellows.push(cloneWithTime(defender));
        }
    }
  }

  getHomeStats() {
    return this.homeStats;
  }

  getAwayStats() {
    return this.awayStats;
  }

  result() {
    if (this.homeStats.goals === this.awayStats.goals) return DRAW;
    if (this.homeStats.goals > this.awayStats.goals) return HOME_CODE;
    if (this.homeStats.goals < this.awayStats.goals) return AWAY_CODE;
  }
};
