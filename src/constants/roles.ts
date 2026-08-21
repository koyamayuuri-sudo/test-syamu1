export const ROLES = {
  MASTER: '0', // マスタ（管理者）
  USER: '1',   // 一般
} as const;

export type RoleCode = typeof ROLES[keyof typeof ROLES];

/**
 * 部署・場所の定義
 */
export const LOCATIONS = {
  PRAYER: '10',  // 祈祷所
  GIFT: '20',    // 授与所
  FINANCE: '30', // 財務室
} as const;

export type LocationCode = typeof LOCATIONS[keyof typeof LOCATIONS];