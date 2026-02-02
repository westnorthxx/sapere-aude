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
        // 1. 获取 Quartz 自动注入的全局变量
        // Quartz 将搜索索引存储在全局，我们可以直接借用
        const searchData = window.searchIndex; 
        
        let slugList = [];

        if (searchData) {
          // 如果搜索索引存在，直接从中提取 slug
          slugList = Object.keys(searchData).filter(slug => {
            return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
          });
        }

        // 2. 如果搜索索引不可用，使用 Fallback 方案
        if (slugList.length === 0) {
          const links = Array.from(document.querySelectorAll('a.internal'))
            .filter(a => {
              const href = a.getAttribute('href');
              return href && !href.startsWith('#') && !href.includes(window.location.pathname);
            });
          
          if (links.length > 0) {
            window.location.href = links[Math.floor(Math.random() * links.length)].href;
            return;
          }
          throw new Error("No slugs found");
        }

        // 3. 执行随机跳转
        const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
        const baseUrl = document.documentElement.dataset.baseurl || "";
        window.location.href = window.origin + "/" + (baseUrl ? baseUrl + "/" : "") + randomSlug;

      } catch (err) {
        console.error("随机跳转失败:", err);
      }
    })
  })
`

export default (() => RandomButton) satisfies QuartzComponentConstructor