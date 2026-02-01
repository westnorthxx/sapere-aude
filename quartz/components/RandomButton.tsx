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
  document.getElementById('random-button')?.addEventListener('click', async () => {
    try {
      const response = await fetch('/static/contentIndex.json');
      if (!response.ok) throw new Error('Index not found');
      
      const index = await response.json();
      const slugList = Object.keys(index).filter(slug => {
        return slug !== "index" && !slug.startsWith("tags/");
      });

      if (slugList.length > 0) {
        const randomSlug = slugList[Math.floor(Math.random() * slugList.length)];
        const baseUrl = window.location.origin;
        window.location.href = baseUrl + "/" + randomSlug;
      }
    } catch (err) {
      console.error("Random jump failed:", err);
      // 纯 JS 环境下不需要 'as' 类型断言
      const fallbackLinks = Array.from(document.querySelectorAll('a.internal'));
      if (fallbackLinks.length > 0) {
        window.location.href = fallbackLinks[Math.floor(Math.random() * fallbackLinks.length)].href;
      }
    }
  })
`

export default (() => RandomButton) satisfies QuartzComponentConstructor