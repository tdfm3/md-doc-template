# CLAUDE.md

@AGENTS.md

## Claude Code 固有

### MCP サーバー

- `.mcp.json` に `context7` をリモート HTTP（`https://mcp.context7.com/mcp`）で設定済み。
  VuePress v2 は rc 版で仕様が動くため、プラグインの記法や設定項目を調べるときに使う。
  ただし最終確認は `node_modules` の実装かローカルビルドで行うこと
- `.mcp.json` は `.gitignore` の対象。テンプレートをコピーした人には届かないため、
  必要な場合は各自の環境で用意すること

### 作業の進め方

- ドキュメントを追加・変更したら、必ず `npm run textlint` と `npm run build` を実行して確認する
- ページを追加したら `docs/.vuepress/sidebar.js` への登録を確認する（登録漏れが最も多い見落とし）
- 回答・コミットメッセージ・ドキュメントのいずれにも絵文字を使わない

---

プロジェクトの規約・構成・トラブルシューティングは `AGENTS.md` に記載しています。
