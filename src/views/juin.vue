<script setup lang="ts">
import { ref } from 'vue';
import DatePickerInput from '../components/DatePickerInput.vue';
import DashboardLayout from '../components/DashboardLayout.vue';
import { DEFAULT_DATE } from '../constants/date';

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
  { date: '2026/07/30', sheets: '23', amount: '123,456 円' },
];

// リアクティブな状態の定義
const date = ref(DEFAULT_DATE);
const sheets = ref('78');
const amount = ref('234,567');
const dataList = ref([...INITIAL_DATA]);

// 行追加処理
const handleAdd = () => {
  if (!sheets.value) return;
  dataList.value.push({
    date: date.value,
    sheets: sheets.value,
    amount: `${amount.value} 円`,
  });
};

// 保存処理
const handleSave = () => {
  // DBへの保存処理
};

// 帳票出力処理
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

        <!-- 枚数 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">枚数</span>
          <input
            type="text"
            v-model="sheets"
            class="bg-white border border-gray-400 rounded px-3 py-1 text-right w-24 shadow-inner font-sans"
          />
        </div>

        <!-- 金額 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">金額</span>
          <input
            type="text"
            v-model="amount"
            class="bg-white border border-gray-400 rounded px-3 py-1 text-right w-40 shadow-inner font-sans"
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
            <th class="p-3.5 border-r border-gray-300 w-[30%] text-center">日付</th>
            <th class="p-3.5 border-r border-gray-300 w-[30%] text-center">枚数</th>
            <th class="p-3.5 text-center w-[40%]">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in dataList"
            :key="index"
            class="border-b border-gray-300 hover:bg-slate-50"
          >
            <td class="p-3 text-center border-r border-gray-300 font-sans tabular-nums">
              {{ row.date }}
            </td>
            <td class="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-12">
              {{ row.sheets }}
            </td>
            <td class="p-3 text-right font-sans tabular-nums pr-12">
              {{ row.amount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>