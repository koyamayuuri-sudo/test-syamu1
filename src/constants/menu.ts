// constants/menu.ts
// export interface MenuItem {
//     id: string;
//     label: string;
//     icon: string;
//     href: string;
// }

// export const SIDE_MENU: MenuItem[] = [
//     { id: 'kitou', label: '祈祷', icon: '⛩️', href: '/kitou' },
//     { id: 'hatsuho', label: '初穂', icon: '🌾', href: '/hatsuho' },
//     { id: 'juyohin', label: '授与品', icon: '🏷️', href: '/juyohin' },
//     { id: 'juin', label: '授印', icon: '🖊️', href: '/juin' },
//     { id: 'saisen', label: '賽銭', icon: '🪙', href: '/saisen' },
//     { id: 'mikuji', label: '御籤', icon: '📜', href: '/mikuji' },
//     { id: 'houmotsuden', label: '宝物殿', icon: '🏛️', href: '/houmotsuden' },
//     { id: 'sanpai', label: '参拝施設所', icon: '☕', href: '/sanpai' },
//     { id: 'rangai', label: '欄外', icon: '📄', href: '/rangai' },
//     { id: 'azukarikin', label: '預り金入力', icon: '💵', href: '/azukarikin' },
//     { id: 'master', label: 'マスタ', icon: '⚙', href: '/master' },
// ];

import { LucideIcon } from 'lucide-react';
import {
    Flame,
    Sprout,
    Package,
    PenTool,
    Coins,
    Scroll,
    Landmark,
    Coffee,
    FileSpreadsheet,
    Wallet,
    Settings,
} from 'lucide-react';

export interface MenuItem {
    id: string;
    title: string;
    href: string;
    icon: LucideIcon;
    color: string;
}

export const MENU_ITEMS: MenuItem[] = [
    { id: 'kitou', title: '祈祷', href: '/kitou', icon: Flame, color: 'text-red-700' },
    { id: 'hatsuho', title: '初穂', href: '/hatsuho', icon: Sprout, color: 'text-emerald-700' },
    { id: 'juyohin', title: '授与品', href: '/juyohin', icon: Package, color: 'text-purple-700' },
    { id: 'juin', title: '授印', href: '/juin', icon: PenTool, color: 'text-amber-600' },
    { id: 'saisen', title: '賽銭', href: '/saisen', icon: Coins, color: 'text-red-700' },
    { id: 'mikuji', title: '御籤', href: '/mikuji', icon: Scroll, color: 'text-emerald-700' },
    { id: 'houmotsuden', title: '宝物殿', href: '/houmotsuden', icon: Landmark, color: 'text-purple-700' },
    { id: 'sanpai', title: '参拝施設所', href: '/sanpai', icon: Coffee, color: 'text-amber-600' },
    { id: 'rangai', title: '欄外', href: '/rangai', icon: FileSpreadsheet, color: 'text-red-700' },
    { id: 'azukarikin', title: '預り金入力', href: '/azukarikin', icon: Wallet, color: 'text-emerald-700' },
    { id: 'master', title: 'マスタ', href: '/master', icon: Settings, color: 'text-slate-700' },
];