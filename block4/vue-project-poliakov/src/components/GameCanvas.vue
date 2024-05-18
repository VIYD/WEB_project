<template>
    <div>
      <canvas ref="gameCanvas" width="600" height="600"></canvas>
      <button @click="startAgain">Start Again</button>
    </div>
  </template>
  
  <script>
  export default {
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
      };
    },
    methods: {
      drawPlayer(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.playerX, this.playerY, this.playerSize, this.playerSize);
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
      drawScore(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "24px Courier";
        ctx.textAlign = "left";
        ctx.fillText("SCORE: " + this.score, 10, 30);
      },
      drawCar(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.carWidth, this.carHeight);
      },
      generateCars() {
        let carY = Math.floor(Math.random() * (this.$refs.gameCanvas.height - 60));
        let carColor = ["#FF5733", "#FFBD33", "#33FF57", "#339CFF", "#7A33FF", "#9100AA"][
          Math.floor(Math.random() * 6)
        ];
        this.cars.push({ x: this.$refs.gameCanvas.width, y: carY, color: carColor });
        this.carTimer = setTimeout(this.generateCars, this.carInterval);
      },
      drawCars(ctx) {
        this.cars.forEach(car => {
          this.drawCar(ctx, car.x, car.y, car.color);
        });
      },
      moveCarsOnRoad() {
        this.cars.forEach(car => {
          car.x -= this.carSpeed;
        });
      },
      gameOver(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "bold 40px Courier";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.$refs.gameCanvas.width / 2, this.$refs.gameCanvas.height / 2);
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
            this.saveData(this.score);
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
        const canvas = this.$refs.gameCanvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawPlayer(ctx);
        this.drawCars(ctx);
        this.moveCarsOnRoad();
        this.collisionDetection();
        this.drawScore(ctx);
  
        if (!this.gameOverFlag) {
          requestAnimationFrame(this.draw);
        }
      },
    },
    mounted() {
      document.addEventListener("keyup", this.movePlayer);
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
  