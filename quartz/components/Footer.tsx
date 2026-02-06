import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        {/* 新增的版权声明部分 */}
        <p>
          © {year} <b>westnorth</b>.
          <br />
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            <img 
              alt="Creative Commons License" 
              style={{ borderWidth: 0, opacity: 0.8, marginTop: "0.5rem" }} 
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" 
            />
          </a>
          <br />
          除非另有说明，本站内容采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可协议。
        </p>
        
        {/* 新增的邮箱联系方式 */}
        <p>
          联系邮箱：<a href="mailto:westnorth_xx@163.com">westnorth_xx@163.com</a>
        </p>

        {/* 原有的 Quartz 署名 */}
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>
        </p>

        {/* 原有的自定义链接列表 */}
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li key={text}>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor