'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SIDE_MENU = [
  { id: '祈祷', label: '祈祷', icon: '⛩️', href: '#', active: false },
  { id: '初穂', label: '初穂', icon: '🌾', href: '#', active: false },
  { id: '授与品', label: '授与品', icon: '🏷️', href: '#', active: false },
  { id: '授印', label: '授印', icon: '🖊️', href: '#', active: false },
  { id: '賽銭', label: '賽銭', icon: '🪙', href: '#', active: false },
  { id: '御籤', label: '御籤', icon: '📜', href: '#', active: false },
  { id: '宝物殿', label: '宝物殿', icon: '🏛️', href: '#', active: false },
  { id: '参拝施設所', label: '参拝施設所', icon: '☕', href: '#', active: true },
  { id: '欄外', label: '欄外', icon: '📄', href: '#', active: false },
  { id: '預り金入力', label: '預り金入力', icon: '💵', href: '#', active: false },
];

const INITIAL_DATA = [
  { date: '2026/07/30', code: '010 - 010', name: '場所名称', method: 'クレジットカード', amount: '123,456 円' },
  { date: '2026/07/30', code: '010 - 010', name: '場所名称', method: '交通系IC', amount: '123,456 円' },
  { date: '2026/07/30', code: '010 - 010', name: '場所名称', method: '現金', amount: '123,456 円' },
];

export default function SanpaiShisetsuPage() {
  const [inputDate, setInputDate] = useState('2026/07/30');
  const [placeCode, setPlaceCode] = useState('010-010');
  const [placeName] = useState('場所名称');
  const [paymentMethod, setPaymentMethod] = useState('クレジットカード');
  const [amount, setAmount] = useState('234,567');
  const [dataList, setDataList] = useState(INITIAL_DATA);

  const handleAdd = () => {
    setDataList([...dataList, { date: inputDate, code: placeCode, name: placeName, method: paymentMethod, amount: `${amount} 円` }]);
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-serif text-gray-800 overflow-hidden">
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
            <h1 className="text-xl font-bold tracking-wider text-slate-800">参拝施設所</h1>
            <div className="text-base font-medium text-slate-700">管理者</div>
          </div>

          <div className="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-wrap items-center justify-between gap-4 text-sm 2xl:text-base">
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">日付</span>
                <input type="text" value={inputDate} onChange={(e) => setInputDate(e.target.value)} className="bg-white border border-gray-400 rounded px-3 py-1 text-center w-36 shadow-inner font-sans" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">場所コード</span>
                <div className="relative">
                  <select value={placeCode} onChange={(e) => setPlaceCode(e.target.value)} className="bg-white border border-gray-400 rounded px-4 py-1 pr-8 text-center appearance-none shadow-inner font-sans">
                    <option value="010-010">010 - 010</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">▼</span>
                </div>
                <input type="text" readOnly value={placeName} className="bg-gray-200 border border-gray-400 rounded px-3 py-1 w-48 text-gray-700 shadow-inner font-serif" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">支払い方法</span>
                <div className="relative">
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="bg-white border border-gray-400 rounded px-4 py-1 pr-8 appearance-none shadow-inner font-serif">
                    <option value="クレジットカード">クレジットカード</option>
                    <option value="交通系IC">交通系IC</option>
                    <option value="現金">現金</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">▼</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">金額</span>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-40 shadow-inner font-sans" />
              </div>
            </div>
            <button onClick={handleAdd} className="bg-[#0F7B42] hover:bg-[#0B5E32] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5">追加</button>
          </div>
        </header>

        <main className="flex-1 p-6 2xl:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="w-full bg-white border border-gray-400 shadow-sm rounded-sm">
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
                    <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">{row.date}</td>
                    <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">{row.code}</td>
                    <td className="p-3 text-center border-r border-gray-300 font-serif">{row.name}</td>
                    <td className="p-3 text-center border-r border-gray-300 font-serif">{row.method}</td>
                    <td className="p-3 text-right font-sans tabular-nums pr-8">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center gap-4 mt-6">
            <button className="bg-[#FF4D4D] hover:bg-[#E63939] text-white px-10 py-3 rounded-full font-bold shadow-md transition">保存</button>
            <button className="bg-[#997A00] hover:bg-[#806600] text-white px-10 py-3 rounded-full font-bold shadow-md transition">帳票出力</button>
          </div>
        </main>
      </div>
    </div>
  );
}