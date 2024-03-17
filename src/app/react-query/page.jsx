'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Basic from './Basic';

const ReactQuery = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Basic />
    </QueryClientProvider>
  );
};

export default ReactQuery;
