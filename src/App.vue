<template>
  <div class="container-fluid text-center mt-3">
    <div class="row">
      <div class="col">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: CrackerJack;
    src: url("./assets/CrackerJack.otf") format("opentype");
  }

  @import url('https://fonts.googleapis.com/css?family=Anton');
  @import "colours";
  @import '../node_modules/bootstrap/scss/bootstrap';
  @import '../node_modules/bootstrap-vue/src/index.scss';

  [v-cloak] {
    display: none
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    color: $black;
  }

  body {
    color: $black;
  }

  h1 {
    font-family: 'Anton', sans-serif;
    font-size: 3.25rem;
    color: $black;
    letter-spacing: 0.1rem;
  }

  h2 {
    font-family: 'Anton', sans-serif;
    font-size: 2.5rem;
    color: $black;
    letter-spacing: 0.1rem;
  }

  h3 {
    font-family: 'Anton', sans-serif;
    color: $black;
    letter-spacing: 0.1rem;
  }

  h4 {
    font-family: 'Anton', sans-serif;
    color: $black;
  }

  h5 {
    color: $black;
  }

  footer {
    margin-bottom: 120px;
    margin-top: 50px;
  }

  code {
    color: $primary;
  }

  .scoreboard-box {
    background-color: $lightblack;
    font-family: 'CrackerJack', sans-serif;
    text-transform: uppercase;
    border: 12px solid $purple;
    box-shadow: 0 18px 0 0 $purple;
    font-size: 1.25rem;
    color: $white;
    margin-bottom: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    letter-spacing: 2px;
  }

  .smallest {
    font-size: 0.6rem;
  }

  .crackerjack {
    font-family: 'CrackerJack', sans-serif;
    text-transform: uppercase;
  }

  .nf-link {
    font-family: 'CrackerJack', sans-serif;
    text-transform: uppercase;
    color: $black;
    font-size: 1.2rem;
    cursor: pointer;

    &.nf-link-active {
      color: $secondary;
    }
  }

  .badge {
    font-size: 1rem;
    font-family: 'CrackerJack', sans-serif;
    text-transform: uppercase;
    letter-spacing: 3px;
    background-color: $black;
    padding-right: 10px;
    padding-left: 10px;
    color: $secondary;
  }

  .btn-secondary {
    font-family: 'CrackerJack', sans-serif;
    text-transform: uppercase;
    border: 2px solid $black;
    box-shadow: 0 6px 0 0 $black;
    margin-bottom: 6px;
    padding-left: 50px;
    padding-right: 50px;
  }

  .btn-secondary:hover, .btn-secondary:focus, .btn-secondary:active, .btn-secondary.active, .open > .dropdown-toggle.btn-secondary {
    border: 2px solid $black;
    box-shadow: 0 6px 0 0 $black;
  }

  .header-text {
    font-family: 'CrackerJack', sans-serif;
    font-size: 2rem;
    color: $black;
    letter-spacing: 0.1rem;
    text-transform: uppercase;

    a {
      color: $black;
    }
  }

  .text-purple-lg {
    font-family: 'CrackerJack', sans-serif;
    font-size: 2rem;
    color: $purple;
    text-transform: uppercase;
  }

  .text-purple-md {
    font-family: 'CrackerJack', sans-serif;
    font-size: 1.5rem;
    color: $purple;
    text-transform: uppercase;
  }

  .text-blue-sm {
    font-family: 'CrackerJack', sans-serif;
    font-size: 1rem;
    color: $blue;
    text-transform: uppercase;
  }

  .text-blue-md {
    font-family: 'CrackerJack', sans-serif;
    font-size: 1.5rem;
    color: $blue;
    text-transform: uppercase;
  }

  .text-blue-lg {
    font-family: 'CrackerJack', sans-serif;
    font-size: 2rem;
    color: $blue;
    text-transform: uppercase;
  }

  .text-blue-xl {
    font-family: 'CrackerJack', sans-serif;
    font-size: 4rem;
    color: $blue;
    text-transform: uppercase;
  }

  .text-orange-lg {
    font-family: 'CrackerJack', sans-serif;
    font-size: 2rem;
    color: $orange;
    text-transform: uppercase;
  }

  .text-orange-md {
    font-family: 'CrackerJack', sans-serif;
    font-size: 1.5rem;
    color: $orange;
    text-transform: uppercase;
  }

  .text-lime-lg {
    font-family: 'CrackerJack', sans-serif;
    font-size: 2rem;
    color: $lime;
    text-transform: uppercase;
  }

  .text-lime-md {
    font-family: 'CrackerJack', sans-serif;
    font-size: 1.5rem;
    color: $lime;
    text-transform: uppercase;
  }

  .text-lime-xl {
    font-family: 'CrackerJack', sans-serif;
    font-size: 5rem;
    color: $lime;
    text-transform: uppercase;
  }

  .text-white-lg {
    font-family: 'CrackerJack', sans-serif;
    font-size: 4rem;
    color: $white;
    text-transform: uppercase;
  }

  .header-text-sm {
    font-family: 'CrackerJack', sans-serif;
    font-size: 1.3rem;
    color: $black;
    letter-spacing: 1px;
    text-transform: uppercase;

    a {
      color: $black;
    }
  }

  .form-control {
    /*font-family: 'CrackerJack', sans-serif;*/
  }

  .btn-primary {
    color: $body-bg;
  }

  .card {
    .card-title {
      color: $black;
      font-size: 1rem;
    }
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .2s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .75s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
