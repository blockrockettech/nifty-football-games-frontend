import axios from 'axios';
import BaseApiService from './baseApi.service';
import {AXIOS_CONFIG} from '../../utils';


export default class CardsApiService extends BaseApiService {

    constructor(network = 1) {
        super(network);
    }

    async loadTopTeam(ethAccount) {
        console.log(`Load top team`, ethAccount);
        const res = await axios.get(`${this.BASE_API}/network/${this.network}/squad/${ethAccount}/top`, AXIOS_CONFIG);
        return res.data;
    }

    async loadLeagueTable(limit = 50) {
        console.log(`Load top teams`);
        const res = await axios.get(`${this.BASE_API}/network/${this.network}/squad/league?limit=${limit}`, AXIOS_CONFIG);
        return res.data;
    }


}
