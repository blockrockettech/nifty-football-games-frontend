<template>
  <div class="row">
    <div class="col">
      <page-title text="Welcome to Nifty Football Games"></page-title>
      <div class="row">
        <div class="col-12 m-3">
          <router-link :to="{name: 'comp', params: {compId:'57cfbcd0-8d46-11e9-b7b0-3da076de716d'}}">Nifty Sheild</router-link>
        </div>
        <div class="col-12 m-3">
          <router-link :to="{name: 'comp', params: {compId:'985a0820-8eb6-11e9-b5bf-c308254302bd'}}">Nifty Challenge Match</router-link>
        </div>
        <div class="col-12 m-3">
          <router-link :to="{name: 'comp', params: {compId:'dec21ae0-911e-11e9-a760-4f54707f933f'}}">Nifty Football Open</router-link>
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
