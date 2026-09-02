import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';

// 1. ルーティングテーブルの定義
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home, // HomeView から Home へ修正
        meta: {
            title: 'ホーム',
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'), // LoginView.vue から Login.vue へ修正
        meta: {
            title: 'ログイン',
            requiresAuth: false,
        },
    },
    {
        path: '/hatsuho',
        name: 'Hatsuho',
        component: () => import('../views/hatsuho.vue'),
        meta: {
            title: '初穂料',
            requiresAuth: true,
        },
    },
    {
        path: '/azukarikin',
        name: 'Azukarikin',
        component: () => import('../views/azukarikin.vue'),
        meta: {
            title: '預り金',
            requiresAuth: true,
        },
    },
    {
        // 存在しないURLにアクセスされた場合の404リダイレクト
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];

// 2. ルーターインスタンスの作成
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

// 3. ナビゲーションガード（遷移前の処理）
router.beforeEach((to, from, next) => {
    // ① ページタイトルの自動設定
    if (to.meta.title) {
        document.title = `${to.meta.title} | 社入金管理システム`;
    }

    // ② 簡易認証チェック（localStorageのトークン有無を確認）
    const isAuthenticated = !!localStorage.getItem('user_id');

    if (to.meta.requiresAuth && !isAuthenticated) {
        // 認証が必要なページかつ未ログインの場合はログイン画面へ
        next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
        // ログイン済みでログイン画面にアクセスした場合はホームへ
        next({ name: 'Home' });
    } else {
        // 通常遷移
        next();
    }
});

export default router;