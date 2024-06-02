const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.user.user.avatar,
  name: state => state.user.user.name,
  user: state => state.user.user
}
export default getters
