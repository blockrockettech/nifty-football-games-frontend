<template>
  <div class="row">
    <div class="col">
      <page-title text="Welcome to Nifty Football Games"></page-title>
      <router-link :to="{name: 'comp', params: {compId:'57cfbcd0-8d46-11e9-b7b0-3da076de716d'}}">Nifty Sheild</router-link>
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
