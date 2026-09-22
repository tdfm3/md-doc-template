---
title: 3. フロントマターとコンポーネント
description: ページ先頭の設定と、このテンプレート専用の表示部品の使い方を説明します。
time: 10分
prior_knowledge: Markdown の基本記法
footer: © 2026 Your Organization. All Rights Reserved.
---

<header-table/>

# フロントマターとコンポーネント

このページの一番上に表示されている表（概要・想定読了時間・前提知識）は、
本文には書かれていません。**ページ先頭の設定から自動で作られています。**

その設定を「フロントマター」と呼びます。この章では、その書き方を説明します。

[[toc]]

## フロントマターとは

ファイルの先頭を `---` で挟んだ範囲が、フロントマターです。
ページのタイトルや説明といった「ページそのものの情報」を書きます。ここは本文として表示されません。

**書き方:**

```markdown
---
title: 3. フロントマターとコンポーネント
description: ページ先頭の設定と、このテンプレート専用の表示部品の使い方を説明します。
time: 10分
prior_knowledge: Markdown の基本記法
footer: © 2026 Your Organization. All Rights Reserved.
---

<header-table/>

# フロントマターとコンポーネント

本文をここから書きます。
```

::: danger 必ずファイルの1行目から書いてください
`---` の前に空行やコメントがあると、フロントマターとして認識されません。
本文中に区切り線を引きたい場合の `---` とは別ものです。
:::

## 必須の5項目

このテンプレートでは、次の5項目をすべてのページに書きます。

| 項目 | 内容 | どこに表示されるか |
|------|------|------|
| `title` | ページのタイトル | サイドバー、ブラウザのタブ、検索結果 |
| `description` | そのページで何がわかるかの1文 | ページ冒頭の表、検索結果 |
| `time` | 読み終わるまでの目安時間 | ページ冒頭の表 |
| `prior_knowledge` | 読む前に知っておきたいこと | ページ冒頭の表 |
| `footer` | 著作権表示 | ページ最下部 |

::: tip title は本文の `#` とは別です
サイドバーに並ぶ名前は `title` から作られます。
本文の `# 見出し` を変えてもサイドバーは変わらないので、両方を書き換えてください。
:::

### コピーして使うテンプレート

新しいページを作るときは、次の内容をそのまま貼り付けて書き換えてください。

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

## 専用の表示部品

このテンプレートには、Markdown の中に書ける部品が2つ用意されています。
HTML のタグのように書きますが、中身はフロントマターから自動で埋まります。

### `<header-table/>`

ページ冒頭に置くと、`description` / `time` / `prior_knowledge` を表にして表示します。
**このページの一番上にある表が、それです。**

**書き方:**

```markdown
<header-table/>
```

フロントマターの直後、`#` の見出しよりも前に置いてください。

### `<credit-footer/>`

ページ末尾に置くと、区切り線と `footer` の文字列を表示します。

**書き方:**

```markdown
<credit-footer/>
```

::: warning 閉じスラッシュを忘れないでください
`<header-table>` のように閉じスラッシュがないと、ビルドがエラーになります。
必ず `<header-table/>` と書いてください。
:::

## ページ単位の設定

必須の5項目以外にも、ページごとの表示を変える設定があります。

| 項目 | 書き方 | 効果 |
|------|------|------|
| サイドバーを隠す | `sidebar: false` | そのページだけサイドバーを表示しない |
| ページ右の目次を隠す | `toc: false` | 見出し一覧を表示しない |
| 最終更新日時を隠す | `lastUpdated: false` | 更新日時を表示しない |
| トップページにする | `home: true` | 次節のホームページ用レイアウトになる |

## ホームページの書き方

サイトのトップページ（`docs/README.md`）だけは、専用のレイアウトを使います。
`home: true` を指定すると、大きな画像・ボタン・特徴の一覧が並ぶ形式になります。

**書き方:**

```markdown
---
home: true
sidebar: false
heroImage: /hero.svg
heroText: サイトのタイトル
tagline: サイトの一言説明
actions:
  - text: 最初に読むページ
    link: /guide/
    type: primary
features:
  - title: 特徴のタイトル
    details: 特徴の説明を書きます。
footer: © 2026 Your Organization. All Rights Reserved.
---
```

::: tip heroImage は public に置きます
`heroImage` に指定する画像は `docs/.vuepress/public/` に置き、`/hero.svg` のように書きます。
画像の置き場所については[次の章](/guide/04-workflow/README.md)で説明します。
:::

## 次に読む

ページの書き方はここまでです。
書いたページを実際に公開するまでの手順は、[4. 執筆から公開までの流れ](/guide/04-workflow/README.md)に進んでください。

<credit-footer/>
