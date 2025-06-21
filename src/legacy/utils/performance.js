class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.isMonitoring = false;
  }

  startMonitoring() {
    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
  }

  recordFrame() {
    if (!this.isMonitoring) return;
    
    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.fpsHistory.push(this.fps);
      if (this.fpsHistory.length > 60) this.fpsHistory.shift();
      
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  getAverageFPS() {
    return this.fpsHistory.length > 0 
      ? Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length)
      : 0;
  }

  getPerformanceLevel() {
    const avgFPS = this.getAverageFPS();
    if (avgFPS >= 50) return 'high';
    if (avgFPS >= 30) return 'medium';
    return 'low';
  }
}

export const detectDeviceCapabilities = () => ({
  devicePixelRatio: window.devicePixelRatio || 1,
  hardwareConcurrency: navigator.hardwareConcurrency || 2,
  memory: navigator.deviceMemory || 4,
  isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isHighPerformance: (navigator.hardwareConcurrency || 2) >= 4 && (navigator.deviceMemory || 4) >= 4
});

export const getOptimalSettings = (deviceCaps) => {
  if (!deviceCaps.isHighPerformance || deviceCaps.isMobile) {
    return {
      nodeCount: Math.max(20, Math.floor(50 * 0.6)),
      animationSpeed: 0.3,
      connectionDistance: 80,
      qualityLevel: 'medium'
    };
  }
  
  return {
    nodeCount: 50,
    animationSpeed: 0.5,
    connectionDistance: 120,
    qualityLevel: 'high'
  };
};

export { PerformanceMonitor };