'use client';

import React, { useState } from 'react';
import { DatePickerInput } from '../../components/DatePickerInput';
import { DEFAULT_DATE } from '../../constants/date';
import { PlaceCodeSelector } from '../../components/PlaceCodeSelector';
import DashboardLayout from '../../components/DashboardLayout';

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
  { date: '2026/07/30', code: '010 - 010', name: '場所名称', method: 'クレジットカード', amount: '123,456 円' },
  { date: '2026/07/30', code: '010 - 010', name: '場所名称', method: '交通系IC', amount: '123,456 円' },
  { date: '2026/07/30', code: '010 - 010', name: '場所名称', method: '現金', amount: '123,456 円' },
];

export default function SanpaiShisetsuPage() {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [placeCode, setPlaceCode] = useState('010-010');
  const [placeName] = useState('場所名称');
  const [paymentMethod, setPaymentMethod] = useState('クレジットカード');
  const [amount, setAmount] = useState('234,567');
  const [dataList, setDataList] = useState(INITIAL_DATA);

  const handleAdd = () => {
    setDataList([
      ...dataList,
      { date, code: placeCode, name: placeName, method: paymentMethod, amount: `${amount} 円` },
    ]);
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
      <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
        {/* 日付入力 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
          <DatePickerInput value={date} onChange={setDate} />
        </div>

        {/* 場所コード・名称 */}
        <PlaceCodeSelector value={placeCode} onChange={setPlaceCode} />

        {/* 支払い方法 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">支払い方法</span>
          <div className="relative">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="bg-white border border-gray-400 rounded px-4 py-1 pr-8 appearance-none shadow-inner font-sans"
            >
              <option value="クレジットカード">クレジットカード</option>
              <option value="交通系IC">交通系IC</option>
              <option value="現金">現金</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">
              ▼
            </span>
          </div>
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
              <th className="p-3.5 border-r border-gray-300 w-[18%] text-center">日付</th>
              <th className="p-3.5 border-r border-gray-300 w-[18%] text-center">場所コード</th>
              <th className="p-3.5 border-r border-gray-300 w-[24%] text-center">名称</th>
              <th className="p-3.5 border-r border-gray-300 w-[20%] text-center">支払い方法</th>
              <th className="p-3.5 text-center w-[20%]">金額</th>
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
                <td className="p-3 text-center border-r border-gray-300 font-sans">
                  {row.method}
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