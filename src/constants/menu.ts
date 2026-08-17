// constants/menu.ts
export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    href: string;
}

export const SIDE_MENU: MenuItem[] = [
    { id: 'kinsyu', label: '金種登録', icon: '💱', href: '/kinsyu' },
    { id: 'kitou', label: '祈祷', icon: '⛩️', href: '/kitou' },
    { id: 'hatsuho', label: '初穂', icon: '🌾', href: '/hatsuho' },
    { id: 'juyohin', label: '授与品', icon: '🏷️', href: '/juyohin' },
    { id: 'juin', label: '授印', icon: '🖊️', href: '/juin' },
    { id: 'saisen', label: '賽銭', icon: '🪙', href: '/saisen' },
    { id: 'mikuji', label: '御籤', icon: '📜', href: '/mikuji' },
    { id: 'houmotsuden', label: '宝物殿', icon: '🏛️', href: '/houmotsuden' },
    { id: 'sanpai', label: '参拝施設所', icon: '☕', href: '/sanpai' },
    { id: 'rangai', label: '欄外', icon: '📄', href: '/rangai' },
    { id: 'azukarikin', label: '預り金入力', icon: '💵', href: '/azukarikin' },
];