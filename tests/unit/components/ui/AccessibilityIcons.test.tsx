import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@/tests/utils/test-utils';
import {
  AccessibilityHumanIcon,
  BrainIcon,
  ChevronLeftIcon,
  ContrastIcon,
  EyeIcon,
  LinkIcon,
  MousePointerIcon,
  PauseIcon,
  ResetIcon,
  RulerIcon,
  TypeIcon,
  XMarkIcon,
} from '@/app/components/ui/AccessibilityIcons';

describe('AccessibilityIcons', () => {
  test('renders all icons with custom classes', () => {
    const { container } = render(
      <div>
        <XMarkIcon className="icon-x" />
        <ChevronLeftIcon className="icon-chevron" strokeWidth={2} />
        <AccessibilityHumanIcon className="icon-human" strokeWidth={2} />
        <EyeIcon className="icon-eye" strokeWidth={2} />
        <TypeIcon className="icon-type" strokeWidth={2} />
        <ContrastIcon className="icon-contrast" strokeWidth={2} />
        <ResetIcon className="icon-reset" strokeWidth={2} />
        <MousePointerIcon className="icon-mouse" strokeWidth={2} />
        <LinkIcon className="icon-link" strokeWidth={2} />
        <RulerIcon className="icon-ruler" strokeWidth={2} />
        <PauseIcon className="icon-pause" strokeWidth={2} />
        <BrainIcon className="icon-brain" strokeWidth={2} />
      </div>
    );

    expect(container.querySelectorAll('svg').length).toBe(12);
    expect(container.querySelector('svg.icon-x')).toBeInTheDocument();
    expect(container.querySelector('svg.icon-chevron')).toHaveAttribute('stroke-width', '2');
    expect(container.querySelector('svg.icon-brain')).toBeInTheDocument();
  });
});
