<template>
  <div id="app">
    <Header />
    <GameCanvas />
    <ScoreDisplay />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import GameCanvas from './components/GameCanvas.vue';
import ScoreDisplay from './components/ScoreDisplay.vue';

export default {
  components: {
    Header,
    GameCanvas,
    ScoreDisplay
  }
};
</script>
