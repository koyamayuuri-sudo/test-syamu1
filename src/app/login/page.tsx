'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // IDとパスワードの簡易認証（両方 "0000" の場合のみ許可）
        if (id === '0000' && password === '0000') {
            // ローカルストレージにユーザー情報を保存
            localStorage.setItem('user_id', id);
            localStorage.setItem('auth_token', 'dummy_token_' + Date.now());

            setError('');
            // ホーム画面へ遷移
            router.push('/');
        } else {
            setError('IDまたはパスワードが正しくありません');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#fdfbf2] flex items-center justify-center p-4">
            {/* メインカード */}
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-12 sm:p-16 flex flex-col items-center">

                {/* タイトル */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 tracking-wide">
                    ログイン
                </h1>

                {/* エラーメッセージ表示エリア */}
                {error && (
                    <p className="text-red-500 text-sm mb-4 font-bold">
                        {error}
                    </p>
                )}

                {/* フォーム */}
                <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-5">
                    {/* ID入力欄 */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="id" className="text-sm font-bold text-gray-800">
                            ID
                        </label>
                        <input
                            id="id"
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full bg-[#f0ede9] border border-gray-400 rounded px-3 py-1.5 text-gray-800 focus:outline-none focus:ring-1 focus:ring-teal-600 transition"
                            required
                        />
                    </div>

                    {/* パスワード入力欄 */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-bold text-gray-800">
                            パスワード
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#f0ede9] border border-gray-400 rounded px-3 py-1.5 text-gray-800 focus:outline-none focus:ring-1 focus:ring-teal-600 transition"
                            required
                        />
                    </div>

                    {/* ログインボタン */}
                    <div className="flex justify-center mt-3">
                        <button
                            type="submit"
                            className="bg-[#008f9c] hover:bg-[#007a85] text-white text-xs font-bold py-2 px-10 rounded-full shadow-sm hover:shadow transition duration-200 active:scale-95 cursor-pointer"
                        >
                            ログイン
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}