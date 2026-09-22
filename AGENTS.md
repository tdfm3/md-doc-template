# AGENTS.md - ドキュメント公開テンプレート

このファイルは、本リポジトリで作業する AI エージェント共通の指示書です。
Claude Code 固有の設定は `CLAUDE.md` に分離しています。

## 指示ファイルの構成と読まれ方

| ファイル | 内容 | 適用範囲 |
|------|------|------|
| `AGENTS.md`（本ファイル） | 規約・構成・ワークフローの正本 | リポジトリ全体 |
| `CLAUDE.md` | `@AGENTS.md` の参照＋Claude Code 固有 | リポジトリ全体 |
| `.github/instructions/docs-authoring.instructions.md` | ドキュメント執筆の規約 | `docs/**/*.md` |
| `.github/instructions/vuepress-config.instructions.md` | VuePress 設定の規約 | `docs/.vuepress/**` |
| `.github/copilot-instructions.md` | レビュー方針 | リポジトリ全体 |

エージェントごとに読まれるファイルが異なります。

| エージェント | `AGENTS.md` | `.instructions.md` | `copilot-instructions.md` |
|------|------|------|------|
| Claude Code | 読む | 読まない | 読まない |
| Copilot / VS Code Chat | 読む | 読む | 読む |
| Copilot / Visual Studio Chat | **読まない** | 読む | 読む |
| Copilot / JetBrains・Xcode Chat | **読まない** | 読む | 読む |
| Copilot / IDE のコードレビュー | **読まない** | **読まない** | 読む |
| Copilot / coding agent・CLI | 読む | 読む | 読む |

このため、規約は次のように配置しています。

- **詳細（構成・ビルド・トラブルシューティング）**: `AGENTS.md` のみ
- **編集時に必ず守る規約**: `.github/instructions/` 配下に、対象パスごとに配置
- **レビュー方針**: `.github/copilot-instructions.md`（IDE のコードレビューはこれしか読まないため）

**規約を変更するときは、`AGENTS.md` と `.github/instructions/` の両方を更新してください。**

### 執筆を依頼するエージェント・コマンド

同じ執筆指示を、エージェントごとの形式で用意しています。内容は同一です。

| ツール | ファイル | 呼び出し方 |
|------|------|------|
| Copilot（VS Code Chat / CLI / GitHub.com） | `.github/agents/write-document.agent.md` | チャットのエージェント選択、`/agent`、`copilot --agent write-document` |
| Claude Code | `.claude/commands/write-document.md` | `/write-document <トピック>` |

`.claude/` は原則 `.gitignore` の対象ですが、`.claude/commands/` だけは追跡対象にしています。
執筆指示を変更するときは、**両方のファイルを更新してください。**

## プロジェクト概要

### 目的

Markdown で書いたドキュメントを VuePress v2 でサイト化し、GitHub Pages に公開するための**テンプレートリポジトリ**。
このリポジトリをコピーすれば、同じ公開の仕組みをそのまま流用できる。

### 成果物の性質

主な成果物は**日本語のドキュメント**であり、アプリケーションコードではない。
`docs/` 配下の Markdown が本体で、`docs/.vuepress/` 配下がそれを公開する仕組みにあたる。

### 同梱しているサンプル

- `docs/guide/` — Markdown ファイルの書き方（4章）。テンプレート利用者が最初に読む
- `docs/spec/` — 設計文書のひな形（ADR / PRD / ユーザーストーリー）とアーキテクチャ設計書

## 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| **VuePress** | v2.0.0-rc.24 | 静的サイトジェネレーター |
| **Vue.js** | 3.x（VuePress に内包） | UIフレームワーク |
| **Node.js** | v20+ | 実行環境 |
| **Vite** | v7+ | バンドラー |
| **Sass** | v1.93+ | CSSプリプロセッサ |
| **JavaScript** | ES Modules | 設定ファイルの記述 |

### プラグイン・ツール

#### VuePressプラグイン

