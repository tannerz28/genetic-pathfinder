<template>
  <div class="container">
    <div class="sketch" id="sketch"></div>
    <div v-if="state.population">
      <h2>Stats</h2>
      <p>Population size: {{state.population.players.length}}</p>
      <p>Generation: {{state.population.generation}}</p>
      <p>Alive: {{state.population.players.filter(p => !p.dead && !p.reachedGoal).length}}</p>
      <p>Reached goal: {{state.population.players.filter(p => p.reachedGoal).length}}</p>
      <p></p>
    </div>
  </div>
</template>

<script>
import { state, sketch } from './sketch.js'
import P5 from 'p5'
export default {
  name: 'Board',
  data() {
    return {
      p5Dom: undefined,
      state
    }
  },
  mounted() {
    this.p5Dom = new P5(sketch, document.getElementById('sketch'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}
</style>
