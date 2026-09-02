import {
    type LucideIcon,
    BadgeJapaneseYen,
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
} from 'lucide-vue-next';

export interface MenuItem {
    id: string;
    title: string;
    href: string;
    icon: LucideIcon;
}

export const MENU_ITEMS: MenuItem[] = [
    { id: 'kinsyu', title: '金種', href: '/kinsyu', icon: BadgeJapaneseYen },
    { id: 'kitouZisseki', title: '祈祷実績', href: '/kitou-zisseki', icon: Flame },
    { id: 'hatsuhoZisseki', title: '初穂実績', href: '/hatsuho', icon: Sprout },
    { id: 'juyohinMeisai', title: '授与品明細', href: '/juyohinzisseki', icon: Package },
    { id: 'juinZisseki', title: '授印実績', href: '/juin', icon: PenTool },
    { id: 'saisenZisseki', title: '賽銭実績', href: '/saisen', icon: Coins },
    { id: 'azukarikinNyuryoku', title: '預り金入力', href: '/', icon: Coins },
    { id: 'azukarikinKakunin', title: '預り金確認', href: '/', icon: Coins },
    { id: 'mikujiZisseki', title: '御籤実績', href: '/mikuji', icon: Scroll },
    { id: 'haikanZisseki', title: '拝観実績', href: '/houmotsuden', icon: Landmark },
    { id: 'syuekizigyoZisseki', title: '収益事業実績', href: '/sanpai', icon: Coffee },
    { id: 'basyokakutei', title: '場所確定', href: '/rangai', icon: FileSpreadsheet },
    { id: 'nitizikakutei', title: '日次確定', href: '/azukarikin', icon: Wallet },
    { id: 'dataSearch', title: '汎用データ検索', href: '/', icon: Settings },
    { id: 'juyohinMaster', title: '授与品マスタ', href: '/', icon: Settings },
    { id: 'userMaster', title: 'ユーザーマスタ', href: '/master', icon: Settings },
];