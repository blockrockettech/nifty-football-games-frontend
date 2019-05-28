const NiftyFootballEngine = require('./NiftyFootballEngine');
log = require('single-line-log').stdout;
_ = require('lodash');

const TOTAL_ITERATIONS = 90 + _.random(2, 7);

const HOME = 1;
const AWAY = 2;
const DRAW = 3;

async function playGame() {
  try {

    const engine = new NiftyFootballEngine();

    const home = require('../test_data/nifty_team_90');
    const away = require('../test_data/nifty_team_70');

    let totalHomeWins = 0;
    let totalAwayWins = 0;
    let totalDraws = 0;

    for (let games = 0; games < 1000; games++) {

      engine.init(home.topTeam, away.topTeam);

      for (let min = 0; min < TOTAL_ITERATIONS; min++) {
        const homeAttackFormation = engine.attackFormation(HOME);
        const homeDefenceFormation = engine.defenceFormation(HOME);

        const awayAttackFormation = engine.attackFormation(AWAY);
        const awayDefenceFormation = engine.defenceFormation(AWAY);

        engine.attack(homeAttackFormation, awayDefenceFormation, HOME, min);

        engine.attack(awayAttackFormation, homeDefenceFormation, AWAY, min);
      }

      const matchResult = engine.result();
      if (matchResult === DRAW) {
        totalDraws++;
      } else if (matchResult === HOME) {
        totalHomeWins++;
      } else if (matchResult === AWAY) {
        totalAwayWins++;
      }

      log(`\n\nH ${totalHomeWins} : D ${totalDraws} : A ${totalAwayWins}`);
    }

    console.log('\n\n');

  } catch (error) {
    console.error(error);
  }
}

playGame();


