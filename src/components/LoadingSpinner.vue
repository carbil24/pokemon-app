<template>
  <div class="spinner-container">
    <div className="loading-spinner"></div>
  </div>
</template>

<style scoped>
.spinner-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-left-color: #333;

  animation: loading-spinner 1s ease infinite;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
