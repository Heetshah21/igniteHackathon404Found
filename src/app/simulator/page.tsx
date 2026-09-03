'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SimulationHub } from '@/components/simulation/SimulationHub';

export default function SimulatorPage() {
  return (
    <AppLayout>
      <SimulationHub />
    </AppLayout>
  );
}
