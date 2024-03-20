'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Basic from './Basic';
import UseInfinite from './UseInfinite';
import Navigation from './Navigation';

const ReactQuery = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Basic />
      <Navigation />
      <UseInfinite />
      <ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQuery;
