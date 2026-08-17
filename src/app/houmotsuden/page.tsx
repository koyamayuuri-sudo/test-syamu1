'use client';

import React, { useState } from 'react';
import { DatePickerInput } from '../../components/DatePickerInput';
import { DEFAULT_DATE } from '../../constants/date';
import DashboardLayout from '../../components/DashboardLayout';

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
  { date: '2026/07/30', amount: '123,456 円', adult: '7', child: '11' },
];

export default function HoumotsudenPage() {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [amount, setAmount] = useState('234,567');
  const [adultCount, setAdultCount] = useState('7');
  const [childCount, setChildCount] = useState('11');
  const [dataList, setDataList] = useState(INITIAL_DATA);

  const handleAdd = () => {
    setDataList([
      ...dataList,
      { date, amount: `${amount} 円`, adult: adultCount, child: childCount },
    ]);
  };

  const handleSave = () => {
    // DBへの保存処理
  };

  const handlePrint = () => {
    // 帳票出力処理
  };

  // 入力フォーム領域
  const inputForm = (
    <>
      <div className="flex flex-wrap items-center gap-6">
        {/* 日付入力 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
          <DatePickerInput value={date} onChange={setDate} />
        </div>

        {/* 金額 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">金額</span>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-40 shadow-inner font-sans"
          />
        </div>

        {/* 割引人数（大人） */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">割引人数（大人）</span>
          <input
            type="text"
            value={adultCount}
            onChange={(e) => setAdultCount(e.target.value)}
            className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-20 shadow-inner font-sans"
          />
        </div>

        {/* 割引人数（小人） */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">割引人数（小人）</span>
          <input
            type="text"
            value={childCount}
            onChange={(e) => setChildCount(e.target.value)}
            className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-20 shadow-inner font-sans"
          />
        </div>
      </div>

      {/* 追加ボタン */}
      <div className="flex justify-end pt-1">
        <button
          onClick={handleAdd}
          className="bg-[#0F7B42] hover:bg-[#0B5E32] text-white h-10 px-8 inline-flex items-center justify-center text-sm font-bold rounded-md shadow transition active:translate-y-0.5 shrink-0 border-0 leading-none"
        >
          追加
        </button>
      </div>
    </>
  );

  return (
    <DashboardLayout inputForm={inputForm} onSave={handleSave} onPrint={handlePrint}>
      {/* テーブル領域 */}
      <div className="bg-white border border-gray-400 shadow-sm rounded-sm">
        <table className="w-full border-collapse text-sm 2xl:text-base">
          <thead>
            <tr className="border-b border-gray-400 bg-gray-100/70 font-bold text-gray-800">
              <th className="p-3.5 border-r border-gray-300 w-[20%] text-center">日付</th>
              <th className="p-3.5 border-r border-gray-300 w-[25%] text-center">金額</th>
              <th className="p-3.5 border-r border-gray-300 w-[27.5%] text-center">
                割引人数（大人）
              </th>
              <th className="p-3.5 text-center w-[27.5%]">割引人数（小人）</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((row, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-slate-50">
                <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">
                  {row.date}
                </td>
                <td className="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-8">
                  {row.amount}
                </td>
                <td className="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-12">
                  {row.adult}
                </td>
                <td className="p-3 text-right font-sans tabular-nums pr-12">{row.child}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}