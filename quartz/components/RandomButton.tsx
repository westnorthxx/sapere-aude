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
        // 1. 动态获取 Base URL (例如 "sapere-aude")
        let baseUrl = document.documentElement.dataset.baseurl || "";
        if (baseUrl === "/") baseUrl = "";
        
        // 2. 构造绝对 Fetch 路径 (不管你在哪个页面，都从域名根部找)
        // 结果类似: https://westnorthxx.github.io/sapere-aude/static/contentIndex.json
        const urlPrefix = baseUrl ? "/" + baseUrl : "";
        const fetchUrl = window.location.origin + urlPrefix + "/static/contentIndex.json";
        
        console.log("Fetching index from:", fetchUrl);
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error('Index not found at ' + fetchUrl);
        
        const index = await response.json();
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 3. 构造绝对跳转路径
          // 结果类似: https://westnorthxx.github.io/sapere-aude/Bioinformatics/Target-Note
          const finalUrl = window.location.origin + urlPrefix + "/" + randomSlug;
          
          // 清理可能产生的双斜杠并跳转
          const cleanUrl = finalUrl.replace(/([^:]\\/)\\/+/g, "$1");
          console.log("Redirecting to:", cleanUrl);
          window.location.href = cleanUrl;
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
        // Fallback: 依然失败时，尝试从当前页面抓取一个 internal 链接
        const links = Array.from(document.querySelectorAll('a.internal'))
          .filter(a => !a.getAttribute('href').startsWith('#'));
        if (links.length > 0) {
          window.location.href = links[Math.floor(Math.random() * links.length)].href;
        }
      }
    });
  });
`

export default (() => RandomButton) satisfies QuartzComponentConstructor