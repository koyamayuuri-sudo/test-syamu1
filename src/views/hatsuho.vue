<script setup lang="ts">
import { ref } from 'vue';
import DatePickerInput from '../components/DatePickerInput.vue';
import DashboardLayout from '../components/DashboardLayout.vue';
import { DEFAULT_DATE } from '../constants/date';

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
  { date: '2026/07/30', number: '1', amount: '123,456 円', type: '初穂', donator: '株式会社〇〇' },
  { date: '2026/07/30', number: '4', amount: '123,456 円', type: '絵馬', donator: '田中 太郎' },
  { date: '2026/07/30', number: '9', amount: '123,456 円', type: '月首祭', donator: 'Taro Tanaka' },
];

// リアクティブな状態の定義
const date = ref(DEFAULT_DATE);
const number = ref('78');
const amount = ref('234,567');
const hatsuhoType = ref('家商祈願');
const donator = ref('株式会社〇〇');
const dataList = ref([...INITIAL_DATA]);

// 行追加処理
const handleAdd = () => {
  if (!number.value) return;
  dataList.value.push({
    date: date.value,
    number: number.value,
    amount: amount.value ? `${amount.value} 円` : '',
    type: hatsuhoType.value,
    donator: donator.value,
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
      <div class="flex flex-wrap items-center gap-y-3 gap-x-6">
        <!-- 日付入力 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
          <DatePickerInput v-model="date" />
        </div>

        <!-- 番号 -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">番号</span>
          <input
            type="text"
            v-model="number"
            class="bg-white border border-gray-400 rounded px-3 py-1 text-center w-20 shadow-inner font-sans"
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

        <!-- 初穂種別 -->
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <span class="font-bold text-gray-700">初穂種別</span>
          <div class="relative">
            <select
              v-model="hatsuhoType"
              class="bg-white border border-gray-400 rounded px-4 py-1 pr-8 appearance-none shadow-inner font-sans cursor-pointer"
            >
              <option value="家商祈願">家商祈願</option>
              <option value="初穂">初穂</option>
              <option value="絵馬">絵馬</option>
              <option value="月首祭">月首祭</option>
            </select>
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">
              ▼
            </span>
          </div>
        </div>

        <!-- 奉納者 -->
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <span class="font-bold text-gray-700">奉納者</span>
          <input
            type="text"
            v-model="donator"
            class="bg-white border border-gray-400 rounded px-3 py-1 w-64 shadow-inner font-sans"
          />
        </div>
      </div>

      <!-- 追加ボタン -->
      <div class="flex justify-end pt-2 sm:pt-0">
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
            <th class="p-3.5 border-r border-gray-300 w-[15%] text-center">日付</th>
            <th class="p-3.5 border-r border-gray-300 w-[12%] text-center">番号</th>
            <th class="p-3.5 border-r border-gray-300 w-[20%] text-center">金額</th>
            <th class="p-3.5 border-r border-gray-300 w-[18%] text-center">初穂種別</th>
            <th class="p-3.5 text-center w-[35%]">奉納者</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in dataList"
            :key="index"
            class="border-b border-gray-300 hover:bg-slate-50"
          >
            <td class="p-3 text-center border-r border-gray-300 font-sans tabular-nums">{{ row.date }}</td>
            <td class="p-3 text-center border-r border-gray-300 font-sans tabular-nums">{{ row.number }}</td>
            <td class="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-8">{{ row.amount }}</td>
            <td class="p-3 text-center border-r border-gray-300 font-sans">{{ row.type }}</td>
            <td class="p-3 text-left pl-8 font-sans">{{ row.donator }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardLayout>
</template>