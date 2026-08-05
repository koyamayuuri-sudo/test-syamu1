'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// サイドメニューのデータ定義（「祈祷」をアクティブ状態に設定）
const SIDE_MENU = [
  { id: '祈祷', label: '祈祷', icon: '⛩️', href: '#', active: true },
  { id: '初穂', label: '初穂', icon: '🌾', href: '#', active: false },
  { id: '授与品', label: '授与品', icon: '🏷️', href: '#', active: false },
  { id: '授印', label: '授印', icon: '🖊️', href: '#', active: false },
  { id: '賽銭', label: '賽銭', icon: '🪙', href: '#', active: false },
  { id: '御籤', label: '御籤', icon: '📜', href: '#', active: false },
  { id: '宝物殿', label: '宝物殿', icon: '🏛️', href: '#', active: false },
  { id: '参拝施設所', label: '参拝施設所', icon: '☕', href: '#', active: false },
  { id: '欄外', label: '欄外', icon: '📄', href: '#', active: false },
  { id: '預り金入力', label: '預り金入力', icon: '💵', href: '#', active: false },
];

// テーブルの初期データ
const INITIAL_PRAYER_DATA = [
  { date: '2026/07/30', type: '家商祈願', count: '23', amount: '123,456 円' },
  { date: '2026/07/30', type: '家内安全', count: '34', amount: '' },
  { date: '2026/07/30', type: '商売繁昌', count: '56', amount: '' },
  { date: '2026/07/30', type: '厄除', count: '78', amount: '' },
  { date: '2026/07/30', type: '還暦厄除', count: '1', amount: '' },
  { date: '2026/07/30', type: '開運厄除', count: '3', amount: '' },
  { date: '2026/07/30', type: '捷災招福', count: '2', amount: '' },
];

