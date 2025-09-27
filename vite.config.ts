import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@utils': resolve(__dirname, 'src/utils'),
            '@services': resolve(__dirname, 'src/services'),
            '@api': resolve(__dirname, 'src/api'),
            '@logos': resolve(__dirname, 'src/assets/logos'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@context': resolve(__dirname, 'src/context'),
            '@stores': resolve(__dirname, 'src/stores'),
            '@types': resolve(__dirname, 'src/types'),
            '@pages': resolve(__dirname, 'src/pages'),
        },
    },
    plugins: [react()],
});