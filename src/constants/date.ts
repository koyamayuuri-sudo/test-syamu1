// 今日の日付を "YYYY/MM/DD" 形式で取得する関数
export const getTodayFormatted = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  // 月・日は2桁（0埋め）にフォーマット
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

// 今日の日付を初期値に指定
export const DEFAULT_DATE = getTodayFormatted();