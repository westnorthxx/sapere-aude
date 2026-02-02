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
        // 1. 获取 Quartz 自动识别的 Base URL
        // 在你的环境下，dataset.baseurl 通常会是 "sapere-aude"
        const baseUrl = document.documentElement.dataset.baseurl || "";
        
        // 2. 尝试从 static 目录获取索引文件
        const indexPath = "./static/contentIndex.json";
        const response = await fetch(indexPath);
        
        if (!response.ok) throw new Error('Index not found');
        
        const index = await response.json();
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 3. 构建完整的跳转路径
          // 如果 baseUrl 存在，则拼接为 /baseUrl/randomSlug；否则直接 /randomSlug
          // 这样可以确保在本地 localhost 和 GitHub 子路径下都有效
          const finalPath = baseUrl 
            ? \`/\${baseUrl}/\${randomSlug}\` 
            : \`/\${randomSlug}\`;

          // 处理可能出现的双斜杠问题并跳转
          window.location.href = window.location.origin + finalPath.replace(/\\/\\//g, '/');
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
        // Fallback: 依然缺子路径的话，手动从 a.internal 获取
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