---
applyTo: "docs/.vuepress/**"
description: VuePress の設定ファイルとコンポーネントを触るときの規約
---

# VuePress 設定の規約

`docs/.vuepress/` 配下を編集するときの注意点です。詳細は `AGENTS.md` を参照してください。

## ファイルの役割

| ファイル | 役割 |
|------|------|
| `config.js` | サイト設定（base / title / markdown / plugins） |
| `navbar.js` | 画面上部のメニュー |
| `sidebar.js` | サイドバー（ページ追加時に手動登録が必要） |
| `client.js` | コンポーネントのグローバル登録、最終更新日時の整形 |
| `components/*.vue` | Markdown 内で使う表示部品 |
| `styles/index.scss` | スタイルの上書き。VuePress が自動で読み込む |
| `public/` | サイト共通の静的ファイル |

## コーディング規約

- ES Modules（`import` / `export`）で書く
- インデントは2スペース
- Vue コンポーネントは Composition API（`<script setup>`）
- ファイル名は kebab-case、コンポーネント登録名は PascalCase と kebab-case の両方
- コメントにも絵文字を使わない

## サイドバーの追加方法

ページを追加したら、対応するパスを `children` に1行追加します。表示名は各ページのフロントマター `title` から自動で取られます。

```js
export const sidebar = {
  '/guide/': [
    {
      text: 'ドキュメントの書き方',
      children: [
        '/guide/',
        '/guide/01-basic-syntax/',   // ここに追加する
      ],
    },
  ],
};
```

新しいセクションを作った場合は `navbar.js` にもリンクを追加します。

## base（公開先サブパス）を壊さない

GitHub Pages のプロジェクトサイトは `https://<組織名>.github.io/<リポジトリ名>/` で配信されます。
`base` を指定しないとアセットがすべて404になるため、次の仕組みで自動設定しています。

- `config.js`: `const base = process.env.VUEPRESS_BASE ?? '/'`
- `.github/workflows/docs.yml`: `VUEPRESS_BASE: /${{ github.event.repository.name }}/`

**`head` に書く URL は VuePress が `base` を補完しません。**
`` href: `${base}favicon.svg` `` のように自前で連結してください。

## コンポーネントを追加する手順

1. `components/` に `.vue` ファイルを作る
2. `client.js` の `enhance()` で `app.component()` に登録する（PascalCase と kebab-case の両方）
3. Markdown 内でタグとして使う（`<my-component/>` のように閉じスラッシュを付ける）

## 確認

設定を変更したら、必ずビルドが通ることを確認します。

```bash
npm run build
```

base を含めた確認は PowerShell で行います。Git Bash では MSYS のパス変換で値が壊れます。

```powershell
$env:VUEPRESS_BASE = '/md-doc-template/'; npm run build
```
