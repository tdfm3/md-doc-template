import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
import codeCopyPlugin from '@snippetors/vuepress-plugin-code-copy'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
import { iconPlugin } from '@vuepress/plugin-icon'
import { navbar } from './navbar.js'
import { sidebar } from './sidebar.js'

/**
 * 公開先のサブパス。
 *
 * GitHub Pages のプロジェクトサイトは https://<org>.github.io/<repo>/ で配信されるため、
 * base を指定しないと CSS・画像・内部リンクがすべて 404 になる。
 * 本テンプレートでは .github/workflows/docs.yml がリポジトリ名から
 * VUEPRESS_BASE を自動で渡すので、通常は書き換え不要。
 *
 * 独自ドメイン、または https://<org>.github.io/ 直下で公開する場合は、
 * docs.yml の VUEPRESS_BASE の行を削除すること（base は '/' になる）。
 */
const base = process.env.VUEPRESS_BASE ?? '/'

export default defineUserConfig({
  base,

  // サイトの基本設定（※コピーしたら書き換える）
  title: 'ドキュメントテンプレート',
  description: 'Markdown で書いて GitHub Pages に公開するドキュメントサイトのテンプレート',

  // ファビコン設定
  // head の href は VuePress が base を補完しないため、自前で base を連結する
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
  ],

  // バンドラーを指定
  bundler: viteBundler(),

  // テーマを指定
  theme: defaultTheme({
    // ナビゲーション設定（navbar.js / sidebar.js で定義）
    navbar,
    sidebar,

    // リポジトリ設定
    // ※自分のリポジトリを指定すると、ナビゲーションバーに GitHub へのリンクが表示される
    // repo: 'your-org/your-repo',

    // ページ編集リンク
    editLink: false,

    // Git情報表示設定
    lastUpdated: true,
    lastUpdatedText: '最終更新',
    contributors: false,
    contributorsText: '執筆者',
  }),

  // Markdown の設定
  // 絵文字（:tada:）と自動リンクは VuePress v2 が標準で備えている。
  // コードブロックの行番号はテーマ側の機能。いずれもここでの指定は不要。
  markdown: {},

  // プラグイン設定
  plugins: [
    {
      // スキーマなしの自動リンクを無効化する。
      // 有効のままだと README.md や config.js のようなファイル名が
      // ドメイン（.md はモルドバ、.js はジャージーの TLD）と解釈され、
      // http://README.md という存在しないリンクが生成される。
      // https:// から始まる URL は引き続き自動でリンクになる。
      name: 'md-doc-template-markdown',
      extendsMarkdown: (md) => {
        md.linkify.set({ fuzzyLink: false })
      },
    },
    searchPlugin({
      // 検索オプション
      locales: {
        '/': {
          placeholder: '検索',
        },
      },
      maxSuggestions: 10,
      hotKeys: ['s', '/'],
      isSearchable: (page) => page.path !== '/',
    }),
    markdownExtPlugin({
      // GitHub Flavored Markdown拡張
      gfm: true,
      // タスクリスト有効化
      tasklist: true,
    }),
    markdownChartPlugin({
      // Mermaid図を有効化
      mermaid: true,
      // PlantUML図を有効化
      plantuml: true,
    }),
    codeCopyPlugin({
      // プラグインオプション
      buttonText: 'コピー',
      buttonAriaLabel: 'コードをコピー',
      successText: 'コピーしました！',
    }),
    iconPlugin({
      assets: "iconify",
      markdown: true,
    }),
    markdownImagePlugin({
      lazyload: true,
      mark: true
    }),
    markdownTabPlugin({
      // Enable code tabs
      codeTabs: true,
      // Enable tabs
      tabs: true,
    }),
  ],
})
