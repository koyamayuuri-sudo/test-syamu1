import { ROLES, RoleCode, LOCATIONS, LocationCode } from './roles';

export interface TestUser {
    id: string;
    password: string;
    role: RoleCode;
    name: string;
    locationId?: LocationCode; // 所属場所（マスタ等の全権限ユーザーは未指定も可）
}

/**
 * ローカル開発・動作確認用の疑似アカウント一覧
 * role: '0' (マスタ / 管理者), '1' (一般)
 * locationId: '10' (祈祷所), '20' (授与所), '30' (財務室)
 */
export const TEST_USERS: TestUser[] = [
    // マスタ（全権限管理者）
    {
        id: '00',
        password: '00',
        role: ROLES.MASTER,
        name: '全体管理者（マスタ）',
    },

    // 一般ユーザー（祈祷所）
    {
        id: '11',
        password: '11',
        role: ROLES.USER,
        locationId: LOCATIONS.PRAYER,
        name: '祈祷所 スタッフ',
    },

    // 一般ユーザー（授与所）
    {
        id: '22',
        password: '22',
        role: ROLES.USER,
        locationId: LOCATIONS.GIFT,
        name: '授与所 スタッフ',
    },

    // 一般ユーザー（財務室）
    {
        id: '33',
        password: '33',
        role: ROLES.USER,
        locationId: LOCATIONS.FINANCE,
        name: '財務室 スタッフ',
    },
];