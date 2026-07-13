import Link from 'next/link';

// サンプルデータ（後々ローカルストレージやDBから取得するように切り替える）
const ANNOUNCEMENTS = [
  { id: 1, date: '2026/07/03', title: '一般公開講演会『豊臣政権と後北条氏』7/12開催のお知らせ', category: 'ご案内', isImportant: false, url: 'https://www.hachimangu.or.jp/activity/news/1440' },
  { id: 2, date: '2026/03/04', title: '令和９年度 奉職職員募集', category: 'ご案内', isImportant: false, url: 'https://www.hachimangu.or.jp/activity/news/1375' },
  { id: 3, date: '2026/01/11', title: '巴会（茶会）の前売り券販売について', category: '催し', isImportant: false, url: 'https://www.hachimangu.or.jp/activity/news/1353' },
];

const INTERNAL_APPS = [
  {
    id: 1,
    name: '祈祷受付',
    description: '',
    color: {
      border: "border-emerald-200",
      headerBg: "bg-emerald-50",
      headerText: "text-emerald-700",
    },
    groups: [
      {
        title: "新規入力",
        links: [
          { name: "法人", url: "#" },
          { name: "個人", url: "#" },
          { name: "安産", url: "#" },
          { name: "初宮・七五三", url: "#" },
        ]
      },
      {
        title: "検索",
        links: [
          { name: "検索(受付前)", url: "#" },
          { name: "記念品", url: "#" },
          { name: "予約表", url: "#" },
          { name: "検索(受付後)", url: "#" },
          { name: "汎用検索", url: "#" },
          { name: "登録一覧", url: "#" },
        ]
      },
      {
        title: "実績管理",
        links: [
          { name: "日計表", url: "#" },
          { name: "受付票一覧", url: "#" },
          { name: "祈祷料受納実績", url: "#" },
          { name: "新年予約祈祷受付登録", url: "#" },
          { name: "新年予約祈祷実績一覧", url: "#" },
        ]
      },
      {
        title: "予約祈祷",
        links: [
          { name: "新年祈祷申込用紙作成", url: "#" },
          { name: "法人祈祷履歴", url: "#" },
          { name: "新年祈祷受付一覧", url: "#" },
          { name: "新年申込用紙QRスキャン", url: "#" },
          { name: "庚申祭予約一覧", url: "#" },
          { name: "本殿・出向祭祈祷一覧", url: "#" },
        ]
      },
      {
        title: "七五三プラン",
        links: [
          { name: "プラン新規入力", url: "#" },
          { name: "七五三プラン一覧", url: "#" },
        ]
      }
    ]
  },
  {
    id: 2,
    name: '授与品管理',
    description: '',
    color: {
      border: "border-sky-200",
      headerBg: "bg-sky-50",
      headerText: "text-sky-700",
    },
    groups: [
      {
        links: [
          { name: "授与実績（一覧/登録）", url: "" },
          { name: "返品実績（一覧/登録）", url: "" },
          { name: "入出庫実績（一覧/登録）", url: "" },
          { name: "残取実績（登録）", url: "" },
          { name: "残取実績（一覧）", url: "" },
          { name: "ＣＳＶ出力", url: "" },
        ]
      },
    ]
  },
  {
    id: 3,
    name: '発注管理',
    description: '',
    color: {
      border: "border-blue-300",
      headerBg: "bg-blue-50",
      headerText: "text-blue-800",
    },
    groups: [
      {
        links: [
          { name: "発注登録", url: "" },
          { name: "未納一覧（納品登録）", url: "" },
          { name: "発注履歴", url: "" },
          { name: "在庫状況（発注一括登録）", url: "" },
          { name: "納品一括登録", url: "" },
        ]
      },
    ]
  },
  {
    id: 4,
    name: '勤怠／礼典介助',
    description: '',
    color: {
      border: "border-amber-200",
      headerBg: "bg-amber-50",
      headerText: "text-amber-700",
    },
    groups: [
      {
        links: [
          { name: "勤務予定一覧", url: "" },
          { name: "勤務実績一覧", url: "" },
          { name: "礼典介助一覧", url: "" },
          { name: "申請書類一覧", url: "" },
          { name: "回覧書類一覧", url: "" },
          { name: "礼典介助検索", url: "" },
        ]
      },
    ]
  },
  {
    id: 5,
    name: '氏子崇敬者',
    description: '',
    color: {
      border: "border-red-200",
      headerBg: "bg-red-50",
      headerText: "text-red-700",
    },
    groups: [
      {
        links: [
          { name: "崇敬者台帳", url: "" },
          { name: "崇敬者登録", url: "" },
          { name: "崇敬者台帳(新環境テスト)", url: "" },
        ]
      },
    ]
  },
  {
    id: 6,
    name: 'マスタメンテナンス',
    description: '',
    color: {
      border: "border-slate-200",
      headerBg: "bg-slate-50",
      headerText: "text-slate-700",
    },
    groups: [
      {
        title: "全体",
        links: [
          { name: "ユーザマスタ", url: "" },
          { name: "暦マスタ", url: "" },
          { name: "予約不可日程マスタ", url: "" },
          { name: "予約枠設定（一括）", url: "" },
          { name: "予約枠設定（日単位）", url: "" },
        ]
      },
      {
        title: "祈祷受付",
        links: [
          { name: "プリンタマスタ", url: "" },
          { name: "レポートプリンタ", url: "" },
        ]
      },
      {
        title: "メール",
        links: [
          { name: "テンプレート管理", url: "" },
        ]
      },
      {
        title: "授与品管理",
        links: [
          { name: "授与品マスタ", url: "" },
          { name: "保管場所マスタ", url: "" },
          { name: "メーカーマスタ", url: "" },
        ]
      }
    ]
  },
];

