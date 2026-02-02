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
        // 1. 获取 Quartz 自动注入的基础路径 (对应 quartz.config.ts 中的 baseUrl)
        // 它的值通常是 "sapere-aude" 或者为空
        let baseUrl = document.documentElement.dataset.baseurl || "";
        
        // 2. 构造正确的相对路径
        // 我们不使用 window.location.origin，而是使用以 / 开头的绝对路径名
        // 这样可以确保不管用户在哪个子页面，都能回到站点根部找 static 文件夹
        const rootPath = baseUrl && baseUrl !== "/" 
          ? (baseUrl.startsWith("/") ? baseUrl : "/" + baseUrl) 
          : "";
          
        const fetchUrl = \`\${rootPath}/static/contentIndex.json\`.replace(/\\/\\//g, "/");
        
        console.log("正在获取索引:", fetchUrl);
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error('无法获取索引文件: ' + fetchUrl);
        
        const index = await response.json();
        const slugList = Object.keys(index).filter(slug => {
          // 排除主页和特殊页面
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 3. 构造跳转 URL
          // 加上 rootPath 确保 GitHub Pages 子路径正确
          const targetPath = \`\${rootPath}/\${randomSlug}\`.replace(/\\/\\//g, "/");
          
          console.log("随机跳转至:", targetPath);
          
          // 如果 Quartz 的 SPA 路由可用，优先使用
          if (window.spaNavigate) {
            window.spaNavigate(new URL(targetPath, window.location.origin));
          } else {
            window.location.href = targetPath;
          }
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
      }
    })
  })
`

export default (() => RandomButton) satisfies QuartzComponentConstructor