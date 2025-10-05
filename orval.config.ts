import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5400/schema',
    },
    output: {
      clean:false,
    
      mode: 'tags-split',
      target: 'src/lib/api/generated',
      schemas: 'src/lib/api/generated/schemas',
      client: 'react-query',
      httpClient: 'axios',
      baseUrl: 'http://localhost:5400',
      override: {
        mutator: {
          path: 'src/lib/api/custom-axios.ts',
          name: 'customAxios',
        },
        query:{
          useInfinite:true,
          useQuery:true
        }
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
