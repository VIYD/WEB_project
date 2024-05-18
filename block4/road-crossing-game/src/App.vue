<template>
  <div id="app">
    <AppHeader />
    <GameCanvas />
    <ScoreDisplay />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import GameCanvas from './components/GameCanvas.vue';
import ScoreDisplay from './components/ScoreDisplay.vue';

export default {
  components: {
    AppHeader,
    GameCanvas,
    ScoreDisplay
  }
};
</script>
