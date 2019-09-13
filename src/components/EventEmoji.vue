<template>
    <span>
      <span v-if="evt === 'goal'">GOAL</span>
      <span v-else-if="evt === 'yellow'">YELLOW</span>
      <span v-else-if="evt === 'corner'">CORNER</span>
      <span v-else-if="evt === 'shot'">SHOT</span>
      <span v-else>{{ evt }}</span>
    </span>
</template>

<script>
    export default {
        name: 'event-emoji',
        props: ['evt'],
    };
</script>

<style scoped lang="scss">
    @import "../colours";
</style>
