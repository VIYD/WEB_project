<template>
  <div>
    <canvas ref="gameCanvas" width="600" height="600"></canvas>
    <button ref="startBtn" @click="startAgain">Start Again</button>
  </div>
</template>

<script>
export default {
  name: 'GameCanvasComponent',
  data() {
    return {
      playerX: 290,
      playerY: 560,
      playerSize: 20,
      cars: [],
      carSpeed: 2,
      carInterval: 500,
      carTimer: null,
      gameOverFlag: false,
      score: 1,
      carWidth: 40,
      carHeight: 20,
      ctx: null, // Initialize ctx here
      json: [],
    };
  },
  methods: {
    drawPlayer() {
      if (this.ctx) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.playerX, this.playerY, this.playerSize, this.playerSize);
      }
    },
    movePlayer(e) {
      if (e.key === "ArrowUp") {
        this.playerY -= 20;
        if (this.playerY < 0) {
          this.playerY = 560;
          this.score++;
          this.carSpeed += 0.5;

          this.cars = [];
          this.generateCars();

          this.carInterval = Math.max(this.carInterval - this.carSpeed * 10, 100);
          clearTimeout(this.carTimer);
          this.carTimer = setTimeout(this.generateCars, this.carInterval);
        }
      } else if (e.key === "ArrowDown") {
        this.playerY += 20;
        if (this.playerY > 560) {
          this.playerY = 560;
        }
      }
    },
    drawScore() {
      if (this.ctx) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "24px Courier";
        this.ctx.textAlign = "left";
        this.ctx.fillText("SCORE: " + this.score, 10, 30);
      }
    },
    drawCar(x, y, color) {
      if (this.ctx) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.carWidth, this.carHeight);
      }
    },
    generateCars() {
      let carY = Math.floor(Math.random() * (this.$refs.gameCanvas.height - 60));
      let carColor = ["#FF5733", "#FFBD33", "#33FF57", "#339CFF", "#7A33FF", "#9100AA"][
        Math.floor(Math.random() * 6)
      ];
      this.cars.push({ x: this.$refs.gameCanvas.width, y: carY, color: carColor });
      this.carTimer = setTimeout(this.generateCars, this.carInterval);
    },
    drawCars() {
      this.cars.forEach(car => {
        this.drawCar(car.x, car.y, car.color);
      });
    },
    moveCarsOnRoad() {
      this.cars.forEach(car => {
        car.x -= this.carSpeed;
      });
    },
    gameOver() {
      if (this.ctx) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 40px Courier";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.$refs.gameCanvas.width / 2, this.$refs.gameCanvas.height / 2);
      }
      clearInterval(this.carTimer);
      this.$refs.startBtn.style.display = "block";
      this.gameOverFlag = true;
      this.cars = [];
    },
    collisionDetection() {
      this.cars.forEach(car => {
        if (
          this.playerX < car.x + this.carWidth &&
          this.playerX + this.playerSize > car.x &&
          this.playerY < car.y + this.carHeight &&
          this.playerY + this.playerSize > car.y
        ) {
          this.gameOver();
          this.saveData(this.score); // Ensure saveData is defined in methods
        }
      });
    },
    startAgain() {
      this.gameOverFlag = false;
      this.score = 1;
      this.carSpeed = 2;
      this.playerY = 560;
      this.carInterval = 500;
      this.cars = [];
      clearTimeout(this.carTimer);
      this.$refs.startBtn.style.display = "none";
      this.draw();
      this.generateCars();
    },
    draw() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.$refs.gameCanvas.width, this.$refs.gameCanvas.height);
        this.drawPlayer();
        this.drawCars();
        this.moveCarsOnRoad();
        this.collisionDetection();
        this.drawScore();

        if (!this.gameOverFlag) {
          requestAnimationFrame(this.draw);
        }
      }
    },
    loadData() {
      const jsonString = localStorage.getItem("Score");
      if (jsonString) {
        this.json = JSON.parse(jsonString);
      }
    },
    saveData(score) {
      console.log(score);
      const jsonData = {
        score: score,
      };
      this.json.push(jsonData);

      const jsonString = JSON.stringify(this.json);

      localStorage.setItem("Score", jsonString);
    },
  },
  mounted() {
    this.ctx = this.$refs.gameCanvas.getContext("2d");
    document.addEventListener("keyup", this.movePlayer);
    this.loadData();
    this.draw();
    this.generateCars();
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
  background-color: #f0f0f0;
  display: block;
  margin: 20px auto;
}

button {
  font-size: 16px;
  padding: 10px 20px;
  display: block;
  margin: 20px auto;
}
</style>