- `@vuepress/plugin-search` - サイト内検索
- `@vuepress/plugin-markdown-ext` - GFM拡張・タスクリスト
- `@vuepress/plugin-markdown-chart` - Mermaid・PlantUML
- `@vuepress/plugin-markdown-tab` - タブ切り替え
- `@vuepress/plugin-markdown-image` - 画像の遅延読み込み・`#bordered`
- `@vuepress/plugin-icon` - Iconify のアイコン記法
- `@snippetors/vuepress-plugin-code-copy` - コードコピーボタン
- `markdown-it-emoji` - 絵文字記法

#### 開発ツール

- `textlint` v15 - 日本語文章校正（`textlint-rule-preset-ja-technical-writing` / `-ja-engineering-paper`）
- `lefthook` v2 - コミット前フック（`npm install` 時に自動登録）

## ディレクトリ構造

```
md-doc-template/
├── .github/
│   ├── workflows/docs.yml          # ビルドと GitHub Pages への公開
│   ├── ISSUE_TEMPLATE/             # Issue のひな形（4種 + config.yml）
│   ├── PULL_REQUEST_TEMPLATE.md    # ドキュメント向けレビューチェックリスト
│   ├── copilot-instructions.md     # Copilot レビュー方針
│   ├── instructions/               # パス別の規約（執筆 / VuePress 設定）
│   └── agents/write-document.agent.md  # 執筆担当エージェント（Copilot）
├── .claude/
│   └── commands/write-document.md  # 執筆コマンド（Claude Code の /write-document）
├── docs/
│   ├── .vuepress/
│   │   ├── config.js               # サイト設定（base / title / plugins）
│   │   ├── navbar.js               # 画面上部メニュー
│   │   ├── sidebar.js              # サイドバー（※手動登録が必要）
│   │   ├── client.js               # コンポーネント登録・日時整形
│   │   ├── components/
│   │   │   ├── header-table.vue    # ページ冒頭の情報テーブル
│   │   │   └── credit-footer.vue   # ページ末尾のフッター
│   │   ├── styles/index.scss       # スタイル上書き
│   │   └── public/                 # サイト共通の静的ファイル
│   │       ├── favicon.svg
│   │       └── hero.svg
│   ├── README.md                   # ホームページ（home: true）
│   ├── guide/                      # サンプル: Markdown の書き方
│   │   ├── README.md
│   │   ├── 01-basic-syntax/        # 基本記法（+ images/sample.svg）
│   │   ├── 02-vuepress-syntax/     # VuePress 拡張記法
│   │   ├── 03-frontmatter/         # フロントマターとコンポーネント
│   │   └── 04-workflow/            # 執筆から公開までの流れ
│   └── spec/                       # 設計文書
│       ├── README.md
│       ├── architecture.md         # 本テンプレートの設計書
│       ├── adr.md / prd.md / user-stories.md   # ひな形
├── .textlintrc                     # 校正ルール
├── prh.yml                         # 表記ゆれ辞書（初期は空）
├── lefthook.yml                    # pre-commit で textlint
├── .npmrc                          # legacy-peer-deps=true
├── package.json
├── AGENTS.md                       # 本ファイル（エージェント共通の指示）
├── CLAUDE.md                       # Claude Code 固有の指示
└── README.md                       # テンプレート利用者向けの手順
```

## 開発ルール

### コーディング規約

#### JavaScript（設定ファイル）

- **形式**: ES Modules (`import`/`export`)
- **インデント**: 2スペース
- **セミコロン**: 既存ファイルの流儀に合わせる

#### Vue.js

- **スタイル**: Composition API (`<script setup>`)
- **命名規則**: ファイル名は kebab-case、登録名は PascalCase と kebab-case の両方

#### Markdown

- **フロントマター**: YAML形式
- **見出し**: `#` は1ページに1つ。階層を飛ばさない
- **コードブロック**: 言語指定必須
- **サイト内リンク**: `/guide/.../README.md` のように `/` で始まり `.md` で終わるパス。
  ディレクトリ終わり（`/guide/.../`）、HTML の `<a>` タグ、絶対URLは base が付かずリンク切れになる。
  画像は絶対パス（`/hero.svg`）でも base が付くため、この制約はリンクにのみ当てはまる
