import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, waitFor } from '@/tests/utils/test-utils';
import AnalyticsLoader from '@/app/components/ui/AnalyticsLoader';

const originalNodeEnv = process.env.NODE_ENV;
const originalRequestIdleCallback = window.requestIdleCallback;

describe('AnalyticsLoader', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
    localStorage.clear();
    document.body.innerHTML = '';
    document.documentElement.dataset.tncInsightsLoaded = '';
    document.documentElement.dataset.tncSpeedInsightsLoaded = '';
    window.requestIdleCallback = ((cb: () => void) => {
      cb();
      return 1;
    }) as typeof window.requestIdleCallback;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    window.requestIdleCallback = originalRequestIdleCallback;
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  test('injects analytics scripts when consent is accepted', async () => {
    localStorage.setItem(
      'tnc-consent',
      JSON.stringify({ choice: 'accepted', analytics: true })
    );

    render(<AnalyticsLoader />);

    await waitFor(() => {
      expect(document.getElementById('__vercel_insights')).toBeInTheDocument();
      expect(document.getElementById('__vercel_speed_insights')).toBeInTheDocument();
    });
  });

  test('does not inject scripts outside production', async () => {
    process.env.NODE_ENV = 'test';
    localStorage.setItem(
      'tnc-consent',
      JSON.stringify({ choice: 'accepted', analytics: true })
    );

    render(<AnalyticsLoader />);

    await waitFor(() => {
      expect(document.getElementById('__vercel_insights')).not.toBeInTheDocument();
      expect(document.getElementById('__vercel_speed_insights')).not.toBeInTheDocument();
    });
  });
});
