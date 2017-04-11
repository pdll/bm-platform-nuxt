import methods from '../../methods'

export default router => {
  router.get('/user-create', methods.account.createActivationLink)
  router.get('/user-create-2', methods.account.createUser)
  router.get('/user-create-real', methods.account.createUserReal)
}