'use client';

import React from 'react';
import { PLACE_NAMES } from '../constants/place';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const PlaceCodeSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold text-sm 2xl:text-base text-gray-700">場所コード</span>
      
      {/* 1. 場所コード選択プルダウン */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white border border-gray-400 rounded px-3 py-1 pr-8 appearance-none shadow-inner font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {/* PLACE_NAMES のキー一覧から自動で <option> を生成 */}
          {Object.keys(PLACE_NAMES).map((code) => (
            <option key={code} value={code}>
              {code.replace('-', ' - ')}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">▼</span>
      </div>

      {/* 2. 選択されたコードに紐づく場所名称の表示欄 */}
      <input
        type="text"
        readOnly
        value={PLACE_NAMES[value] || ''}
        placeholder="場所名称"
        className="bg-gray-200 border border-gray-400 rounded px-3 py-1 w-64 text-gray-700 shadow-inner"
      />
    </div>
  );
};