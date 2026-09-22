---
home: true
sidebar: false
heroImage: /hero.svg
heroAlt: Markdown ファイルが Web サイトとして公開される様子
heroText: ドキュメントテンプレート
tagline: Markdown を書くだけで、ドキュメントサイトが公開される
actions:
  - text: ドキュメントの書き方
    link: /guide/
    type: primary
  - text: 設計文書テンプレート
    link: /spec/
    type: secondary
features:
  - title: Markdown で書くだけ
    details: 記事は Markdown ファイルです。HTML も CSS も書く必要はありません。ファイルを置いた場所が、そのままページの URL になります。
  - title: push すれば公開される
    details: main ブランチに push すると、GitHub Actions がビルドして GitHub Pages に公開します。手動でのデプロイ作業はありません。
  - title: 図表とタブが書ける
    details: Mermaid と PlantUML で図を書けます。タブ切り替え、注意書きボックス、コードのコピーボタンも標準で使えます。
  - title: 日本語を自動で校正
    details: textlint が文章の長さ、助詞の重複、文体の統一をチェックします。コミット前に自動で実行されます。
  - title: 全文検索つき
    details: サイト内検索が最初から有効です。ページが増えても読者は目的の記述にたどり着けます。
  - title: コピーして流用できる
    details: このリポジトリをコピーすれば、同じ公開の仕組みをそのまま使えます。中身を自分のドキュメントに入れ替えてください。
footer: © 2026 Your Organization. All Rights Reserved.
---

## このサイトについて

このサイトは、**Markdown で書いたドキュメントを GitHub Pages に公開する仕組み**のテンプレートです。

公開の仕組みだけが入っており、中身は「Markdown ファイルの書き方」を説明したサンプルドキュメントになっています。
リポジトリをコピーして、サンプルを自分のドキュメントに入れ替えれば、そのまま使えます。

| 知りたいこと | 読む場所 |
|------|------|
| Markdown の書き方を知りたい | [ドキュメントの書き方](/guide/README.md) |
| このサイトの仕組みを知りたい | [アーキテクチャ設計書](/spec/architecture.md) |
| リポジトリをコピーして公開したい | リポジトリの `README.md` |
