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

export default class NiftyFootballEngine {

  constructor() {}

  init(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;

    this.homeStats = {
      goals: 0,
      majorEvents: [],
      minorEvents: [],
    };

    this.awayStats = {
      goals: 0,
      majorEvents: [],
      minorEvents: [],
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

    const cloneWithTime = (player, eventType) => {
      let goalAttacker = _.clone(player);
      goalAttacker['time'] = min;
      goalAttacker['eventType'] = eventType;
      return goalAttacker;
    };

    if (diceThrow === GOAL_DICE_NO) {
      if (teamCode === HOME_CODE) {
        this.homeStats.goals++;

        this.homeStats.minorEvents.push(cloneWithTime(attacker, 'shot'));
        this.homeStats.majorEvents.push(cloneWithTime(attacker, 'goal'));
      } else if (teamCode === AWAY_CODE) {
        this.awayStats.goals++;

        this.awayStats.minorEvents.push(cloneWithTime(attacker, 'shot'));
        this.awayStats.majorEvents.push(cloneWithTime(attacker, 'goal'));
      }
    }

    // shots
    if (_.inRange(diceThrow, SHOT_START_NO, SHOT_END_NO)) {
      if (teamCode === HOME_CODE) {
        this.homeStats.minorEvents.push(cloneWithTime(attacker, 'shot'));
      } else if (teamCode === AWAY_CODE) {
        this.awayStats.minorEvents.push(cloneWithTime(attacker, 'shot'));
      }
    }

    // corners
    if (_.inRange(diceThrow, CORNER_START_NO, CORNER_END_NO)) {
      if (teamCode === HOME_CODE) {
        this.homeStats.minorEvents.push(cloneWithTime(attacker, 'corner'));
      } else if (teamCode === AWAY_CODE) {
        this.awayStats.minorEvents.push(cloneWithTime(attacker,  'corner'));
      }
    }

    // yellows
    if (diceThrow == YELLOW_NO) {
        if (coinFlip()) {
            this.homeStats.majorEvents.push(cloneWithTime(attacker, 'yellow'));
        }
        else {
          this.awayStats.majorEvents.push(cloneWithTime(defender, 'yellow'));
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
