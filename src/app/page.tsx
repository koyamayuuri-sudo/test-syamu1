'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// サイドメニューのデータ定義
const SIDE_MENU = [
  { id: '祈祷', label: '祈祷', icon: '⛩️', href: '/kitou', active: false },
  { id: '初穂', label: '初穂', icon: '🌾', href: '/hatsuho', active: false },
  { id: '授与品', label: '授与品', icon: '🏷️', href: '/juyohin', active: false },
  { id: '授印', label: '授印', icon: '🖊️', href: '/juin', active: false },
  { id: '賽銭', label: '賽銭', icon: '🪙', href: '/saisen', active: false },
  { id: '御籤', label: '御籤', icon: '📜', href: '/mikuji', active: false },
  { id: '宝物殿', label: '宝物殿', icon: '🏛️', href: '/houmotsuden', active: false },
  { id: '参拝施設所', label: '参拝施設所', icon: '☕', href: '/sanpai', active: false },
  { id: '欄外', label: '欄外', icon: '📄', href: '/rangai', active: false },
  { id: '預り金入力', label: '預り金入力', icon: '💵', href: '/azukarikin', active: false },
];

// テーブルの表示データ
const SUMMARY_ITEMS = [
  {
    title: '祈祷料',
    rows: [
      { label: '数量', value: '23' },
      { label: '金額', value: '123,456 円' },
    ],
  },
  {
    title: '初穂料',
    rows: [
      { label: '数量', value: '4' },
      { label: '金額', value: '123,456 円' },
    ],
  },
  {
    title: '授与品',
    rows: [
      { label: '金額(神符守札)', value: '123,456 円' },
      { label: '金額(社頭絵図)', value: '123,456 円' },
    ],
  },
  {
    title: '授印料',
    rows: [
      { label: '数量', value: '98' },
      { label: '金額', value: '123,456 円' },
    ],
  },
  {
    title: '賽銭',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '御籤',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '拝観料',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '参拝施設所',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '欄外',
    rows: [{ label: '', value: '123,456 円' }],
  },
];

export default function DepositLedgerPage() {
  const [date, setDate] = useState('2026/07/30');
  const [placeCode, setPlaceCode] = useState('010-010');

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

        {/* 固定ヘッダー（タイトル ＋ 検索・条件指定エリア） */}
        <header className="bg-gray-200/90 backdrop-blur-sm border-b border-gray-300 shrink-0 sticky top-0 z-10 p-6 2xl:p-8 space-y-4 shadow-sm">
          {/* 上段：タイトル＆ユーザー名 */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider text-slate-800">社入金台帳</h1>
            <div className="text-base font-medium text-slate-700">管理者</div>
          </div>

          {/* 下段：検索・条件指定ボックス */}
          <div className="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {/* 日付入力 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white border border-gray-400 rounded px-3 py-1 text-center w-36 shadow-inner font-sans tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* 場所コード選択 */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm 2xl:text-base text-gray-700">場所コード</span>
                <div className="relative">
                  <select
                    value={placeCode}
                    onChange={(e) => setPlaceCode(e.target.value)}
                    className="bg-white border border-gray-400 rounded px-3 py-1 pr-8 appearance-none shadow-inner font-sans focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="010-010">010 - 010</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">▼</span>
                </div>
                <input
                  type="text"
                  readOnly
                  value="祈祷所"
                  className="bg-gray-200 border border-gray-400 rounded px-3 py-1 w-48 text-gray-700 shadow-inner"
                />
              </div>
            </div>

            {/* 検索ボタン */}
            <button className="bg-[#004EA2] hover:bg-[#003B7B] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5">
              検索
            </button>
          </div>
        </header>

        {/* メインコンテンツ（テーブルとアクションボタンのみスクロール） */}
        <main className="flex-1 p-6 2xl:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="w-full">
            {/* 集計テーブル */}
            <div className="bg-white border border-gray-400 shadow-sm rounded-sm">
              <table className="w-full border-collapse text-left text-sm 2xl:text-base">
                <tbody>
                  {SUMMARY_ITEMS.map((item, itemIdx) => (
                    <React.Fragment key={itemIdx}>
                      {item.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-gray-300 hover:bg-slate-50">
                          {/* 項目名 */}
                          {rowIdx === 0 && (
                            <td
                              rowSpan={item.rows.length}
                              className="w-[25%] border-r border-gray-300 bg-gray-100/50 p-3.5 2xl:p-4 font-bold align-middle text-gray-800"
                            >
                              <div className="flex items-center gap-2">
                                <span>{item.title}</span>
                                <span className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">🔗</span>
                              </div>
                            </td>
                          )}

                          {/* サブ項目（数量/金額など） */}
                          {row.label ? (
                            <td className="w-[20%] border-r border-gray-300 p-3 2xl:p-3.5 text-center bg-gray-50/30 text-gray-700">
                              {row.label}
                            </td>
                          ) : null}

                          {/* 値 */}
                          <td
                            colSpan={row.label ? 1 : 2}
                            className="p-3 2xl:p-3.5 text-right font-sans font-normal tabular-nums text-gray-900 pr-12 text-base 2xl:text-lg"
                          >
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* 合計金額行（非固定） */}
                  <tr className="bg-[#F8D0FF] font-bold border-t-2 border-gray-400">
                    <td colSpan={2} className="p-4 text-center border-r border-gray-400 text-gray-900">
                      合計金額
                    </td>
                    <td className="p-4 text-right pr-12 font-sans tabular-nums text-gray-900 text-lg 2xl:text-xl">
                      123,456,789 円
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. 右下アクションボタン */}
          <div className="flex justify-end mt-6">
            <button className="bg-[#997A00] hover:bg-[#806600] text-white px-10 py-3 rounded-full font-bold shadow-md transition active:translate-y-0.5 text-base">
              帳票出力
            </button>
          </div>
        </main>
      </div>

    </div>
  );
}