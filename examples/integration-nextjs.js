import React from 'react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Next.js Integration Example
 * 
 * This example demonstrates how to integrate DataNetwork with Next.js,
 * handling SSR considerations and using dynamic imports.
 */

// Example 1: Basic Dynamic Import
// The DataNetwork component uses Canvas API which is not available during SSR
const DataNetwork = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { 
    ssr: false,
    loading: () => <div>Loading animation...</div>
  }
);

export const BasicNextJsExample = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Basic Next.js Integration</h2>
      <p>Using dynamic import with SSR disabled:</p>
      
      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset="neomintResearch"
          nodeCount={50}
        />
      </div>
    </div>
  );
};

// Example 2: Next.js with Custom Loading Component
const LoadingPlaceholder = () => (
  <div style={{
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e1e5e9',
    borderRadius: '8px'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e1e5e9',
        borderTop: '4px solid #00958F',
        borderRadius: '50%',
        margin: '0 auto 1rem',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#666' }}>Loading network visualization...</p>
    </div>
    <style jsx>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const DataNetworkWithLoader = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { 
    ssr: false,
    loading: () => <LoadingPlaceholder />
  }
);

export const NextJsWithCustomLoader = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Custom Loading Component</h2>
      <DataNetworkWithLoader
        width="100%"
        height="400px"
        preset="neomintDark"
        nodeCount={60}
      />
    </div>
  );
};

// Example 3: Next.js Page Component
export const NextJsPageExample = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* SEO-friendly content that renders on server */}
      <header style={{ padding: '2rem', backgroundColor: 'white', borderBottom: '1px solid #e1e5e9' }}>
        <h1>Data Visualization Dashboard</h1>
        <p>Real-time network analytics and insights</p>
      </header>

      <main style={{ padding: '2rem' }}>
        {/* Client-side only animation */}
        {mounted && (
          <div style={{ marginBottom: '2rem' }}>
            <DataNetwork
              width="100%"
              height="300px"
              preset="neomintHero"
              context="hero"
            />
          </div>
        )}

        {/* Server-rendered content */}
        <section style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Analytics Overview</h2>
          <p>
            This content is server-rendered for SEO while the animation
            above only loads on the client side.
          </p>
        </section>
      </main>
    </div>
  );
};

// Example 4: Next.js App Directory (app router)
// For Next.js 13+ with app directory
export const NextJsAppDirectoryExample = () => {
  // Mark this component as client-side only
  // 'use client'; // Add this directive at the top of the file

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Next.js App Directory Example</h2>
      <p>For Next.js 13+ app directory, add 'use client' directive:</p>
      
      <pre style={{
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderRadius: '4px',
        overflow: 'auto'
      }}>
{`// app/components/NetworkVisualization.jsx
'use client';

import { DataNetwork } from '@neomint/animations';

export default function NetworkVisualization() {
  return (
    <DataNetwork
      width="100%"
      height="400px"
      preset="neomintResearch"
    />
  );
}`}
      </pre>

      <div style={{ marginTop: '2rem', border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset="cybersecurity"
        />
      </div>
    </div>
  );
};

// Example 5: Next.js with Environment Detection
export const NextJsEnvironmentAware = () => {
  const [isClient, setIsClient] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    setIsClient(true);
    
    // Detect device type
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Determine optimal preset based on device
  const getOptimalPreset = () => {
    switch (deviceType) {
      case 'mobile':
        return 'mobileLight';
      case 'tablet':
        return 'mobileLight';
      default:
        return 'desktopStandard';
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Environment-Aware Integration</h2>
      <p>
        Detected environment: {isClient ? `Client-side (${deviceType})` : 'Server-side'}
      </p>

      {isClient ? (
        <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
          <DataNetwork
            width="100%"
            height="400px"
            preset={getOptimalPreset()}
            performance="auto"
            showStats={true}
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e1e5e9',
          borderRadius: '8px'
        }}>
          <p>Animation will load on client...</p>
        </div>
      )}
    </div>
  );
};

// Example 6: Next.js API Route Integration
export const NextJsAPIIntegration = () => {
  const [performanceData, setPerformanceData] = useState(null);

  const sendPerformanceData = async (data) => {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          performance: data
        })
      });
      
      if (response.ok) {
        console.log('Performance data sent successfully');
      }
    } catch (error) {
      console.error('Failed to send performance data:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>API Route Integration</h2>
      <p>Send performance metrics to Next.js API routes:</p>

      <pre style={{
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderRadius: '4px',
        overflow: 'auto',
        marginBottom: '2rem'
      }}>
{`// pages/api/analytics.js or app/api/analytics/route.js
export async function POST(request) {
  const data = await request.json();
  
  // Process performance data
  console.log('Received performance data:', data);
  
  // Store in database, send to analytics service, etc.
  
  return Response.json({ success: true });
}`}
      </pre>

      <div style={{ border: '1px solid #e1e5e9', borderRadius: '8px', overflow: 'hidden' }}>
        <DataNetwork
          width="100%"
          height="400px"
          preset="fintech"
          analytics={true}
          onPerformanceChange={(data) => {
            setPerformanceData(data);
            sendPerformanceData(data);
          }}
        />
      </div>

      {performanceData && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h4>Latest Performance Data:</h4>
          <pre style={{ fontSize: '0.875rem' }}>{JSON.stringify(performanceData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Example 7: Full Next.js Page Template
const FullNextJsTemplate = () => {
  return (
    <div>
      <h2>Full Next.js Page Template</h2>
      <pre style={{
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderRadius: '4px',
        overflow: 'auto'
      }}>
{`// pages/dashboard.js
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const DataNetwork = dynamic(
  () => import('@neomint/animations').then(mod => mod.DataNetwork),
  { ssr: false }
);

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Analytics Dashboard | NEOMINT</title>
        <meta name="description" content="Real-time data visualization dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <h1>Analytics Dashboard</h1>
          
          {mounted && (
            <section style={{ marginTop: '2rem' }}>
              <DataNetwork
                width="100%"
                height="400px"
                preset="neomintResearch"
                context="dashboard"
                performance="auto"
              />
            </section>
          )}

          <section style={{ marginTop: '3rem' }}>
            <h2>Key Metrics</h2>
            {/* Your dashboard content */}
          </section>
        </div>
      </main>
    </>
  );
}

// Optional: Static props for hybrid rendering
export async function getStaticProps() {
  // Fetch any static data needed
  return {
    props: {
      // Your props
    },
    revalidate: 3600 // Revalidate every hour
  };
}`}
      </pre>
    </div>
  );
};

// Export all examples
export default {
  BasicNextJsExample,
  NextJsWithCustomLoader,
  NextJsPageExample,
  NextJsAppDirectoryExample,
  NextJsEnvironmentAware,
  NextJsAPIIntegration,
  FullNextJsTemplate
};

// Helper function for use in Next.js projects
export const createDataNetworkComponent = (defaultProps = {}) => {
  return dynamic(
    () => import('@neomint/animations').then(mod => mod.DataNetwork),
    {
      ssr: false,
      loading: () => (
        <div style={{
          width: defaultProps.width || '100%',
          height: defaultProps.height || '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <span>Loading...</span>
        </div>
      )
    }
  );
};