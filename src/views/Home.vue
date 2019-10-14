<template>
  <div class="row">
    <div class="col">
      <page-title text="Welcome to Nifty Football Games"></page-title>
      <div class="row">
        <div class="col-4 m-3 comp-box">
          <router-link :to="{name: 'comp', params: {compId:'dec21ae0-911e-11e9-a760-4f54707f933f'}}">
            Nifty Football Open
          </router-link>
          <div class="text-blue-sm">
            WINNER: WEST VIRGINIA
          </div>
        </div>

        <div class="col-4 m-3 comp-box">
          <router-link :to="{name: 'comp', params: {compId:'85bbdc90-d62b-11e9-b37f-671ed62fdff3'}}">
            War of the Roses
          </router-link>
          <div class="text-blue-sm">
            WINNER: WHITE ROSES
          </div>
        </div>

        <div class="col-4 m-3 comp-box">
          <router-link :to="{name: 'comp', params: {compId:'7a3b3770-d636-11e9-a23c-9d1e1589e7ab'}}">
            War of the Roses II
          </router-link>
          <div class="text-blue-sm">
            WINNER: ?
          </div>
        </div>

        <div class="col-4 m-3 comp-box">
          <router-link :to="{name: 'comp', params: {compId:'3ecdfe60-d63c-11e9-9b73-f7f28207c6aa'}}">
            Alpha Friendly
          </router-link>
          <div class="text-blue-sm">
            WINNER: ?
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
  import PageTitle from '../components/PageTitle';

  export default {
    name: 'home',
    components: {PageTitle},
    data() {
      return {};
    },
    computed: {},
    methods: {},
    async created() {},
  };
</script>
