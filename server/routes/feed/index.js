import methods from '../../methods'

export default (router) => {
  router.get('/list', methods.feed.getUserFeed)
  // router.bridge('/:program', [ methods.feed.initMiddleware ], router => {
  //   router.get('/', methods.feed.testFeedMethod)
  // })
}
