'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlaceCodeSelector } from '../components/PlaceCodeSelector';
import { DatePickerInput } from '../components/DatePickerInput';
import { DEFAULT_DATE } from '../constants/date';
import DashboardLayout from '../components/DashboardLayout';

// テーブルの表示データ
const SUMMARY_ITEMS = [
  {
    title: '祈祷料',
    href: '/kitou',
    rows: [
      { label: '数量', value: '23' },
      { label: '金額', value: '123,456 円' },
    ],
  },
  {
    title: '初穂料',
    href: '/hatsuho',
    rows: [
      { label: '数量', value: '4' },
      { label: '金額', value: '123,456 円' },
    ],
  },
  {
    title: '授与品',
    href: '/juyohin',
    rows: [
      { label: '金額(神符守札)', value: '123,456 円' },
      { label: '金額(社頭絵図)', value: '123,456 円' },
    ],
  },
  {
    title: '授印料',
    href: '/juin',
    rows: [
      { label: '数量', value: '98' },
      { label: '金額', value: '123,456 円' },
    ],
  },
  {
    title: '賽銭',
    href: '/saisen',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '御籤',
    href: '/mikuji',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '拝観料',
    href: '/houmotsuden',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '参拝施設所',
    href: '/sanpai',
    rows: [{ label: '', value: '123,456 円' }],
  },
  {
    title: '欄外',
    href: '/rangai',
    rows: [{ label: '', value: '123,456 円' }],
  },
];

export default function DepositLedgerPage() {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [placeCode, setPlaceCode] = useState('010-010');

  const handleSearch = () => {
    // 検索処理
  };

  const handlePrint = () => {
    // 帳票出力処理
  };

  // 検索・条件指定ボックス（DashboardLayout の header 内に差し込まれる）
  const inputForm = (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
        {/* 日付入力 */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm 2xl:text-base text-gray-700">日付</span>
          <DatePickerInput value={date} onChange={setDate} />
        </div>

        {/* 場所コード選択 */}
        <PlaceCodeSelector value={placeCode} onChange={setPlaceCode} />
      </div>

      {/* 検索ボタン */}
      <button
        onClick={handleSearch}
        className="bg-[#004EA2] hover:bg-[#003B7B] text-white h-10 px-8 inline-flex items-center justify-center text-sm font-bold rounded-md shadow transition active:translate-y-0.5 shrink-0 border-0 leading-none"
      >
        検索
      </button>
    </div>
  );

  return (
    <DashboardLayout inputForm={inputForm} onPrint={handlePrint}>
      {/* 集計テーブル領域 */}
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
                          <Link href={item.href}>
                            <span className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                              🔗
                            </span>
                          </Link>
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

            {/* 合計金額行 */}
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
    </DashboardLayout>
  );
}