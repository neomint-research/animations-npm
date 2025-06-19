import { useState, useEffect, useRef } from 'react';
import { PerformanceMonitor, detectDeviceCapabilities, getOptimalSettings } from '../performance';

export const usePerformanceMonitor = (enabled = true) => {
  const monitorRef = useRef(new PerformanceMonitor());
  const [performanceData, setPerformanceData] = useState({
    fps: 0,
    averageFPS: 0,
    performanceLevel: 'medium',
    deviceCapabilities: detectDeviceCapabilities(),
    optimalSettings: null
  });

  useEffect(() => {
    const monitor = monitorRef.current;
    const deviceCaps = detectDeviceCapabilities();
    const optimal = getOptimalSettings(deviceCaps);

    setPerformanceData(prev => ({
      ...prev,
      deviceCapabilities: deviceCaps,
      optimalSettings: optimal
    }));

    if (enabled) {
      monitor.startMonitoring();
    }

    return () => {
      monitor.isMonitoring = false;
    };
  }, [enabled]);

  const recordFrame = () => {
    if (!enabled) return;
    
    const monitor = monitorRef.current;
    monitor.recordFrame();
    
    setPerformanceData(prev => ({
      ...prev,
      fps: monitor.fps,
      averageFPS: monitor.getAverageFPS(),
      performanceLevel: monitor.getPerformanceLevel()
    }));
  };

  return {
    ...performanceData,
    recordFrame,
    monitor: monitorRef.current
  };
};