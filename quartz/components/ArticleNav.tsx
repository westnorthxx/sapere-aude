import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { adjustDate } from "./Date"
import { QuartzPluginData } from "../plugins/vfile"
import { resolveRelative, SimpleSlug } from "../util/path"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const ArticleNav: QuartzComponent = ({ fileData, allFiles, displayClass, cfg }: QuartzComponentProps) => {
  // 1. 获取当前文件的所在目录
  const currentSlug = fileData.slug
  if (!currentSlug || currentSlug === "index") return null

  const currentFolder = currentSlug.split("/").slice(0, -1).join("/")

  // 2. 筛选出同目录下的所有笔记，并排除 index
  const siblings = allFiles.filter((file) => {
    const fileSlug = file.slug
    if (!fileSlug || fileSlug === "index" || fileSlug === currentSlug) return false
    
    // 检查是否在同一层级目录
    const fileFolder = fileSlug.split("/").slice(0, -1).join("/")
    // 同时也排除当前目录的 index 文件 (e.g. Bio/index)
    if (fileSlug.endsWith("/index")) return false

    return fileFolder === currentFolder
  })

  // 3. 排序 (默认按字母顺序，这样符合文件名排序，比如 01-xx, 02-xx)
  // 你也可以改为按日期排序: .sort((a, b) => sortFn(a, b, cfg))
  siblings.sort((a, b) => a.slug!.localeCompare(b.slug!))

  // 4. 找到当前文件在排序列表中的位置（这里我们需要把当前文件也放进去排序，才能找到前后）
  // 重新构建包含当前文件的列表来定位
  const allSiblings = [...siblings, fileData].sort((a, b) => a.slug!.localeCompare(b.slug!))
  const currentIndex = allSiblings.findIndex((f) => f.slug === currentSlug)

  const prev = allSiblings[currentIndex - 1]
  const next = allSiblings[currentIndex + 1]

  if (!prev && !next) return null

  return (
    <div class={classNames(displayClass, "article-nav")}>
      <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid var(--lightgray)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        
        {/* Previous Button */}
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          {prev && (
            <a href={resolveRelative(currentSlug, prev.slug!)} class="nav-link prev" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: "0.8em", color: "var(--gray)" }}>« Previous</div>
              <div style={{ fontWeight: "bold", color: "var(--secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {prev.frontmatter?.title ?? prev.slug}
              </div>
            </a>
          )}
        </div>

        {/* Next Button */}
        <div style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
          {next && (
            <a href={resolveRelative(currentSlug, next.slug!)} class="nav-link next" style={{ textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: "0.8em", color: "var(--gray)" }}>Next »</div>
              <div style={{ fontWeight: "bold", color: "var(--secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {next.frontmatter?.title ?? next.slug}
              </div>
            </a>
          )}
        </div>

      </div>
    </div>
  )
}

ArticleNav.css = `
.article-nav {
  margin: 2.5rem 0 3.5rem 0;
}
.article-nav .nav-link {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  transition: all 0.2s ease;
  background: var(--light);
}
.article-nav .nav-link:hover {
  border-color: var(--secondary);
  background: var(--highlight);
  transform: translateY(-2px);
}
`

export default (() => ArticleNav) satisfies QuartzComponentConstructor
