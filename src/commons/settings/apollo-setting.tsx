"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface IApolloSettings {
   children: React.ReactNode
}

export default function ApolloSettings(props: IApolloSettings) {
   const client = new ApolloClient({
      uri: 'https://main-practice.codebootcamp.co.kr/graphql',
      cache: new InMemoryCache(),
   });

   return (
      <ApolloProvider client={client}>
         {props.children}
      </ApolloProvider>
   );
}

