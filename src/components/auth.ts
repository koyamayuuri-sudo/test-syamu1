import { TEST_USERS, TestUser } from '../constants/testUsers';

export interface AuthResult {
    success: boolean;
    user?: Omit<TestUser, 'password'>;
    message?: string;
}

/**
 * 疑似アカウントを使用したログイン処理
 */
export function mockLogin(id: string, password: string): AuthResult {
    // 本番環境（production）の場合は実行をガード
    if (process.env.NODE_ENV === 'production') {
        return {
            success: false,
            message: '本番環境ではテストログイン機能は利用できません。',
        };
    }

    // ID と パスワード でテストデータを照合
    const user = TEST_USERS.find(
        (u) => u.id === id && u.password === password
    );

    if (!user) {
        return {
            success: false,
            message: 'IDまたはパスワードが正しくありません。',
        };
    }

    // パスワードを除外したユーザー情報を返却
    const { password: _, ...authenticatedUser } = user;

    return {
        success: true,
        user: authenticatedUser,
    };
}