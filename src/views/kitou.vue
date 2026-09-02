<script setup lang="ts">
import { ref } from 'vue';
import DatePickerInput from '../components/DatePickerInput.vue';
import DashboardLayout from '../components/DashboardLayout.vue';
import { DEFAULT_DATE } from '../constants/date';

// テストデータ（DB疎通時に削除）
const INITIAL_PRAYER_DATA = [
  { date: '2026/07/30', type: '家商祈願', count: '23', amount: '123,456 円' },
  { date: '2026/07/30', type: '家内安全', count: '34', amount: '' },
  { date: '2026/07/30', type: '商売繁昌', count: '56', amount: '' },
  { date: '2026/07/30', type: '厄除', count: '78', amount: '' },
  { date: '2026/07/30', type: '還暦厄除', count: '1', amount: '' },
  { date: '2026/07/30', type: '開運厄除', count: '3', amount: '' },
  { date: '2026/07/30', type: '捷災招福', count: '2', amount: '' },
];

// 入力フォームの状態管理
const date = ref(DEFAULT_DATE);
const prayerType = ref('家商祈願');
const count = ref('78');
const amount = ref('234,567');

// テーブルデータ
const prayerList = ref([...INITIAL_PRAYER_DATA]);

// 追加ボタンの処理
const handleAdd = () => {
  if (!count.value) return;
  prayerList.value.push({
    date: date.value,
    type: prayerType.value,
    count: count.value,
    amount: amount.value ? `${amount.value} 円` : '',
  });
};

const handleSave = () => {
  // DBへの保存処理
};

const handlePrint = () => {
  // 帳票出力処理
};
</script>

<template>
  <DashboardLayout :onSave="handleSave" :onPrint="handlePrint">
    <!-- 入力フォーム領域（DashboardLayout の inputForm スロットに差し込まれる） -->
    <template #inputForm>
      <div class="flex flex-wrap items-center gap-6">
        <!-- 日付入力 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
          <DatePickerInput v-model="date" />
        </div>

        <!-- 祈祷種別 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">祈祷種別</span>
          <div class="relative">
            <select
              v-model="prayerType"
              class="bg-white border border-gray-400 rounded px-4 py-1 pr-8 text-center appearance-none shadow-inner font-sans focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <option value="家商祈願">家商祈願</option>
              <option value="家内安全">家内安全</option>
              <option value="商売繁昌">商売繁昌</option>
              <option value="厄除">厄除</option>
              <option value="開運厄除">開運厄除</option>
            </select>
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">
              ▼
            </span>
          </div>
        </div>

        <!-- 数量 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">数量</span>
          <input
            type="text"
            v-model="count"
            class="bg-white border border-gray-400 rounded px-3 py-1 text-right w-24 shadow-inner font-sans tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- 金額 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">金額</span>
          <input
            type="text"
            v-model="amount"
            class="bg-white border border-gray-400 rounded px-3 py-1 text-right w-40 shadow-inner font-sans tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <!-- 追加ボタン -->
      <div class="flex justify-end pt-1">
        <button
          type="button"
          @click="handleAdd"
          class="bg-[#0F7B42] hover:bg-[#0B5E32] text-white h-10 px-8 inline-flex items-center justify-center text-sm font-bold rounded-md shadow transition active:translate-y-0.5 shrink-0 border-0 leading-none cursor-pointer"
        >
          追加
        </button>
      </div>
    </template>

    <!-- テーブル領域（DashboardLayout の デフォルトスロット に差し込まれる） -->
    <div class="bg-white border border-gray-400 shadow-sm rounded-sm">
      <table class="w-full border-collapse text-sm 2xl:text-base">
        <thead>
          <tr class="border-b border-gray-400 bg-gray-100/70 font-bold text-gray-800">
            <th class="p-3.5 2xl:p-4 border-r border-gray-300 w-[20%] text-center">日付</th>
            <th class="p-3.5 2xl:p-4 border-r border-gray-300 w-[35%] text-center">祈祷種別</th>
            <th class="p-3.5 2xl:p-4 border-r border-gray-300 w-[20%] text-center">数量</th>
            <th class="p-3.5 2xl:p-4 text-center w-[25%]">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in prayerList"
            :key="index"
            class="border-b border-gray-300 hover:bg-slate-50"
          >
            <td class="p-3 2xl:p-3.5 text-center border-r border-gray-300 font-sans tabular-nums text-gray-800">
              {{ row.date }}
            </td>
            <td class="p-3 2xl:p-3.5 text-center border-r border-gray-300 font-sans text-gray-800">
              {{ row.type }}
            </td>
            <td class="p-3 2xl:p-3.5 text-right border-r border-gray-300 font-sans tabular-nums pr-12 text-gray-900 text-base 2xl:text-lg">
              {{ row.count }}
            </td>
            <td class="p-3 2xl:p-3.5 text-right font-sans tabular-nums pr-12 text-gray-900 text-base 2xl:text-lg">
              {{ row.amount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>