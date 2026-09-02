<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { MENU_ITEMS } from '../constants/menu';
import { TEST_USERS } from '../constants/testUsers';
import { PAGE_TITLES, DEFAULT_PAGE_TITLE } from '../constants/pageTitles';

// Propsの型定義
interface Props {
  title?: string;
  onSave?: () => void;
  onPrint?: () => void;
}

const props = defineProps<Props>();

const route = useRoute();
const router = useRouter();
const userName = ref<string>('');

// 初期化（ユーザー情報の取得）
onMounted(() => {
  const userId = localStorage.getItem('user_id');
  if (userId) {
    const currentUser = TEST_USERS.find((u) => u.id === userId);
    if (currentUser) {
      userName.value = currentUser.name;
    }
  }
});

// ログアウト処理
const handleLogout = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_location');
  localStorage.removeItem('auth_token');
  router.push('/login');
};

// ページタイトルの動的計算
const pageTitle = computed(() => {
  return props.title || PAGE_TITLES[route.path] || DEFAULT_PAGE_TITLE;
});
</script>

<template>
  <div class="flex h-screen w-screen bg-white font-sans text-gray-800 overflow-hidden">
    
    <!-- 1. 共通サイドバー -->
    <aside class="w-64 h-full bg-[#008C9E] text-white flex flex-col shrink-0 shadow-lg">
      <!-- ロゴヘッダー（上部固定） -->
      <div class="p-4 flex items-center gap-3 border-b border-[#007b8b] shrink-0">
        <div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-[#008C9E] text-xl shadow shrink-0">
          ⛩️
        </div>
        <RouterLink to="/">
          <div class="font-bold text-lg leading-tight tracking-wider text-white hover:opacity-90">
            社入金管理<br />システム
          </div>
        </RouterLink>
      </div>

      <!-- ナビゲーションメニュー＋ログアウトボタン（単一のスクロール領域にする） -->
      <nav class="flex-1 py-2 space-y-0.5 overflow-y-auto min-h-0 no-scrollbar">
        <RouterLink
          v-for="item in MENU_ITEMS"
          :key="item.id"
          :to="item.href"
          :class="[
            'flex items-center gap-3 px-4 py-1.5 text-sm transition-colors',
            route.path === item.href
              ? 'bg-[#55B3C1] font-bold text-white shadow-inner'
              : 'hover:bg-[#007b8b] text-teal-50'
          ]"
        >
          <component :is="item.icon" class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ item.title }}</span>
        </RouterLink>

        <!-- ログアウトボタン（メニューの最下部に移動して固定化を解除） -->
        <div class="pt-2 mt-2 border-t border-[#007b8b] px-2">
          <button
            type="button"
            @click="handleLogout"
            class="w-full flex items-center justify-start gap-3 px-2 py-1.5 text-sm text-left transition-colors hover:bg-[#007b8b] text-teal-50 rounded cursor-pointer"
          >
            <span class="text-lg">🚪</span>
            <span>ログアウト</span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- 2. メインコンテンツエリア -->
    <div class="flex-1 flex flex-col h-full min-w-0 bg-white">
      <!-- ヘッダー（上部固定） -->
      <header class="bg-[#fffcf1] border-b border-stone-200/80 shrink-0 p-6 2xl:p-8 space-y-4 shadow-sm z-10">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold tracking-wider text-slate-800">{{ pageTitle }}</h1>
          <div class="text-base font-bold text-slate-800">{{ userName }}</div>
        </div>

        <div v-if="$slots.inputForm" class="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-col gap-4 text-sm 2xl:text-base">
          <slot name="inputForm" />
        </div>
      </header>

      <!-- メインコンテンツ -->
      <main class="flex-1 overflow-y-auto p-6 2xl:p-8 flex flex-col justify-between bg-white">
        <div class="w-full">
          <slot />
        </div>

        <div v-if="onSave || onPrint" class="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-gray-100 shrink-0">
          <button
            v-if="onSave"
            @click="onSave"
            class="bg-[#FF4D4D] hover:bg-[#E63939] text-[#FFFFFF] px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto cursor-pointer"
          >
            保存
          </button>
          <button
            v-if="onPrint"
            @click="onPrint"
            class="bg-[#997A00] hover:bg-[#806600] text-[#FFFFFF] px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto cursor-pointer"
          >
            帳票出力
          </button>
        </div>
      </main>
    </div>

  </div>
</template>