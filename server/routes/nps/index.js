import methods from '../../methods/nps'

export default router => {
  router.bridge('/send', [ methods.send.init ], router => {
    router.get('/info', methods.send.info)
    router.post('/publish', methods.send.post)
  })

  router.bridge('/result', router => {
    router.get('/replies', methods.results.replies)
    router.get('/cities', methods.results.cities)
    // router.get('/replies', methods.results)
  })
}
