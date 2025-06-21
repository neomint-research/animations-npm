# TypeScript Usage Examples

## Basic Setup

### Installation & Setup
```bash
npm install @neomint/animations
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx"
  }
}
```

## Component Examples

### 1. Basic Network Visualization
```typescript
import React from 'react';
import { 
  NetworkProvider, 
  ModernDataNetwork,
  NetworkNodeData,
  NetworkEdgeData 
} from '@neomint/animations';

interface NetworkData {
  nodes: NetworkNodeData[];
  edges: NetworkEdgeData[];
}

const BasicNetwork: React.FC = () => {
  const data: NetworkData = {
    nodes: [
      { id: '1', label: 'Server A', x: 100, y: 100, type: 'server' },
      { id: '2', label: 'Server B', x: 300, y: 100, type: 'server' },
      { id: '3', label: 'Database', x: 200, y: 250, type: 'database' }
    ],
    edges: [
      { id: 'e1', source: '1', target: '3', type: 'connection' },
      { id: 'e2', source: '2', target: '3', type: 'connection' }
    ]
  };

  return (
    <NetworkProvider>
      <ModernDataNetwork 
        data={data}
        dimensions={{ width: 800, height: 600 }}
        theme="neomintResearch"
      />
    </NetworkProvider>
  );
};

export default BasicNetwork;
```

### 2. Interactive Network with Hooks
```typescript
import React, { useState, useCallback } from 'react';
import { 
  NetworkProvider, 
  ModernDataNetwork,
  useNetworkContext,
  NetworkNodeData,
  NetworkEdgeData,
  NetworkInteractionEvent 
} from '@neomint/animations';

const InteractiveNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = useCallback((event: NetworkInteractionEvent) => {
    setSelectedNode(event.nodeId);
    console.log('Node clicked:', event);
  }, []);

  const handleEdgeClick = useCallback((event: NetworkInteractionEvent) => {
    console.log('Edge clicked:', event);
  }, []);

  return (
    <NetworkProvider>
      <div style={{ display: 'flex', gap: '20px' }}>
        <ModernDataNetwork 
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          dimensions={{ width: 600, height: 400 }}
        />
        <NetworkControls selectedNode={selectedNode} />
      </div>
    </NetworkProvider>
  );
};

const NetworkControls: React.FC<{ selectedNode: string | null }> = ({ 
  selectedNode 
}) => {
  const { nodes, updateNodes, theme, updateTheme } = useNetworkContext();

  const addRandomNode = useCallback(() => {
    const newNode: NetworkNodeData = {
      id: `node-${Date.now()}`,
      label: `Node ${nodes.length + 1}`,
      x: Math.random() * 400,
      y: Math.random() * 300,
      type: 'default'
    };
    updateNodes([...nodes, newNode]);
  }, [nodes, updateNodes]);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Network Controls</h3>
      {selectedNode && (
        <p>Selected: {selectedNode}</p>
      )}
      <button onClick={addRandomNode}>Add Node</button>
      <button onClick={() => updateTheme('cyberpunk')}>
        Cyberpunk Theme
      </button>
    </div>
  );
};

export default InteractiveNetwork;
```

### 3. Performance-Optimized Network
```typescript
import React, { useMemo } from 'react';
import { 
  NetworkProvider, 
  ModernDataNetwork,
  PerformanceIndicator,
  NetworkPerformanceConfig,
  PERFORMANCE_TIERS 
} from '@neomint/animations';

interface PerformanceNetworkProps {
  nodeCount: number;
  enableGPU?: boolean;
}

const PerformanceNetwork: React.FC<PerformanceNetworkProps> = ({ 
  nodeCount, 
  enableGPU = true 
}) => {
  // Generate large dataset
  const data = useMemo(() => {
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: `node-${i}`,
      label: `Node ${i}`,
      x: Math.random() * 1000,
      y: Math.random() * 800,
      type: 'default' as const
    }));

    const edges = Array.from({ length: Math.floor(nodeCount * 1.5) }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${Math.floor(Math.random() * nodeCount)}`,
      target: `node-${Math.floor(Math.random() * nodeCount)}`,
      type: 'connection' as const
    }));

    return { nodes, edges };
  }, [nodeCount]);

  // Performance configuration based on node count
  const performanceConfig: NetworkPerformanceConfig = useMemo(() => {
    if (nodeCount > 1000) {
      return {
        ...PERFORMANCE_TIERS.low,
        enableGPUAcceleration: enableGPU,
        adaptiveQuality: true
      };
    } else if (nodeCount > 500) {
      return {
        ...PERFORMANCE_TIERS.medium,
        enableGPUAcceleration: enableGPU
      };
    } else {
      return {
        ...PERFORMANCE_TIERS.high,
        enableGPUAcceleration: enableGPU
      };
    }
  }, [nodeCount, enableGPU]);

  return (
    <NetworkProvider>
      <div style={{ position: 'relative' }}>
        <ModernDataNetwork 
          data={data}
          dimensions={{ width: 1000, height: 800 }}
          performanceConfig={performanceConfig}
          theme="organic"
        />
        <PerformanceIndicator 
          position="top-right"
          showFPS={true}
          showMemory={true}
          showNodeCount={true}
        />
      </div>
    </NetworkProvider>
  );
};

