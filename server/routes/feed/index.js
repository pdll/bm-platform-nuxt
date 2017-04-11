import methods from '../../methods'

export default (router) => {
  router.get('/', methods.feed.testFeedMethod)

  router.bridge('/:program', [ methods.feed.initMiddleware ], router => {
    router.get('/', methods.feed.testFeedMethod)
  })
}
