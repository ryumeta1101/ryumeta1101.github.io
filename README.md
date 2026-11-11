# 個人ホームページ（GitHub Pages 用）

ビルド不要の静的サイト。日本語版をルートに、英語版を `en/` に置く。

## ディレクトリ構成

```
homepage/
├── index.html            日本語版 → https://<ユーザー名>.github.io/
├── en/
│   └── index.html        英語版   → https://<ユーザー名>.github.io/en/
├── assets/               両方のページが使う素材
│   ├── css/
│   │   └── style.css     デザイン（ダークモード・スマホ表示に対応）
│   ├── js/
│   │   └── main.js       業績の BibTeX の開閉とコピー
│   ├── images/
│   │   └── favicon.svg   タブのアイコン（顔写真もここに置く: profile.jpg）
│   └── files/            配布するファイル（CV や論文の PDF など）
├── notes/                公開しない作業用メモ（.gitignore で除外）
│   └── PROFILE.md        プロフィールのまとめ
├── .nojekyll             GitHub Pages の Jekyll 処理を止める（静的ファイルをそのまま配信）
├── .gitignore
└── README.md
```

### 置き場所のルール

- **ページ**は言語ごとのディレクトリに `index.html` として置く。URL が `/en/` のように短くなる。
- **素材**（CSS・画像・PDF）はすべて `assets/` の下に置き、日英のページで共有する。
- **公開しないもの**は `notes/` に置く。GitHub Pages はリポジトリの中身をすべて公開するので、
  リポジトリに入れたファイルは誰でも読めると考える。

## ローカルで確認する

```bash
cd ~/homepage
python3 -m http.server 8000
# 日本語版: http://localhost:8000/   英語版: http://localhost:8000/en/
```

HTML を直接ダブルクリックで開いても確認できる。ただし BibTeX の「コピー」ボタンは、
ブラウザの制限で動かないことがあるので、上のようにサーバー経由で開くほうが確実。

ページ間のリンクは `en/index.html`・`../index.html` のようにファイル名まで書く。
`en/` のようにフォルダ名で止めると、直接開いたときに `index.html` が開かれずフォルダ一覧になる。

## 内容を編集するとき

- **日本語版と英語版は別のファイル**なので、業績やニュースを足すときは両方を直す。
- 業績の追加: 各ページの `<ol class="pubs">` に `<li>` を 1 つ足す。
  BibTeX を付けるときは、既存の `<div class="pub-links">` と `<div class="bib-box">` の組をコピーし、
  `aria-controls="bib-xxx"` と `id="bib-xxx"` を論文ごとに別の名前にする（同じ名前だと別の論文の BibTeX が開く）。
- 素材へのパスは、日本語版では `assets/...`、英語版では `../assets/...` と書く。
- 顔写真: `assets/images/profile.jpg` という名前で置くだけで、日英の両ページに丸く切り抜かれて表示される
  （HTML の編集は不要）。ファイルが無いときは "RU" の文字が表示される。正方形に近い画像が向いている。
- PDF を配布する場合: `assets/files/` に置き、`<a href="assets/files/cv.pdf">CV</a>` のようにリンクする。

## GitHub Pages で公開する

1. GitHub で `<ユーザー名>.github.io` という名前の public リポジトリを作る。
2. 次のコマンドで push する（`notes/` は `.gitignore` で除外される）。
   ```bash
   cd ~/homepage
   git init && git add .
   git commit -m "Initial homepage"
   git branch -M main
   git remote add origin git@github.com:<ユーザー名>/<ユーザー名>.github.io.git
   git push -u origin main
   ```
3. 数分後に `https://<ユーザー名>.github.io/` で公開される。
