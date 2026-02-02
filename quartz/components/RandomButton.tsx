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
        // 1. 自动获取当前站点的 Base Path (处理 GitHub Pages 仓库名路径)
        // Quartz 会在 <html> 标签上挂载 data-baseurl
        let baseUrl = document.documentElement.dataset.baseurl || "";
        // 确保 baseUrl 以 / 开头，但不以 / 结尾
        const urlPrefix = baseUrl.startsWith("/") ? baseUrl : "/" + baseUrl;
        const cleanPrefix = urlPrefix === "/" ? "" : urlPrefix.replace(/\\/$/, "");

        // 2. 构造【相对根路径】请求
        // 这样浏览器会视其为“同源”，能极大程度避免 Tracking Prevention 报错
        const fetchUrl = \`\${cleanPrefix}/static/contentIndex.json\`;
        
        console.log("Fetching index from:", fetchUrl);
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error('Index not found at ' + fetchUrl);
        
        const index = await response.json();
        const slugList = Object.keys(index).filter(slug => {
          // 过滤掉索引页、标签页和锚点链接
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 3. 构造跳转路径 (使用 SPA 导航以获得更好的体验)
          const finalUrl = \`\${cleanPrefix}/\${randomSlug}\`.replace(/\\/\\//g, "/");
          
          console.log("Redirecting to:", finalUrl);
          
          // 如果 Quartz 的 SPA 路由可用，优先使用
          if (window.spaNavigate) {
            window.spaNavigate(new URL(finalUrl, window.location.origin));
          } else {
            window.location.href = finalUrl;
          }
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
      }
    })
  })
`

export default (() => RandomButton) satisfies QuartzComponentConstructor