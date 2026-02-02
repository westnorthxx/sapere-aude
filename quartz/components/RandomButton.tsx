import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const RandomButton: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <button 
      type="button" 
      id="random-button" 
      class={`random-button ${displayClass ?? ""}`}
    >
      <span>随便看看</span>
    </button>
  )
}

RandomButton.afterDOMLoaded = `
  document.querySelectorAll('.random-button').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        // 1. 获取基础路径。Quartz 4 在 SPA 模式下通常能通过 dataset 获取 baseurl
        const baseUrl = document.documentElement.dataset.baseurl || ""
        const fullUrl = baseUrl + "/index.json" // Quartz 默认生成的索引文件

        const response = await fetch(fullUrl)
        if (!response.ok) throw new Error('Index not found at ' + fullUrl)
        
        const index = await response.json()
        
        // 2. 过滤掉非笔记内容
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && 
                 !slug.startsWith("tags/") && 
                 !slug.includes("#")
        })

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)]
          // 3. 跳转。注意处理斜杠，确保路径正确
          window.location.href = (baseUrl ? "/" + baseUrl : "") + "/" + randomSlug
        }
      } catch (err) {
        console.error("随机跳转失败:", err)
        // 改良后的 Fallback：只在真正的内部链接中随机跳转，排除锚点
        const internalLinks = Array.from(document.querySelectorAll('a.internal'))
          .filter(a => {
            const href = a.getAttribute('href')
            return href && !href.startsWith('#') && !href.includes(window.location.pathname)
          })
        
        if (internalLinks.length > 0) {
          window.location.href = internalLinks[Math.floor(Math.random() * internalLinks.length)].href
        }
      }
    })
  })
`

export default (() => RandomButton) satisfies QuartzComponentConstructor