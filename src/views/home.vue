<script setup lang="ts">
import { RouterLink } from 'vue-router';
import DashboardLayout from '../components/DashboardLayout.vue';
import { MENU_ITEMS } from '../constants/menu';

// 通知データ
const NOTIFICATIONS = [
    {
        id: 1,
        status: '未完了',
        statusType: 'error',
        date: '2026年09月21日',
        time: '16時07分',
        message: '祈祷殿の日次締めが未完了です',
        isNew: true,
    },
    {
        id: 2,
        status: '完了',
        statusType: 'success',
        date: '2026年09月21日',
        time: '14時56分',
        message: '祈祷受付所の日次締めが完了しました',
        isNew: false,
    },
    {
        id: 3,
        status: '完了',
        statusType: 'success',
        date: '2026年08月01日',
        time: '16時22分',
        message: '上宮授与所の日次締めが完了しました',
        isNew: false,
    },
    {
        id: 4,
        status: '完了',
        statusType: 'success',
        date: '2026年08月01日',
        time: '16時22分',
        message: '若宮授与所の日次締めが完了しました',
        isNew: false,
    },
];
</script>

<template>
    <DashboardLayout>
        <div class="px-4 sm:px-6 pt-2 pb-6 bg-white flex flex-col gap-4 w-full">

            <!-- 1. お知らせ・通知リスト（上部） -->
            <div class="bg-white rounded-2xl p-4 shadow-md border border-stone-200/80 w-full">
                <div class="h-[120px] overflow-y-auto pr-2 flex flex-col gap-2">
                    <div v-for="notice in NOTIFICATIONS" :key="notice.id"
                        class="flex items-center justify-between py-1 px-2 hover:bg-stone-50 rounded-lg transition w-full text-sm shrink-0">
                        <div class="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                            <!-- ステータスバッジ -->
                            <span :class="[
                                'px-5 py-1 rounded-full text-xs font-bold text-white shadow-sm shrink-0 min-w-[72px] text-center',
                                notice.statusType === 'error' ? 'bg-[#FF4D4D]' : 'bg-[#8E9297]'
                            ]">
                                {{ notice.status }}
                            </span>

                            <!-- 日時 -->
                            <div class="flex items-center gap-3 text-stone-700 shrink-0 font-medium">
                                <span>{{ notice.date }}</span>
                                <span>{{ notice.time }}</span>
                            </div>

                            <!-- メッセージ -->
                            <span class="text-stone-800 font-medium truncate">
                                {{ notice.message }}
                            </span>
                        </div>

                        <!-- NEWバッジ -->
                        <span v-if="notice.isNew" class="text-xs font-bold text-[#FF4D4D] tracking-wider shrink-0 ml-4">
                            NEW!
                        </span>
                    </div>
                </div>
            </div>

            <!-- 2. メニューグリッド（下部） -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
                <RouterLink v-for="item in MENU_ITEMS" :key="item.id" :to="item.href" class="w-full">
                    <div
                        class="bg-white rounded-2xl p-4 w-full aspect-square flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all border border-stone-100 cursor-pointer group">
                        <div class="shrink-0 text-slate-800 group-hover:scale-105 transition-transform">
                            <component :is="item.icon" class="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                        <span class="font-bold text-xs sm:text-sm text-slate-800 text-center line-clamp-2">
                            {{ item.title }}
                        </span>
                    </div>
                </RouterLink>
            </div>

        </div>
    </DashboardLayout>
</template>