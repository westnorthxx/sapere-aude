import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// 1. 确保导入了这两个工具函数
import { joinSegments, pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

const Profile: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  // 2. 获取当前页面到根目录的相对路径
  const baseDir = pathToRoot(fileData.slug!)
  // 3. 拼接出准确的头像路径
  const avatarPath = joinSegments(baseDir, "static/icon_head.jpg")

  return (
    <div className={classNames(displayClass, "profile-container")}>
      <div className="profile-card">
        <img 
          src={avatarPath}  /* 4. 使用计算后的路径 */
          alt="Profile Avatar" 
          className="profile-avatar"
        />
        <div className="profile-content">
          <h3 className="profile-name">westnorth</h3>
          <p className="profile-description">a random dude</p>
        </div>
      </div>
    </div>
  )
}

// ... 后面保持不变的 CSS 部分
Profile.css = `
.profile-container {
  margin-bottom: 1.5rem;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: var(--light);
  border: 1px solid var(--lightgray);
  transition: all 0.3s ease;
  /* 极致的阴影设计 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.profile-card:hover {
  border-color: var(--tertiary);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--lightgray);
  background-color: var(--lightgray); /* 图片加载前的占位色 */
  transition: opacity 0.3s ease;
}

.profile-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0; /* 防止溢出 */
}

.profile-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark);
  line-height: 1.2;
}

.profile-description {
  margin: 0.2rem 0 0 0;
  font-size: 0.75rem;
  color: var(--gray);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 适配 Quartz 深色模式 */
[aria-theme='dark'] .profile-card {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.1);
}
`

export default (() => Profile) satisfies QuartzComponentConstructor