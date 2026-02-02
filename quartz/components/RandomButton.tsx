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
        // 1. 自动识别 GitHub Pages 的子路径
        // 如果当前路径包含 /sapere-aude/，则将其提取为前缀
        const pathSegments = window.location.pathname.split('/');
        const repoName = 'sapere-aude';
        const isGithubPages = pathSegments.includes(repoName);
        const prefix = isGithubPages ? '/' + repoName : '';

        // 2. 构造 fetchUrl (结果应该是 /sapere-aude/static/contentIndex.json)
        const fetchUrl = \`\${prefix}/static/contentIndex.json\`.replace(/\\/\\//g, "/");
        
        console.log("正在获取索引:", fetchUrl);
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error('无法获取索引文件: ' + fetchUrl);
        
        const index = await response.json();
        const slugList = Object.keys(index).filter(slug => {
          // 排除掉主页、标签页和锚点
          return slug !== "index" && !slug.startsWith("tags/") && !slug.includes("#");
        });

        if (slugList.length > 0) {
          const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
          
          // 3. 构造跳转路径 (必须包含仓库名前缀)
          const targetPath = \`\${prefix}/\${randomSlug}\`.replace(/\\/\\//g, "/");
          
          console.log("随机跳转至:", targetPath);
          
          // 使用 SPA 导航以获得丝滑体验
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