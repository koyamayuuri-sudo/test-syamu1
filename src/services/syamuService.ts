// src/services/syamuService.ts

export interface Syamu {
  id: string;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = 'my_app_syamus';

export const syamuService = {
  // データの取得
  getAll: (): Syamu[] => {
    if (typeof window === 'undefined') return []; // サーバーサイドレンダリング(SSR)対策
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // データの保存
  save: (syamus: Syamu[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(syamus));
  }
};