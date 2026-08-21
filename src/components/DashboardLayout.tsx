'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MENU_ITEMS } from '../constants/menu';
import { TEST_USERS } from '../constants/testUsers';

interface DashboardLayoutProps {
    children: React.ReactNode;
    inputForm?: React.ReactNode;
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
    const router = useRouter();
    const [userName, setUserName] = useState<string>('');

    // ホーム画面かどうかを判定
    const isHomePage = pathname === '/';

    // クライアントサイドで localStorage からユーザー情報を取得
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            const currentUser = TEST_USERS.find((u) => u.id === userId);
            if (currentUser) {
                setUserName(currentUser.name);
            }
        }
    }, []);

    // ログアウト処理
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_location');
        localStorage.removeItem('auth_token');
        router.push('/login');
    };

    // 現在のパスから該当するメニュー（タイトル）を取得
    const currentMenu = MENU_ITEMS.find((item) => item.href === pathname);
    const pageTitle = currentMenu ? currentMenu.title : isHomePage ? 'ホーム' : '';

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

                {/* メニューエリア（ホーム画面では非表示） */}
                <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                    {!isHomePage && MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon; // ★ 修正ポイント: 大文字の変数にコンポーネントを代入

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-1 text-base transition-colors ${
                                    isActive
                                        ? 'bg-[#55B3C1] font-bold text-white shadow-inner'
                                        : 'hover:bg-[#007b8b] text-teal-50'
                                }`}
                            >
                                {/* ★ 修正ポイント: コンポーネントとして呼び出し（サイズ調整も実施） */}
                                <Icon className="w-5 h-5 shrink-0" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ログアウトボタン（サイドバー最下部） */}
                <div className="py-1 border-t border-[#007b8b] shrink-0">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-start gap-3 px-4 py-1 text-base text-left transition-colors hover:bg-[#007b8b] text-teal-50 rounded cursor-pointer"
                    >
                        <span className="text-xl">🚪</span>
                        <span>ログアウト</span>
                    </button>
                </div>
            </aside>

            {/* 2. メインコンテンツエリア */}
            <div className="flex-1 flex flex-col h-screen min-w-0">
                {/* 固定ヘッダー */}
                <header className="bg-gray-200/90 backdrop-blur-sm border-b border-gray-300 shrink-0 sticky top-0 z-10 p-6 2xl:p-8 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold tracking-wider text-slate-800">{pageTitle}</h1>
                        <div className="text-base font-medium text-slate-700">{userName}</div>
                    </div>

                    {/* 入力フォーム枠（inputForm が渡された場合のみ表示） */}
                    {inputForm && (
                        <div className="bg-[#FFEAD0] p-4 2xl:p-5 rounded-xl shadow-md border border-[#FCD29F] flex flex-col gap-4 text-sm 2xl:text-base">
                            {inputForm}
                        </div>
                    )}
                </header>

                {/* スクロール可能なメインコンテンツ */}
                <main className="flex-1 p-6 2xl:p-8 flex flex-col justify-between overflow-y-auto">
                    <div className="w-full">{children}</div>

                    {/* 共通アクションボタン（ホーム画面以外、かつボタンハンドラがある場合のみ表示） */}
                    {!isHomePage && (onSave || onPrint) && (
                        <div className="flex justify-end items-center gap-4 mt-6">
                            {onSave && (
                                <button
                                    onClick={onSave}
                                    className="bg-[#FF4D4D] hover:bg-[#E63939] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto"
                                >
                                    保存
                                </button>
                            )}
                            {onPrint && (
                                <button
                                    onClick={onPrint}
                                    className="bg-[#997A00] hover:bg-[#806600] text-white px-10 py-2 rounded-md font-bold shadow transition active:translate-y-0.5 w-full sm:w-auto"
                                >
                                    帳票出力
                                </button>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}