const NiftyFootballEngine = require('./NiftyFootballEngine');
log = require('single-line-log').stdout;
_ = require('lodash');

const TOTAL_ITERATIONS = 90 + _.random(2, 7);

const HOME = 1;
const AWAY = 2;

async function playGame() {
  try {

    console.log('\n\n');
    const engine = new NiftyFootballEngine();

    const home = require('../test_data/nifty_team_70');
    const away = require('../test_data/nifty_team_90');

    // for (let games = 0; games < 1; games++) {

      console.log(`${home.owner.substr(0, 4)} [${home.topTeam.teamAverageFloored}]\t\tVS\t\t${away.owner.substr(0, 4)} [${away.topTeam.teamAverageFloored}]\n`);

      engine.init(home.topTeam, away.topTeam);

      // homeAttack.map((p) => console.log(`H ${p.attributeAvg} ${p.positionText}`));
      // awayDefence.map((p) => console.log(`A ${p.attributeAvg} ${p.positionText}`));

      for (let min = 0; min < TOTAL_ITERATIONS; min++) {
        const homeAttackFormation = engine.attackFormation(HOME);
        const homeDefenceFormation = engine.defenceFormation(HOME);

        const awayAttackFormation = engine.attackFormation(AWAY);
        const awayDefenceFormation = engine.defenceFormation(AWAY);

        engine.attack(homeAttackFormation, awayDefenceFormation, HOME, min);

        engine.attack(awayAttackFormation, homeDefenceFormation, AWAY, min);

        const homeStats = engine.getHomeStats();
        const awayStats = engine.getAwayStats();

        const homeScorersLog = homeStats.scorers.map((s) => `${s.goalTime}. ${s.fullName}\n`);
        const awayScorersLog = awayStats.scorers.map((s) => `\t\t\t\t${s.goalTime}. ${s.fullName}\n`);

        log(`\t${homeStats.goals}\t\t\t\t${awayStats.goals}\n${homeScorersLog.join('')}${awayScorersLog.join('')}
          Shots  \t\t${homeStats.shots} | ${awayStats.shots}
          Corners\t\t${homeStats.corners} | ${awayStats.corners}
          Yellows\t\t${homeStats.yellows.length} | ${awayStats.yellows.length}
          Reds   \t\t${homeStats.reds.length} | ${awayStats.reds.length}
        `);
      }

      // homeGoals += engine.homeGoals;
      // awayGoals += engine.awayGoals;
      //
      // const matchResult = engine.result();
      // if (matchResult === NO_RESULT) {
      //   draws++;
      // } else if (matchResult === HOME) {
      //   homeWins++;
      // } else if (matchResult === AWAY) {
      //   awayWins++;
      // }

      // console.log(`\n\nH ${homeWins} : D ${draws} : A ${awayWins} HG: ${homeGoals} AG: ${awayGoals}`);
    // }

    console.log('\n\n');

  } catch (error) {
    console.error(error);
  }
}

playGame();