- **絵文字は使わない**: 後述の「絵文字を使わない理由」を参照

### フロントマター必須項目

```yaml
---
title: ページタイトル          # サイドバー表示名。本文の # とは別物
description: ページ説明        # header-table が参照
time: 10分                    # header-table が参照
prior_knowledge: なし          # header-table が参照
footer: © 2026 Your Organization. All Rights Reserved.   # credit-footer が参照
---
```

### 絵文字を使わない理由

Markdown ファイルおよびリポジトリ内の文書では、**絵文字を使いません**。

| 観点 | 内容 |
|------|------|
| 理由 | UTF-8 の日本語ファイルを旧来のエディタ（Shift-JIS 前提）で開くと絵文字が文字化けする |
| 影響 | Windows 環境のエンジニアから読みにくいという指摘がある |
| 範囲 | `README.md`、`docs/` 配下の Markdown、`.github/` 配下のテンプレート、設定ファイルのコメント |

代わりに次の手段を使ってください。

| やりたいこと | 絵文字の代わりに使うもの |
|------|------|
| 強調する | `**太字**` |
| 注意を促す | `::: warning` / `::: danger` のカスタムコンテナ |
| 補足する | `::: tip` / `::: info` のカスタムコンテナ |
| 区分を示す | 見出し、表、`※` などの記号（JIS X 0208 の範囲） |
| 完了・未完了を示す | `- [x]` / `- [ ]` のチェックリスト |

罫線（`├` `└` `│`）、矢印（`→`）、`※` は JIS X 0208 に含まれるため文字化けしません。
注記の目印にはこれらを使ってください。

### コミットメッセージ・プルリクエスト

- 絵文字を使わない
- AI ツールの共同作成者表記（`Co-Authored-By: Claude ...` など）や、生成ツールの署名を入れない
- 変更の理由と影響が読み取れる本文を書く

### ページ構造の規約

```markdown
---
（フロントマター）
---

<header-table/>

# ページタイトル

本文

<credit-footer/>
```

### サイドバー登録（重要）

VuePress v2 のデフォルトテーマには**ディレクトリからサイドバーを自動生成する機能がない**。
ページを追加したら必ず `docs/.vuepress/sidebar.js` に1行追加すること。

```js
export const sidebar = {
  '/guide/': [
    {
      text: 'ドキュメントの書き方',
      children: [
        '/guide/',
        '/guide/01-basic-syntax/',   // ← ここに追加
      ],
    },
  ],
};
```

新しいセクション（`/guide/` と並ぶ階層）を追加した場合は `navbar.js` にも追加する。

### base（公開先サブパス）の仕組み

GitHub Pages のプロジェクトサイトは `https://<org>.github.io/<repo>/` で配信されるため、
`base` を指定しないとアセットがすべて404になる。

- `config.js`: `const base = process.env.VUEPRESS_BASE ?? '/'`
- `docs.yml`: `VUEPRESS_BASE: /${{ github.event.repository.name }}/`

リポジトリ名から自動設定されるため、通常は書き換え不要。
独自ドメインや `<org>.github.io` 直下で公開する場合は `docs.yml` の該当行を削除する。

なお `config.js` の `head` に書く URL は VuePress が `base` を補完しないため、
`` href: `${base}favicon.svg` `` のように自前で連結すること。

## 開発ワークフロー

### 初期セットアップ

```bash
npm install     # 依存導入 + lefthook の Git フック登録（prepare スクリプト）
```

### 開発サーバー起動

```bash
npm run dev     # http://localhost:8080/
```

### 文章校正

```bash
npm run textlint        # チェック
npm run textlint:fix    # 自動修正（実行後は git diff で確認すること）
```

### 本番ビルド

```bash
# base なし
npm run build
```

```powershell
# base ありの確認（PowerShell）
$env:VUEPRESS_BASE = '/md-doc-template/'; npm run build
```

