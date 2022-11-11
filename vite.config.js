import { defineConfig } from 'vite';
import path from "path";
import glob from "glob";
import vitePugPlugin from 'vite-plugin-pug-transformer';

const locals = { bundler: 'Vite' };

export default defineConfig({
  plugins: [vitePugPlugin({ pugLocals: locals })],
  build: {
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, "*.html")),
      
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
              return 'assets/images/[name]-[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';   
          }
       
          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return '/assets/[name]-[hash][extname]';
        },
      },
    }
  },
});
