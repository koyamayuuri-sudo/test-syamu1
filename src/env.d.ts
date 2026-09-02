/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// ↓ CSSインポート（副作用インポート）をTypeScriptに許可する記述
declare module '*.css';