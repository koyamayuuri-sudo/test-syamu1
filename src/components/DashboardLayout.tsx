// components/DashboardLayout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDE_MENU } from '../constants/menu';

interface DashboardLayoutProps {
    children: React.ReactNode;
    inputForm: React.ReactNode; // 上部のオレンジの入力エリア
    onSave?: () => void;
    onPrint?: () => void;
}

export default function DashboardLayout({
    children,
    inputForm,
    onSave,
    onPrint,
}: DashboardLayoutProps) {
    const pathname = usePathname();

    // 現在のパスから該当するメニュー（タイトル）を取得
    const currentMenu = SIDE_MENU.find((item) => item.href === pathname);
    const pageTitle = currentMenu ? currentMenu.label : '';

    return (
        <div className="flex h-screen bg-[#FDFBF7] font-sans text-gray-800 overflow-hidden">
            {/* 1. 共通サイドバー */}
            <aside className="w-64 h-screen bg-[#008C9E] text-white flex flex-col shrink-0 shadow-lg sticky top-0">
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
                <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                    {SIDE_MENU.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-6 py-3 text-base transition-colors ${isActive
                                        ? 'bg-[#55B3C1] font-bold text-white shadow-inner'
                                        : 'hover:bg-[#007b8b] text-teal-50'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* 2. メインコンテンツエリア */}
            <div className="flex-1 flex flex-col h-screen min-w-0">
                {/* 固定ヘッダー */}
                <header className="bg-gray-200/90 backdrop-blur-sm border-b border-gray-300 shrink-0 sticky top-0 z-10 p-6 2xl:p-8 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold tracking-wider text-slate-800">{pageTitle}</h1>
                        <div className="text-base font-medium text-slate-700">管理者</div>
                    </div>

                    {/* 入力フォーム枠（各ページから差し込まれる） */}
                    <div className="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-col gap-4 text-sm 2xl:text-base">
                        {inputForm}
                    </div>
                </header>

                {/* スクロール可能なメインコンテンツ */}
                <main className="flex-1 p-6 2xl:p-8 flex flex-col justify-between overflow-y-auto">
                    <div className="w-full">{children}</div>

                    {/* 共通アクションボタン */}
                    <div className="flex justify-end items-center gap-4 mt-6">
                        <button
                            onClick={onSave}
                            className="bg-[#FF4D4D] hover:bg-[#E63939] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto"
                        >
                            保存
                        </button>
                        <button
                            onClick={onPrint}
                            className="bg-[#997A00] hover:bg-[#806600] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto"
                        >
                            帳票出力
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}