export default PerformanceNetwork;
```

### 4. Accessible Network with Controls
```typescript
import React from 'react';
import { 
  NetworkProvider, 
  ModernDataNetwork,
  AccessibilityControls,
  ThemeSelector,
  NetworkAccessibilityConfig 
} from '@neomint/animations';

const AccessibleNetwork: React.FC = () => {
  const accessibilityConfig: NetworkAccessibilityConfig = {
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    highContrastMode: false,
    reducedMotion: false,
    focusIndicators: true,
    alternativeText: true
  };

  return (
    <NetworkProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Accessibility Controls */}
        <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
          <AccessibilityControls 
            showReducedMotion={true}
            showHighContrast={true}
            showKeyboardHelp={true}
            showScreenReaderMode={true}
          />
          <ThemeSelector 
            position="inline"
            showPreview={true}
          />
        </div>

        {/* Main Network */}
        <ModernDataNetwork 
          dimensions={{ width: 800, height: 600 }}
          accessibilityConfig={accessibilityConfig}
          theme="neomintMinimal"
          aria-label="Interactive network visualization"
          role="img"
        />

        {/* Screen reader description */}
        <div id="network-description" style={{ position: 'absolute', left: '-9999px' }}>
          This is an interactive network visualization showing connected nodes and edges.
          Use Tab to navigate between nodes, Enter to select, and arrow keys to explore connections.
        </div>
      </div>
    </NetworkProvider>
  );
};

export default AccessibleNetwork;
```

### 5. Custom Theme Implementation
```typescript
import React from 'react';
import { 
  NetworkProvider, 
  ModernDataNetwork,
  NetworkTheme,
  ThemePreset 
} from '@neomint/animations';

// Custom theme definition
const customTheme: NetworkTheme = {
  name: 'Corporate Blue',
  colors: {
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  nodes: {
    default: {
      fill: '#3b82f6',
      stroke: '#1e40af',
      strokeWidth: 2,
      radius: 8
    },
    selected: {
      fill: '#1e3a8a',
      stroke: '#1e40af',
      strokeWidth: 3,
      radius: 10
    },
    hover: {
      fill: '#60a5fa',
      stroke: '#1e40af',
      strokeWidth: 2,
      radius: 9
    }
  },
  edges: {
    default: {
      stroke: '#94a3b8',
      strokeWidth: 1,
      opacity: 0.7
    },
    selected: {
      stroke: '#1e3a8a',
      strokeWidth: 2,
      opacity: 1
    },
    hover: {
      stroke: '#3b82f6',
      strokeWidth: 1.5,
      opacity: 0.9
    }
  },
  animation: {
    duration: 300,
    easing: 'ease-in-out'
  }
};

const CustomThemedNetwork: React.FC = () => {
  return (
    <NetworkProvider>
      <ModernDataNetwork 
        dimensions={{ width: 800, height: 600 }}
        theme={customTheme}
      />
    </NetworkProvider>
  );
};

export default CustomThemedNetwork;
```

## Type Definitions Reference

### Core Types
```typescript
// Node data structure
interface NetworkNodeData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  type?: string;
  data?: Record<string, any>;
}

// Edge data structure
interface NetworkEdgeData {
  id: string;
  source: string;
  target: string;
  type?: string;
  weight?: number;
  data?: Record<string, any>;
}

// Interaction events
interface NetworkInteractionEvent {
  type: 'click' | 'hover' | 'drag';
  nodeId?: string;
  edgeId?: string;
  position: { x: number; y: number };
  originalEvent: Event;
}

// Performance configuration
interface NetworkPerformanceConfig {
  tier: 'low' | 'medium' | 'high';
  maxFPS: number;
  enableGPUAcceleration: boolean;
  adaptiveQuality: boolean;
  maxNodes: number;
  maxEdges: number;
}
```

## Best Practices

### 1. Performance
- Use `useMemo` for large datasets
- Configure performance tiers based on data size
- Enable GPU acceleration for complex visualizations
- Monitor performance with PerformanceIndicator

### 2. Accessibility
- Always provide aria-labels
- Enable keyboard navigation
- Use high contrast themes when needed
- Provide alternative text descriptions

### 3. Type Safety
- Define interfaces for your data structures
- Use strict TypeScript configuration
- Leverage IDE IntelliSense for better development experience
- Type your event handlers properly

### 4. State Management
- Use NetworkProvider for complex applications
- Leverage context hooks for state access
- Keep component props minimal by using context
- Separate concerns between presentation and logic
