<template>
    <div>
      <button @click="retrieveData">Show score</button>
      <h3>Мінімальні значення</h3>
      <div>{{ minValues }}</div>
      <h3>Максимальні значення</h3>
      <div>{{ maxValues }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        scores: [],
        minValues: [],
        maxValues: [],
      };
    },
    methods: {
      loadData() {
        const jsonString = localStorage.getItem("Score");
        if (jsonString) {
          this.scores = JSON.parse(jsonString);
        }
      },
      saveData(score) {
        const jsonData = { score: score };
        this.scores.push(jsonData);
        const jsonString = JSON.stringify(this.scores);
        localStorage.setItem("Score", jsonString);
      },
      retrieveData() {
        this.loadData();
        let value = this.scores.map(data => data.score);
        value.sort((a, b) => a - b);
        this.minValues = value.slice(0, 3);
        this.maxValues = value.slice(-3);
      },
    },
    mounted() {
      this.loadData();
    },
  };
  </script>
  
  <style scoped>
  button {
    font-size: 16px;
    padding: 10px 20px;
    display: block;
    margin: 20px auto;
  }
  </style>
  