export default function PrayerDetailPage() {
  // 入力フォームの状態管理
  const [inputDate, setInputDate] = useState('2026/07/30');
  const [prayerType, setPrayerType] = useState('家商祈願');
  const [count, setCount] = useState('78');
  const [amount, setAmount] = useState('234,567');

  // テーブルデータ
  const [prayerList, setPrayerList] = useState(INITIAL_PRAYER_DATA);

  // 追加ボタンの処理
  const handleAdd = () => {
    if (!count) return;
    const newEntry = {
      date: inputDate,
      type: prayerType,
      count: count,
      amount: amount ? `${amount} 円` : '',
    };
    setPrayerList([...prayerList, newEntry]);
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-serif text-gray-800 overflow-hidden">

      {/* 1. 左側サイドバー（画面左に固定） */}
      <aside className="w-64 h-screen bg-[#008C9E] text-white flex flex-col shrink-0 shadow-lg sticky top-0">
        {/* ロゴ・システム名 */}
        <div className="p-4 flex items-center gap-3 border-b border-[#007b8b] shrink-0">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-[#008C9E] text-xl shadow shrink-0">
            ⛩️
          </div>
          <Link href="/">
            <div className="font-bold text-lg leading-tight tracking-wider">
              社入金管理<br />システム
            </div>
          </Link>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {SIDE_MENU.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-base transition-colors ${
                item.active
                  ? 'bg-[#55B3C1] font-bold text-white shadow-inner'
                  : 'hover:bg-[#007b8b] text-teal-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* 2. メインコンテンツエリア */}
      <div className="flex-1 flex flex-col h-screen min-w-0">

        {/* 固定ヘッダー（タイトル ＋ データ入力エリア） */}
        <header className="bg-gray-200/90 backdrop-blur-sm border-b border-gray-300 shrink-0 sticky top-0 z-10 p-6 2xl:p-8 space-y-4 shadow-sm">
          {/* 上段：タイトル＆ユーザー名 */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider text-slate-800">祈祷</h1>
            <div className="text-base font-medium text-slate-700">管理者</div>
          </div>

          {/* 下段：祈祷データ入力ボックス */}
          <div className="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-wrap items-center justify-between gap-4 text-sm 2xl:text-base">
            <div className="flex flex-wrap items-center gap-6">
              {/* 日付入力 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">日付</span>
                <input
                  type="text"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="bg-white border border-gray-400 rounded px-3 py-1 text-center w-36 shadow-inner font-sans tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* 祈祷種別 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">祈祷種別</span>
                <div className="relative">
                  <select
                    value={prayerType}
                    onChange={(e) => setPrayerType(e.target.value)}
                    className="bg-white border border-gray-400 rounded px-4 py-1 pr-8 text-center appearance-none shadow-inner font-serif focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="家商祈願">家商祈願</option>
                    <option value="家内安全">家内安全</option>
                    <option value="商売繁昌">商売繁昌</option>
                    <option value="厄除">厄除</option>
                    <option value="開運厄除">開運厄除</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">▼</span>
                </div>
              </div>

              {/* 数量 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">数量</span>
                <input
                  type="text"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-24 shadow-inner font-sans tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* 金額 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">金額</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white border border-gray-400 rounded px-3 py-1 text-right w-40 shadow-inner font-sans tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* 追加ボタン */}
            <button
              onClick={handleAdd}
              className="bg-[#0F7B42] hover:bg-[#0B5E32] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5"
            >
              追加
            </button>
          </div>
        </header>

        {/* メインコンテンツ（一覧テーブルとアクションボタンのみスクロール） */}
        <main className="flex-1 p-6 2xl:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="w-full">
            {/* 一覧テーブル */}
            <div className="bg-white border border-gray-400 shadow-sm rounded-sm">
              <table className="w-full border-collapse text-sm 2xl:text-base">
                <thead>
                  <tr className="border-b border-gray-400 bg-gray-100/70 font-bold text-gray-800">
                    <th className="p-3.5 2xl:p-4 border-r border-gray-300 w-[20%] text-center">日付</th>
                    <th className="p-3.5 2xl:p-4 border-r border-gray-300 w-[35%] text-center">祈祷種別</th>
                    <th className="p-3.5 2xl:p-4 border-r border-gray-300 w-[20%] text-center">数量</th>
                    <th className="p-3.5 2xl:p-4 text-center w-[25%]">金額</th>
                  </tr>
                </thead>
                <tbody>
                  {prayerList.map((row, index) => (
                    <tr key={index} className="border-b border-gray-300 hover:bg-slate-50">
                      {/* 日付 */}
                      <td className="p-3 2xl:p-3.5 text-center border-r border-gray-300 font-sans tabular-nums text-gray-800">
                        {row.date}
                      </td>
                      {/* 祈祷種別 */}
                      <td className="p-3 2xl:p-3.5 text-center border-r border-gray-300 font-serif text-gray-800">
                        {row.type}
                      </td>
                      {/* 数量 */}
                      <td className="p-3 2xl:p-3.5 text-right border-r border-gray-300 font-sans tabular-nums pr-12 text-gray-900 text-base 2xl:text-lg">
                        {row.count}
                      </td>
                      {/* 金額 */}
                      <td className="p-3 2xl:p-3.5 text-right font-sans tabular-nums pr-12 text-gray-900 text-base 2xl:text-lg">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. 右下アクションボタン（保存 ＆ 帳票出力） */}
          <div className="flex justify-end items-center gap-4 mt-6">
            <button className="bg-[#FF4D4D] hover:bg-[#E63939] text-white px-10 py-3 rounded-full font-bold shadow-md transition active:translate-y-0.5 text-base">
              保存
            </button>
            <button className="bg-[#997A00] hover:bg-[#806600] text-white px-10 py-3 rounded-full font-bold shadow-md transition active:translate-y-0.5 text-base">
              帳票出力
            </button>
          </div>
        </main>
      </div>

    </div>
  );
}