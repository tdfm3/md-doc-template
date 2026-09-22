import { defineClientConfig } from 'vuepress/client'
import HeaderTable from './components/header-table.vue'
import CreditFooter from './components/credit-footer.vue'

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('HeaderTable', HeaderTable)
    app.component('header-table', HeaderTable)
    app.component('CreditFooter', CreditFooter)
    app.component('credit-footer', CreditFooter)

    // 最終更新日時のフォーマットをカスタマイズ (YY/M/D, H:MM AM/PM)
    if (typeof window !== 'undefined') {
      router.afterEach(() => {
        setTimeout(() => {
          const elements = document.querySelectorAll('[class*="last-updated"] time')

          elements.forEach(el => {
            try {
              const dateStr = el.textContent.trim()

              // M/D/YY, H:MM AM/PM 形式をパース (例: 10/5/25, 9:54 PM)
              const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}),\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/)

              if (match) {
                const [_, month, day, year, hour, minute, ampm] = match
                // YY/M/D, H:MM AM/PM 形式に変換 (例: 25/10/5, 9:54 PM)
                const formatted = `${year}/${month}/${day}, ${hour}:${minute} ${ampm}`
                el.textContent = formatted
              } else {
                // M/D/YY形式でない場合は、通常のDateパース
                const date = new Date(dateStr)
                if (!isNaN(date.getTime())) {
                  const year = String(date.getFullYear()).slice(-2)
                  const month = date.getMonth() + 1
                  const day = date.getDate()
                  const hours = date.getHours()
                  const minutes = String(date.getMinutes()).padStart(2, '0')
                  const ampm = hours >= 12 ? 'PM' : 'AM'
                  const displayHours = hours % 12 || 12

                  const formatted = `${year}/${month}/${day}, ${displayHours}:${minutes} ${ampm}`
                  el.textContent = formatted
                }
              }
            } catch (e) {
              // エラー時は元の表示のまま
            }
          })
        }, 500)
      })
    }
  },
})
