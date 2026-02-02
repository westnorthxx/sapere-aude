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
  function normalizePath(...parts) {
    // 连接路径并规范化斜杠
    return parts
      .filter(p => p && p !== "/")
      .join("/")
      .replace(/\\/+/g, "/")
      .replace(/^\\//, "");
  }

  document.querySelectorAll('.random-button').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        // 1. 获取 baseUrl（子路径前缀）
        let baseUrl = document.documentElement.dataset.baseurl || "";
        if (baseUrl === "/") baseUrl = "";

        // 2. 构建 contentIndex.json 的完整路径
        // 使用相对路径从根目录获取，更可靠
        const indexPath = baseUrl
          ? "/" + normalizePath(baseUrl, "static/contentIndex.json")
          : "/static/contentIndex.json";

        console.log("Fetching content index from:", indexPath);
        const response = await fetch(indexPath);

        if (!response.ok) {
          throw new Error(\`Failed to fetch index: \${response.status} \${response.statusText}\`);
        }

        const index = await response.json();

        // 3. 过滤出所有有效的文章 slug
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        console.log(\`Found \${slugList.length} articles\`);

        if (slugList.length > 0) {
          // 4. 随机选择一篇文章
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          console.log("Navigating to:", randomSlug);

          // 5. 构建目标 URL
          const targetPath = baseUrl
            ? "/" + normalizePath(baseUrl, randomSlug)
            : "/" + randomSlug;

          window.location.href = targetPath;
        } else {
          throw new Error("No articles found in index");
        }
      } catch (err) {
        console.error("随机跳转失败:", err);
        alert(\`随机跳转失败: \${err.message}\`);

        // Fallback: 如果出错，尝试从页面上的内部链接随机选择
        const links = Array.from(document.querySelectorAll('a.internal'))
          .filter(a => {
            const href = a.getAttribute('href');
            return href && !href.startsWith('#');
          });

        if (links.length > 0) {
          const randomLink = links[Math.floor(Math.random() * links.length)];
          console.log("Using fallback navigation to:", randomLink.href);
          window.location.href = randomLink.href;
        } else {
          console.error("No fallback links available");
        }
      }
    });
  });
`

export default (() => RandomButton) satisfies QuartzComponentConstructor