export default function PortalPage() {
  const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'];
  const today = new Date();
  const formattedDate = [
    today.getFullYear(), '年',
    (today.getMonth() + 1), '月',
    today.getDate(), '日',
    ' (', dayOfWeekStr[today.getDay()], ')'
  ].join('');

  return (
    <div className="min-h-screen bg-gray-50 grid grid-cols-1 md:grid-cols-10">

      {/* 【 比率 2 】 1. サイドナビゲーション */}
      <aside className="bg-slate-800 text-white p-6 md:col-span-2 flex flex-col justify-between min-h-screen md:min-h-0">
        <div>
          <div className="text-xl font-bold tracking-wider mb-8 text-cyan-400">鶴岡八幡宮 社務システム</div>
          <nav className="space-y-2">
            <a href="#" className="block py-2 px-4 rounded bg-slate-700 text-white font-medium">ホーム</a>
            <a href="#" className="block py-2 px-4 rounded text-slate-300 hover:bg-slate-700 hover:text-white transition">パスワード変更</a>
          </nav>
        </div>
        <div className="text-lg text-slate-400 border-t border-slate-700 pt-4 mt-8 md:mt-0">
          ログイン: 管理者
        </div>
      </aside>

      {/* 【 残りの比率 8 】 2. メインコンテンツエリア */}
      <main className="p-6 md:p-10 overflow-y-auto md:col-span-8">

        {/* ヘッダーセクション（メインエリアの上部いっぱいに配置） */}
        <header className="mb-8 flex justify-between items-center bg-white p-6 rounded-xl shadow-xs">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">おはようございます、管理者さん</h1>
          </div>
          <div className="text-right text-lg text-slate-500">
            <div>2026年7月13日 (月)</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">

          {/* 【 比率 5 】 クイックリンク（業務アプリ一覧） */}
          <section className="bg-white p-6 rounded-xl shadow-xs md:col-span-5">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>社務一覧</span>
            </h2>

            <div className="space-y-6">
              {INTERNAL_APPS.map((app, index) => (
                <div
                  key={app.id || index}
                  className={`flex flex-col rounded-lg border bg-white text-left overflow-hidden ${app.color?.border || 'border-gray-200'}`}
                >
                  <div className={`px-4 py-2 font-bold text-lg ${app.color?.headerBg || 'bg-gray-50'} ${app.color?.headerText || 'text-gray-700'}`}>
                    {app.name}
                  </div>

                  <div className="p-4 flex-1 space-y-4 bg-white">
                    {app.groups?.map((group, groupIndex) => {
                      const hasTitle = 'title' in group && group.title;

                      if (!hasTitle) {
                        return (
                          <ul key={groupIndex} className="p-1 space-y-2 text-lg">
                            {group.links?.map((link, linkIndex) => (
                              <li key={linkIndex} className="flex items-center gap-1">
                                <span className="text-gray-400">・</span>
                                <Link
                                  href={link.url}
                                  className="text-blue-600 hover:text-blue-800 hover:underline transition"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <div
                          key={groupIndex}
                          className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-2xs"
                        >
                          <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 text-base font-bold text-gray-700">
                            {('title' in group) ? group.title : ''}
                          </div>

                          <ul className="p-3 space-y-2 text-lg">
                            {group.links?.map((link, linkIndex) => (
                              <li key={linkIndex} className="flex items-center gap-1">
                                <span className="text-gray-400">・</span>
                                <Link
                                  href={link.url}
                                  className="text-blue-600 hover:text-blue-800 hover:underline transition"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 【 比率 3 】 お知らせ一覧 */}
          <section className="bg-white p-6 rounded-xl shadow-xs md:col-span-3">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>お知らせ</span>
            </h2>
            <div className="divide-y divide-gray-100">
              {ANNOUNCEMENTS.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col justify-between gap-2">

                  {/* 上段：カテゴリー と タイトル */}
                  <div className="flex items-start gap-3">
                    <span className={`text-lg px-2 py-1 rounded-sm font-medium shrink-0 mt-0.5 ${item.isImportant ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {item.category}
                    </span>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-slate-700 hover:text-cyan-600 hover:underline cursor-pointer text-base md:text-lg ${item.isImportant ? 'font-semibold' : ''}`}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className={`text-slate-700 text-base md:text-lg ${item.isImportant ? 'font-semibold' : ''}`}>
                        {item.title}
                      </p>
                    )}
                  </div>

                  <div className="pl-16">
                    <span className="text-sm md:text-base text-slate-400 block">{item.date}</span>
                  </div>

                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}