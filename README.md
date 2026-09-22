# ドキュメント公開テンプレート

Markdown で書いたドキュメントを、**VuePress でサイト化して GitHub Pages に公開する**ためのテンプレートリポジトリです。

このリポジトリをコピーすれば、同じ公開の仕組みをそのまま使えます。
中身のサンプルは「Markdown ファイルの書き方」になっているので、自分のドキュメントに入れ替えてください。

```text
Markdown を書く → main に push → 自動でビルド → GitHub Pages に公開
```

---

## コピーしたらやること

### 1. リポジトリを作る

GitHub 上でこのリポジトリの **Use this template** を押すか、クローンして新しいリポジトリに push します。

### 2. GitHub Pages を有効にする

リポジトリの **Settings → Pages → Build and deployment → Source** を
**GitHub Actions** に変更します。

> **注意**: 初期値の「Deploy from a branch」のままだと、デプロイが失敗します。**この設定が最初の関門です。**

### 3. サイトの名前を書き換える

`docs/.vuepress/config.js` の次の2行を書き換えます。

```js
title: 'ドキュメントテンプレート',
description: 'Markdown で書いて GitHub Pages に公開するドキュメントサイトのテンプレート',
```

ナビゲーションバーに GitHub へのリンクを出したい場合は、同じファイルの `repo` のコメントを外します。

### 4. 画像とサンプルを入れ替える

| 対象 | 内容 |
|------|------|
| `docs/.vuepress/public/favicon.svg` | ブラウザのタブに出るアイコン |
| `docs/.vuepress/public/hero.svg` | トップページの大きな画像 |
| `docs/guide/` | サンプルドキュメント。自分の内容に入れ替える |
| `docs/spec/` | 設計文書のひな形。不要なら削除する |

`docs/guide/` や `docs/spec/` を削除したら、`docs/.vuepress/sidebar.js` と
`docs/.vuepress/navbar.js` から該当部分も消してください。

### 5. push する

`main` ブランチに push すると、GitHub Actions が自動でビルドして公開します。
公開先は `https://<組織名>.github.io/<リポジトリ名>/` です。

> **補足**: 公開先のサブパス（`base`）はワークフローがリポジトリ名から自動で設定します。書き換えは不要です。
> 独自ドメインや `https://<組織名>.github.io/` の直下で公開する場合は、
> `.github/workflows/docs.yml` の `VUEPRESS_BASE` の行を削除してください。

---

## ローカルで動かす

### 必要なもの

- Node.js v24 以上

### セットアップ

```bash
# 依存関係をインストール（コミット前フックも同時に登録されます）
npm install

# 開発サーバーを起動
npm run dev
```

起動したら http://localhost:8080/ を開きます。ファイルを保存すると自動で表示が更新されます。

---

## ドキュメントの書き方

書き方の詳細は、**サイト内のガイドが本体**です。`npm run dev` で起動して読んでください。

| ページ | 内容 |
|------|------|
| `docs/guide/01-basic-syntax/` | Markdown の基本記法 |
| `docs/guide/02-vuepress-syntax/` | 注意書きボックス、タブ、Mermaid、PlantUML など |
| `docs/guide/03-frontmatter/` | ページ先頭の設定と専用の表示部品 |
| `docs/guide/04-workflow/` | ページ追加から公開までの手順 |

### 最小限の決まりごと

1. `docs/` の下にディレクトリを作り、`README.md` を置く（置いた場所が URL になる）
2. ファイル先頭にフロントマターを書く
3. `docs/.vuepress/sidebar.js` にパスを1行追加する（**自動生成されません**）
4. **絵文字は使わない**（後述）

```markdown
---
title: ページのタイトル
description: このページで何がわかるかを1文で書きます。
time: 10分
prior_knowledge: なし
footer: © 2026 Your Organization. All Rights Reserved.
---

<header-table/>

# ページのタイトル

本文をここから書きます。

<credit-footer/>
```

### 絵文字は使わない

Markdown ファイルでは**絵文字を使いません**。
UTF-8 の日本語ファイルを旧来のエディタ（Shift-JIS 前提）で開くと文字化けし、
Windows 環境のエンジニアから読みにくいという指摘があるためです。

| やりたいこと | 絵文字の代わりに使うもの |
|------|------|
| 強調する | `**太字**` |
| 注意を促す | `::: warning` / `::: danger` |
| 補足する | `::: tip` / `::: info` |
| 区分を示す | 見出し、表、`※` |
| 完了・未完了を示す | `- [x]` / `- [ ]` |

罫線（`├` `└` `│`）、矢印（`→`）、`※` は JIS X 0208 に含まれるため使えます。

### 画像の置き場所

| | そのページ専用 | サイト全体で使う |
|------|------|------|
| 置き場所 | ページと同じディレクトリの `images/` | `docs/.vuepress/public/` |
| 書き方 | `![説明](./images/sample.png)` | `![説明](/logo.png)` |

---

## 文章校正（textlint）

```bash
# チェックする
npm run textlint

# 自動で直せるものを直す
npm run textlint:fix
```

`git commit` すると、変更した Markdown に対して textlint が自動で実行されます。
エラーが残っているとコミットは中断されます。

- 除外したい単語は `.textlintrc` の `allow` に追加します
- 表記を統一したい単語は `prh.yml` に登録します
- 一部だけチェックを外すときは `<!-- textlint-disable -->` と `<!-- textlint-enable -->` で囲みます

> **注意**: `npm run textlint:fix` は日本語を機械的に置換します。実行後は `git diff` で結果を確認してください。

---

## デプロイ

`main` ブランチへの push をきっかけに、`.github/workflows/docs.yml` がビルドと公開を行います。

**作業者がやること**: なし（自動で公開されます）

実行結果はリポジトリの **Actions** タブで確認できます。

---

## 技術スタック

| 技術 | バージョン | 用途 |
|------|------|------|
| VuePress | v2.0.0-rc.24 | 静的サイトジェネレーター |
| Node.js | v24+ | 実行環境 |
| Vite | v7+ | バンドラー |
| Sass | v1.93+ | CSS プリプロセッサ |
| Mermaid | v11+ | 図表の描画 |
| textlint | v15+ | 日本語の校正 |
| lefthook | v2+ | コミット前フック |

仕組みの詳細は、サイト内の `docs/spec/architecture.md`（アーキテクチャ設計書）に書いています。

---

## コマンド一覧

| コマンド | 内容 |
|------|------|
| `npm run dev` | 開発サーバーを起動する |
| `npm run build` | 本番用にビルドする（出力先: `docs/.vuepress/dist/`） |
| `npm run textlint` | 文章をチェックする |
| `npm run textlint:fix` | 文章を自動修正する |

---

## 困ったときは

| 症状 | 原因として多いもの |
|------|------|
| サイドバーに出てこない | `docs/.vuepress/sidebar.js` に追加していない |
| 画像が表示されない | パスの書き方（`./` と `/` の取り違え） |
| 公開したのに表示が崩れる | Pages の Source が「GitHub Actions」になっていない |
| ビルドが失敗する | `<header-table/>` の閉じスラッシュ漏れ、リンク切れ |

- [VuePress v2 公式ドキュメント](https://v2.vuepress.vuejs.org/)
- [textlint 公式サイト](https://textlint.github.io/)
