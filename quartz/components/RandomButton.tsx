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
  // 使用 Quartz 的路径解析函数（从 util.ts 复制）
  function resolveUrl(currentSlug, targetSlug) {
    const current = currentSlug.split("/").filter(x => x !== "");
    const target = targetSlug.split("/").filter(x => x !== "");

    // 计算需要返回多少级
    const backtracks = current.length;
    const relativePath = "../".repeat(backtracks) + target.join("/");

    return relativePath || "./";
  }

  document.querySelectorAll('.random-button').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        // 1. 使用 Quartz 提供的全局 fetchData（已经在页面中定义）
        console.log("Loading content index...");
        const index = await fetchData;

        // 2. 过滤出所有有效的文章 slug
        const slugList = Object.keys(index).filter(slug => {
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        console.log(\`Found \${slugList.length} articles\`);

        if (slugList.length > 0) {
          // 3. 随机选择一篇文章
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          console.log("Selected random article:", randomSlug);

          // 4. 获取当前页面的 slug
          const currentSlug = document.body.dataset.slug || "index";
          console.log("Current slug:", currentSlug);

          // 5. 使用相对路径导航
          const targetPath = resolveUrl(currentSlug, randomSlug);
          console.log("Navigating to:", targetPath);

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