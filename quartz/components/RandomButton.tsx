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
        // 1. 获取基础 URL，处理 GitHub Pages 子路径
        const baseUrl = document.documentElement.dataset.baseurl || ""
        const prefix = baseUrl ? "/" + baseUrl : ""
        
        // 2. 使用相对路径请求，增加对 contentIndex.json 的探测
        // 既然你在 static 下看到了它，我们优先请求 static/contentIndex.json
        const response = await fetch("./static/contentIndex.json")
        
        if (!response.ok) throw new Error('未能获取到索引文件');
        
        const index = await response.json();
        
        // 3. 提取所有合法的笔记路径 (slug)
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && 
                 !slug.startsWith("tags/") && 
                 !slug.includes("#"); // 排除锚点链接
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 4. 构建最终跳转地址
          // 确保不会出现双斜杠，并适配单页面应用(SPA)的路径
          const finalPath = prefix + "/" + randomSlug
          window.location.href = finalPath;
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
        
        // 5. Fallback: 如果 Fetch 失败，从当前页面的侧边栏或正文抓取
        const internalLinks = Array.from(document.querySelectorAll('a.internal'))
          .filter(a => {
            const href = a.getAttribute('href');
            return href && !href.startsWith('#') && !href.includes(window.location.pathname);
          });
        
        if (internalLinks.length > 0) {
          window.location.href = internalLinks[Math.floor(Math.random() * internalLinks.length)].href;
        }
      }
    });
  });
`

export default (() => RandomButton) satisfies QuartzComponentConstructor