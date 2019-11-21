const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  serverErrors: state => state.errors.serverErrors,
  notification: state => state.notification.snackbar,

  //   errgetUserInfoors: state => state.notification.errors,
  language: state => state.user.language,
  locale: state => state.locale.locale,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers
};
export default getters;
