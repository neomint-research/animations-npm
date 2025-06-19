import React, { useRef, useEffect, useState, useCallback } from 'react';

const DataNetwork = ({
  width = '100%',
  height = '35vh',
  nodeCount = 50,
  connectionDistance = 120,
  animationSpeed = 0.5,
  nodeColor = '#ffffff',
  lineColor = 'rgba(255, 255, 255, 0.1)',
  backgroundColor = 'transparent',
  preset = 'default',
  performance = 'auto'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Initialize nodes
  const initializeNodes = useCallback((canvasWidth, canvasHeight, count) => {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        radius: Math.random() * 2 + 1
      });
    }
    return nodes;
  }, [animationSpeed]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width: canvasWidth, height: canvasHeight } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Update and draw nodes
    nodesRef.current.forEach(node => {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x <= 0 || node.x >= canvasWidth) node.vx *= -1;
      if (node.y <= 0 || node.y >= canvasHeight) node.vy *= -1;

      // Keep nodes in bounds
      node.x = Math.max(0, Math.min(canvasWidth, node.x));
      node.y = Math.max(0, Math.min(canvasHeight, node.y));

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
    });

    // Draw connections
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;

    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];
        const distance = Math.sqrt(
          Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
        );

        if (distance < connectionDistance) {
          const opacity = 1 - (distance / connectionDistance);
          ctx.globalAlpha = opacity * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(animate);
  }, [nodeColor, lineColor, connectionDistance]);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;

    const displayWidth = rect.width;
    const displayHeight = rect.height;

    const canvasWidth = displayWidth * devicePixelRatio;
    const canvasHeight = displayHeight * devicePixelRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);

    setCanvasSize({ width: displayWidth, height: displayHeight });

    // Reinitialize nodes for new canvas size
    nodesRef.current = initializeNodes(displayWidth, displayHeight, nodeCount);
  }, [initializeNodes, nodeCount]);

  // Setup canvas and animation
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, animate]);

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default DataNetwork;