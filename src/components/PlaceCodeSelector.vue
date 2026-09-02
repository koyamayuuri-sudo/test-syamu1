<script setup lang="ts">
import { PLACE_NAMES } from '../constants/place';

// Props と Emits (v-model の定義)
interface Props {
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// プルダウン変更時のイベントハンドラー
const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="font-bold text-sm 2xl:text-base text-gray-700">場所コード</span>

    <!-- 1. 場所コード選択プルダウン -->
    <div class="relative">
      <select
        :value="modelValue"
        @change="handleChange"
        class="bg-white border border-gray-400 rounded px-3 py-1 pr-8 appearance-none shadow-inner font-sans focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        <!-- PLACE_NAMES のキー一覧から自動で <option> を生成 -->
        <option
          v-for="code in Object.keys(PLACE_NAMES)"
          :key="code"
          :value="code"
        >
          {{ code.replace('-', ' - ') }}
        </option>
      </select>
      <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">▼</span>
    </div>

    <!-- 2. 選択されたコードに紐づく場所名称の表示欄 -->
    <input
      type="text"
      readonly
      :value="PLACE_NAMES[modelValue] || ''"
      placeholder="場所名称"
      class="bg-gray-200 border border-gray-400 rounded px-3 py-1 w-64 text-gray-700 shadow-inner"
    />
  </div>
</template>