'use client';

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '../components/DashboardLayout';
import { MENU_ITEMS } from '../constants/menu';

const NOTIFICATIONS = [
  {
    id: 1,
    status: '未入力',
    statusType: 'warning',
    date: '令和8年9月21日',
    message: '初穂実績登録 に未入力の項目があります',
    isNew: true,
  },
  {
    id: 2,
    status: '完了済',
    statusType: 'success',
    date: '令和8年8月17日',
    message: '授与品明細の登録 が完了しました',
    isNew: false,
  },
  {
    id: 3,
    status: '完了済',
    statusType: 'success',
    date: '令和8年8月10日',
    message: '拝観料の実績登録 が完了しました',
    isNew: false,
  },
  {
    id: 4,
    status: '未入力',
    statusType: 'warning',
    date: '令和8年8月1日',
    message: '収益事業の売上金の登録 に未入力の項目があります',
    isNew: false,
  },
];

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="p-6 bg-[#FAF7F0] min-h-[calc(100vh-80px)] flex flex-col gap-8 w-full">
        
        {/* メニューグリッド（共通定数をループ描画） */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4 w-full">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href} className="w-full">
                <div className="bg-white rounded-xl p-3 w-full aspect-square flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all border border-stone-100 cursor-pointer group">
                  <div className="shrink-0">
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${item.color} transition-transform group-hover:scale-110`} />
                  </div>
                  <span className={`font-serif font-bold text-sm sm:text-base ${item.color} text-center line-clamp-1`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* お知らせ・通知リスト */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-200/60 w-full">
          <div className="max-h-[280px] overflow-y-auto pr-2 flex flex-col gap-3">
            {NOTIFICATIONS.map((notice) => (
              <div
                key={notice.id}
                className="flex items-center justify-between p-3 border-b border-stone-100 last:border-0 hover:bg-stone-50/50 rounded-lg transition w-full"
              >
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  {/* ステータスバッジ */}
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm shrink-0 ${
                      notice.statusType === 'warning'
                        ? 'bg-[#FFEB80]'
                        : 'bg-[#10B981] text-white'
                    }`}
                  >
                    {notice.status}
                  </span>

                  {/* 日付 */}
                  <span className="text-sm font-medium text-stone-700 min-w-[110px] shrink-0">
                    {notice.date}
                  </span>

                  {/* メッセージ */}
                  <span className="text-sm font-medium text-stone-800 truncate">
                    {notice.message}
                  </span>
                </div>

                {/* NEWバッジ */}
                {notice.isNew && (
                  <span className="text-xs font-bold text-red-500 tracking-wider animate-pulse shrink-0 ml-4">
                    NEW!
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}