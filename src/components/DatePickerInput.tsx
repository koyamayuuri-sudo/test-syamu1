'use client';

import React, { useRef } from 'react';

interface DatePickerInputProps {
  value: string; // "YYYY/MM/DD" 形式
  onChange: (value: string) => void;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange }) => {
  const hiddenDateInputRef = useRef<HTMLInputElement>(null);

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
    const inputEl = hiddenDateInputRef.current;
    if (!inputEl) return;

    // TypeScriptの型絞り込み(never)を防ぐため (inputEl as any) で判定
    if (typeof (inputEl as any).showPicker === 'function') {
      inputEl.showPicker();
    } else {
      inputEl.click();
    }
  };

  // カレンダーで選択された時のイベント
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIso = e.target.value;
    if (selectedIso) {
      onChange(formatFromISO(selectedIso));
    }
  };

  return (
    <div className="relative inline-block">
      {/* テキスト入力フィールド */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDoubleClick={handleDoubleClick}
        placeholder="YYYY/MM/DD"
        title="ダブルクリックでカレンダーを開く"
        className="bg-white border border-gray-400 rounded px-3 py-1 text-center w-36 shadow-inner font-sans tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer select-none"
      />

      {/* ダブルクリック時に起動する隠し date input */}
      <input
        ref={hiddenDateInputRef}
        type="date"
        value={formatToISO(value)}
        onChange={handleDateChange}
        className="sr-only absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
        tabIndex={-1}
      />
    </div>
  );
};