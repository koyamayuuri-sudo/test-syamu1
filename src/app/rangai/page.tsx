'use client';

import React, { useState } from 'react';
import { DatePickerInput } from '../../components/DatePickerInput';
import { DEFAULT_DATE } from '../../constants/date';
import DashboardLayout from '../../components/DashboardLayout';

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
  { date: '2026/07/30', code: '401', name: '神撰幣帛料', amount: '123,456 円' },
  { date: '2026/07/30', code: '402', name: '祈祷料', amount: '123,456 円' },
  { date: '2026/07/30', code: '402', name: '祈祷料', amount: '123,456 円' },
  { date: '2026/07/30', code: '402', name: '祈祷料', amount: '123,456 円' },
  { date: '2026/07/30', code: '402', name: '祈祷料', amount: '123,456 円' },
];

export default function RangaiPage() {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [code, setCode] = useState('401');
  const [name] = useState('祈祷所');
  const [amount, setAmount] = useState('234,567');
  const [dataList, setDataList] = useState(INITIAL_DATA);

  const handleAdd = () => {
    if (!code) return;
    setDataList([...dataList, { date, code, name, amount: `${amount} 円` }]);
  };

  const handleSave = () => {
    // DBへの保存処理
  };

  const handlePrint = () => {
    // 帳票出力処理
  };

  // 入力フォーム領域（DashboardLayout の header 内に差し込まれる）
  const inputForm = (
    <>
      <div className="flex flex-wrap items-center gap-6">
        {/* 日付入力 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
          <DatePickerInput value={date} onChange={setDate} />
        </div>

        {/* 勘定コード・名称 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">勘定コード</span>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-white border border-gray-400 rounded px-3 py-1 text-center w-24 shadow-inner font-sans"
          />
          <input
            type="text"
            readOnly
            value={name}
            className="bg-gray-200 border border-gray-400 rounded px-3 py-1 w-48 text-gray-700 shadow-inner font-sans"
          />
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
      {/* テーブル領域（DashboardLayout の main 内に差し込まれる） */}
      <div className="bg-white border border-gray-400 shadow-sm rounded-sm">
        <table className="w-full border-collapse text-sm 2xl:text-base">
          <thead>
            <tr className="border-b border-gray-400 bg-gray-100/70 font-bold text-gray-800">
              <th className="p-3.5 border-r border-gray-300 w-[20%] text-center">日付</th>
              <th className="p-3.5 border-r border-gray-300 w-[20%] text-center">勘定コード</th>
              <th className="p-3.5 border-r border-gray-300 w-[35%] text-center">名称</th>
              <th className="p-3.5 text-center w-[25%]">金額</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((row, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-slate-50">
                <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">
                  {row.date}
                </td>
                <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">
                  {row.code}
                </td>
                <td className="p-3 text-center border-r border-gray-300 font-sans">
                  {row.name}
                </td>
                <td className="p-3 text-right font-sans tabular-nums pr-8">
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}