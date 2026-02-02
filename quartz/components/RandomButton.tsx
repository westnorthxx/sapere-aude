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
        // --- 硬编码配置区域 ---
        const REPO_NAME = 'sapere-aude'; 
        // -----------------------

        const prefix = \`/\${REPO_NAME}\`;
        const fetchUrl = \`\${prefix}/static/contentIndex.json\`;
        
        console.log("正在发起请求:", fetchUrl);
        
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error('无法获取索引文件: ' + fetchUrl);
        
        const index = await response.json();
        
        // 过滤掉索引页、标签页和附件/锚点
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && 
                 !slug.startsWith("tags/") && 
                 !slug.includes("#") &&
                 !slug.includes(".png") && 
                 !slug.includes(".jpg");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 构造目标路径：/sapere-aude/文章路径
          const targetPath = \`\${prefix}/\${randomSlug}\`.replace(/\\/\\//g, "/");
          
          console.log("随机跳转至:", targetPath);
          
          // 优先使用 Quartz 的 SPA 导航，无缝切换
          if (window.spaNavigate) {
            window.spaNavigate(new URL(targetPath, window.location.origin));
          } else {
            window.location.href = targetPath;
          }
        } else {
          console.warn("索引列表为空，无法跳转");
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
        // 如果 fetch 失败（比如 Tracking Prevention），尝试从页面现有链接跳转作为兜底
        const internalLinks = Array.from(document.querySelectorAll('a.internal'));
        if (internalLinks.length > 0) {
          const randomLink = internalLinks[Math.floor(Math.random() * internalLinks.length)];
          randomLink.click();
        }
      }
    })
  })
`

export default (() => RandomButton) satisfies QuartzComponentConstructor