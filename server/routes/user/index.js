import methods from '../../methods/users'

export default router => {
  router.get('/list', methods.list)

  router.bridge('/program', router => {

    router.bridge('/activation', router => {
      router.post('/', methods.program.activation)
    })      

    router.post('/register', methods.program.registration)
  })
}