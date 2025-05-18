/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_ER_GRAPH_APP: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
