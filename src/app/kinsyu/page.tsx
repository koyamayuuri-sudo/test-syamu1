'use client';

import React, { useState } from 'react';
import { DatePickerInput } from '../../components/DatePickerInput';
import { DEFAULT_DATE } from '../../constants/date';
import DashboardLayout from '../../components/DashboardLayout';

// テストデータ（DB疎通時に削除）
const INITIAL_DATA = [
    { date: '2026/07/30', number: '1', amount: '123,456 円', type: '初穂', donator: '株式会社〇〇' },
    { date: '2026/07/30', number: '4', amount: '123,456 円', type: '絵馬', donator: '田中 太郎' },
    { date: '2026/07/30', number: '9', amount: '123,456 円', type: '月首祭', donator: 'Taro Tanaka' },
];

export default function KinsyuPage() {
    const [date, setDate] = useState(DEFAULT_DATE);
    const [number, setNumber] = useState('78');
    const [amount, setAmount] = useState('234,567');
    const [hatsuhoType, setHatsuhoType] = useState('家商祈願');
    const [donator, setDonator] = useState('株式会社〇〇');
    const [dataList, setDataList] = useState(INITIAL_DATA);

    const handleAdd = () => {
        if (!number) return;
        const newEntry = {
            date,
            number,
            amount: amount ? `${amount} 円` : '',
            type: hatsuhoType,
            donator,
        };
        setDataList([...dataList, newEntry]);
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

                {/* 番号 */}
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">番号</span>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="bg-white border border-gray-400 rounded px-3 py-1 text-center w-20 shadow-inner font-sans"
                    />
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

                {/* 初穂種別 */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="font-bold text-gray-700">初穂種別</span>
                    <div className="relative">
                        <select
                            value={hatsuhoType}
                            onChange={(e) => setHatsuhoType(e.target.value)}
                            className="bg-white border border-gray-400 rounded px-4 py-1 pr-8 appearance-none shadow-inner font-sans"
                        >
                            <option value="家商祈願">家商祈願</option>
                            <option value="初穂">初穂</option>
                            <option value="絵馬">絵馬</option>
                            <option value="月首祭">月首祭</option>
                        </select>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-gray-600">
                            ▼
                        </span>
                    </div>
                </div>

                {/* 奉納者 */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="font-bold text-gray-700">奉納者</span>
                    <input
                        type="text"
                        value={donator}
                        onChange={(e) => setDonator(e.target.value)}
                        className="bg-white border border-gray-400 rounded px-3 py-1 w-64 shadow-inner font-sans"
                    />
                </div>
            </div>

            {/* 追加ボタン */}
            <div className="flex justify-end pt-2 sm:pt-0">
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
                            <th className="p-3.5 border-r border-gray-300 w-[15%] text-center">日付</th>
                            <th className="p-3.5 border-r border-gray-300 w-[12%] text-center">番号</th>
                            <th className="p-3.5 border-r border-gray-300 w-[20%] text-center">金額</th>
                            <th className="p-3.5 border-r border-gray-300 w-[18%] text-center">初穂種別</th>
                            <th className="p-3.5 text-center w-[35%]">奉納者</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((row, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-slate-50">
                                <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">
                                    {row.date}
                                </td>
                                <td className="p-3 text-center border-r border-gray-300 font-sans tabular-nums">
                                    {row.number}
                                </td>
                                <td className="p-3 text-right border-r border-gray-300 font-sans tabular-nums pr-8">
                                    {row.amount}
                                </td>
                                <td className="p-3 text-center border-r border-gray-300 font-sans">
                                    {row.type}
                                </td>
                                <td className="p-3 text-left pl-8 font-sans">{row.donator}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}