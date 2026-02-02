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
        // 1. 自动获取子路径前缀
        // 如果是在 westnorthxx.github.io/sapere-aude/ 下，data-baseurl 通常是 "sapere-aude"
        let baseUrl = document.documentElement.dataset.baseurl || "";
        if (baseUrl === "/") baseUrl = "";
        const urlPrefix = baseUrl ? "/" + baseUrl : "";

        // 2. 绝对路径获取索引
        const response = await fetch(window.location.origin + urlPrefix + "/static/contentIndex.json");
        if (!response.ok) throw new Error('Index not found');
        
        const index = await response.json();
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 3. 核心：使用 window.location.origin 确保从最顶层开始构建
          // 结果类似于：https://westnorthxx.github.io/sapere-aude/notes/my-random-note
          const finalUrl = window.location.origin + urlPrefix + "/" + randomSlug;
          
          // 替换掉可能连在一起的多个斜杠
          window.location.href = finalUrl.replace(/([^:]\\/)\\/+/g, "$1");
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
        // Fallback: 如果出错，尝试寻找带子路径的 internal 链接
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