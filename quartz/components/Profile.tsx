import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const Profile: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div class="profile-card">
        <img src="https://test.fukit.cn/autoupload/f/tIb5WUVPBjzOskkIUH_1-DaeskDuZ8tS2qBVYi6YkPI/20260201/VvXu/750X976/8e2bcb4be2d54d6bab7c44cb4cbfbf5a.jpg/webp" alt="Avatar" style="border-radius: 50%; width: 100px;" />
        <h3>westnorthxx</h3>
        <p>a random dude</p>
      </div>
    )
  }
  return Profile
}) satisfies QuartzComponentConstructor