> **注意**: Git Bash で `VUEPRESS_BASE=/md-doc-template/ npm run build` と書くと、
> MSYS のパス変換により値が Windows のパスへ書き換えられ、検証にならない。
> Windows で確認する場合は PowerShell を使うこと。

#### リンク切れの確認

**`npm run build` はサイト内リンクの `base` 漏れを検出しない。**
サブディレクトリで公開する場合は、base を付けてビルドしたうえで次を実行する。

```bash
cd docs/.vuepress/dist
grep -rhoE 'href="/[a-zA-Z0-9][^"]*"' . | grep -v '^href="/md-doc-template' | sort -u
```

1件でも出力されたら、そのリンクは公開先で 404 になる。
原因はほぼ `](/guide/xxx/)` のようなディレクトリ終わりの内部リンクなので、
`](/guide/xxx/README.md)` に直すこと。

### デプロイフロー

1. ローカルで `npm run dev` と `npm run textlint` を確認
2. `main` ブランチに push
3. GitHub Actions（`docs` ワークフロー）が自動ビルド・デプロイ
4. GitHub Pages で公開

## トラブルシューティング

### サイドバーに出てこない

- **原因**: `sidebar.js` に登録していない
- **解決**: 該当パスを `children` に追加する

### 公開したサイトの CSS・画像が 404

- **原因**: `base` が公開先のサブパスと一致していない
- **解決**: `docs.yml` の `VUEPRESS_BASE` を確認する。独自ドメインなら該当行を削除

### デプロイが失敗する

- **原因**: リポジトリの Pages 設定が「Deploy from a branch」のまま
- **解決**: Settings → Pages → Source を **GitHub Actions** に変更する

### ビルドエラー

1. `<header-table/>` の閉じスラッシュ漏れを確認
2. キャッシュクリア: `docs/.vuepress/.cache` と `.temp` を削除
3. 依存関係再インストール: `node_modules` を削除して `npm install`
4. Node.jsバージョン確認: `node -v` (v20+必須)

### npm install で依存関係エラー（ERESOLVE）

- **原因**: 一部プラグインの peer 依存が VuePress のバージョンと衝突する
- **解決**: `.npmrc` に `legacy-peer-deps=true` を設定済み。オプション指定は不要

### textlint の誤検知

1. 一部だけ除外: `<!-- textlint-disable -->` 〜 `<!-- textlint-enable -->`
2. 単語単位で許可: `.textlintrc` の `allow` に追加
3. 表記を統一: `prh.yml` にルールを追加

## AI エージェント向けの注意

- ドキュメントを追加・変更したら、**必ず `npm run textlint` と `npm run build` を実行して確認する**
- サイドバーへの登録漏れが最も多い見落としなので、ページ追加時は `sidebar.js` を必ず確認する
- 記法の詳細は `docs/guide/` 配下のガイドが唯一の情報源。迷ったらそこを読む
- 文章・コメント・コミットメッセージのいずれにも絵文字を使わない

## 仕様書駆動開発の実践

### 原則

1. **CLAUDE.md を起点とする**: 開発前に必ず本ファイルを参照する
2. **仕様変更時は即更新**: 本ファイルを「唯一の真実」とする
3. **設計書と整合させる**: `docs/spec/architecture.md` と記述を食い違わせない

### 更新タイミング

- ディレクトリ構造の変更時
- 技術スタック変更時
- 開発ルール追加・変更時
- トラブルシューティング項目追加時

## 参考リンク

- [VuePress v2 公式ドキュメント](https://v2.vuepress.vuejs.org/)
- [VuePress プラグイン一覧](https://ecosystem.vuejs.press/)
- [textlint 公式サイト](https://textlint.github.io/)
- [GitHub Pages ドキュメント](https://docs.github.com/pages)

---

**このドキュメントはプロジェクトの「唯一の真実」です。必ず最新に保ってください。**
**Claude Code 固有の設定は `CLAUDE.md` を参照してください。**
