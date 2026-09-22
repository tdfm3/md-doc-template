/**
 * サイドバーの定義
 *
 * キーはパスのプレフィックス。そのプレフィックス配下のページを開いたときに、
 * 対応するサイドバーが表示される。
 *
 * VuePress v2 のデフォルトテーマには「ディレクトリから自動生成」する機能がないため、
 * ページを追加したら必ずここに 1 行追加すること。
 *   - '/guide/01-basic-syntax/' → docs/guide/01-basic-syntax/README.md
 *   - '/spec/adr.md'            → docs/spec/adr.md
 * サイドバーの表示名は、各ページのフロントマター title が使われる。
 */
export const sidebar = {
  '/guide/': [
    {
      text: 'ドキュメントの書き方',
      children: [
        '/guide/',
        '/guide/01-basic-syntax/',
        '/guide/02-vuepress-syntax/',
        '/guide/03-frontmatter/',
        '/guide/04-workflow/',
      ],
    },
  ],
  '/spec/': [
    {
      text: '設計文書',
      children: [
        '/spec/',
        '/spec/architecture.md',
        '/spec/adr.md',
        '/spec/prd.md',
        '/spec/user-stories.md',
      ],
    },
  ],
};
