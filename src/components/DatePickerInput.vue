<script setup lang="ts">
import { ref } from 'vue';

// Props と Emits（v-model の定義）
interface Props {
  modelValue: string; // "YYYY/MM/DD" 形式
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// DOM参照用の ref (HTMLInputElement)
const hiddenDateInputRef = ref<HTMLInputElement | null>(null);

// "YYYY/MM/DD" -> "YYYY-MM-DD" への変換
const formatToISO = (dateStr: string) => {
  if (!dateStr) return '';
  return dateStr.replace(/\//g, '-');
};

// "YYYY-MM-DD" -> "YYYY/MM/DD" への変換
const formatFromISO = (isoStr: string) => {
  if (!isoStr) return '';
  return isoStr.replace(/-/g, '/');
};

// ダブルクリック時に非表示の input[type="date"] のカレンダーを開く
const handleDoubleClick = () => {
  const inputEl = hiddenDateInputRef.value;
  if (!inputEl) return;

  if (typeof (inputEl as any).showPicker === 'function') {
    inputEl.showPicker();
  } else {
    inputEl.click();
  }
};

// カレンダーで選択された時のイベント
const handleDateChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const selectedIso = target.value;
  if (selectedIso) {
    emit('update:modelValue', formatFromISO(selectedIso));
  }
};

// 手入力時のイベント
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="relative inline-block">
    <!-- テキスト入力フィールド -->
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      @dblclick="handleDoubleClick"
      placeholder="YYYY/MM/DD"
      title="ダブルクリックでカレンダーを開く"
      class="bg-white border border-gray-400 rounded px-3 py-1 text-center w-36 shadow-inner font-sans tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer select-none"
    />

    <!-- ダブルクリック時に起動する隠し date input -->
    <input
      ref="hiddenDateInputRef"
      type="date"
      :value="formatToISO(modelValue)"
      @change="handleDateChange"
      class="sr-only absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
      tabindex="-1"
    />
  </div>
</template>