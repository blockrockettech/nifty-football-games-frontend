const API_CONFIG = {
    local: 'http://localhost:5000/futbol-cards/us-central1/main/api',
    live: 'https://niftyfootball.cards/api'
};

const live = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

// if live use mainnet, otherwise use rinkeby
const DEV_NETWORK_ID = 4;
const PROD_NETWORK_ID = 1;

const NETWORK_ID = live ? PROD_NETWORK_ID : PROD_NETWORK_ID;

const getApi = () => live ? API_CONFIG.live : API_CONFIG.live;

const AXIOS_CONFIG = {headers: {'Access-Control-Allow-Origin': '*'}};

const lookupEtherscanAddress = (id) => {
    switch (id) {
        case 1:
            return 'https://etherscan.io';
        case 3:
            return 'https://ropsten.etherscan.io';
        case 4:
            return 'https://rinkeby.etherscan.io';
        case 42:
            return 'https://kovan.etherscan.io';
        default:
            return 'https://etherscan.io';
    }
};

const dotDotDotAccount = (ethAccount) => {
    if (ethAccount && ethAccount.startsWith(`0x`)) {
        return ethAccount.substr(0, 6) + '...' + ethAccount.substr(ethAccount.length - 6, ethAccount.length);
    }
    return ethAccount;
};

const waitForMillis = (duration) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), duration);
    });
};

export {
    getApi,
    lookupEtherscanAddress,
    dotDotDotAccount,
    AXIOS_CONFIG,
    NETWORK_ID,
    waitForMillis
};
