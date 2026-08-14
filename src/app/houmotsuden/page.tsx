'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DatePickerInput } from '../../components/DatePickerInput';
import { DEFAULT_DATE } from '../../constants/date';

// サイドメニュー
const SIDE_MENU = [
  { id: '祈祷', label: '祈祷', icon: '⛩️', href: '/kitou', active: false },
  { id: '初穂', label: '初穂', icon: '🌾', href: '/hatsuho', active: false },
  { id: '授与品', label: '授与品', icon: '🏷️', href: '/juyohin', active: false },
  { id: '授印', label: '授印', icon: '🖊️', href: '/juin', active: false },
  { id: '賽銭', label: '賽銭', icon: '🪙', href: '/saisen', active: false },
  { id: '御籤', label: '御籤', icon: '📜', href: '/mikuji', active: false },
  { id: '宝物殿', label: '宝物殿', icon: '🏛️', href: '/houmotsuden', active: true },
  { id: '参拝施設所', label: '参拝施設所', icon: '☕', href: '/sanpai', active: false },
  { id: '欄外', label: '欄外', icon: '📄', href: '/rangai', active: false },
  { id: '預り金入力', label: '預り金入力', icon: '💵', href: '/azukarikin', active: false },
];

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
  { date: '2026/07/30', amount: '123,456 円', adult: '7', child: '11' },
];

export default function HoumutsudenPage() {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [amount, setAmount] = useState('234,567');
  const [adultCount, setAdultCount] = useState('7');
  const [childCount, setChildCount] = useState('11');
  const [dataList, setDataList] = useState(INITIAL_DATA);

  const handleAdd = () => {
    setDataList([...dataList, { date: date, amount: `${amount} 円`, adult: adultCount, child: childCount }]);
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-sans text-gray-800 overflow-hidden">
      <aside className="w-64 h-screen bg-[#008C9E] text-white flex flex-col shrink-0 shadow-lg sticky top-0">
        <div className="p-4 flex items-center gap-3 border-b border-[#007b8b] shrink-0">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-[#008C9E] text-xl shadow">⛩️</div>
          <Link href="/"><div className="font-bold text-lg leading-tight tracking-wider">社入金管理<br />システム</div></Link>
        </div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {SIDE_MENU.map((item) => (
            <Link key={item.id} href={item.href} className={`flex items-center gap-3 px-6 py-3 text-base transition-colors ${item.active ? 'bg-[#55B3C1] font-bold text-white shadow-inner' : 'hover:bg-[#007b8b] text-teal-50'}`}>
              <span className="text-xl">{item.icon}</span><span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-screen min-w-0">
        <header className="bg-gray-200/90 backdrop-blur-sm border-b border-gray-300 shrink-0 sticky top-0 z-10 p-6 2xl:p-8 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider text-slate-800">宝物殿</h1>
            <div className="text-base font-medium text-slate-700">管理者</div>
          </div>

          {/* 入力エリア */}
          <div className="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-col gap-4 text-sm 2xl:text-base">
            {/* 入力項目グループ（折り返し対応） */}
            <div className="flex flex-wrap items-center gap-6">
              {/* 日付入力 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
                <DatePickerInput value={date} onChange={setDate} />
              </div>
              {/* 金額 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">金額</span>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-40 shadow-inner font-sans" />
              </div>
              {/* 割引人数（大人） */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">割引人数（大人）</span>
                <input type="text" value={adultCount} onChange={(e) => setAdultCount(e.target.value)} className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-20 shadow-inner font-sans" />
              </div>
              {/* 割引人数（小人） */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">割引人数（小人）</span>
                <input type="text" value={childCount} onChange={(e) => setChildCount(e.target.value)} className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-20 shadow-inner font-sans" />
              </div>
            </div>

            {/* 追加ボタン（常に一番下の右端に固定） */}
            <div className="flex justify-end pt-1">
              <button onClick={handleAdd} className="bg-[#0F7B42] hover:bg-[#0B5E32] text-white h-10 px-8 inline-flex items-center justify-center text-sm font-bold rounded-md shadow transition active:translate-y-0.5 shrink-0 border-0 leading-none">
                追加
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 2xl:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="w-full bg-white border border-gray-400 shadow-sm rounded-sm">
            <table className="w-full border-collapse text-sm 2xl:text-base">
              <thead>
                <tr className="border-b border-gray-400 bg-gray-100/70 font-bold text-gray-800">
                  <th className="p-3.5 border-r border-gray-300 w-[20%] text-center">日付</th>
                  <th className="p-3.5 border-r border-gray-300 w-[25%] text-center">金額</th>
                  <th className="p-3.5 border-r border-gray-300 w-[27.5%] text-center">割引人数（大人）</th>
                  <th className="p-3.5 text-center w-[27.5%]">割引人数（小人）</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((row, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-slate-50">
                    <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">{row.date}</td>
                    <td className="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-8">{row.amount}</td>
                    <td className="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-12">{row.adult}</td>
                    <td className="p-3 text-right font-sans tabular-nums pr-12">{row.child}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center gap-4 mt-6">
            <button className="bg-[#FF4D4D] hover:bg-[#E63939] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto">保存</button>
            <button className="bg-[#997A00] hover:bg-[#806600] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto">帳票出力</button>
          </div>
        </main>
      </div>
    </div>
  );
}