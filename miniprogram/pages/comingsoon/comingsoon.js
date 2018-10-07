const app = getApp()

Page({
  data: {
    page: 1,
    count: 20,
    movies: [],
    type: 'coming_soon',
    hasMore: true
  },

  onLoad: function () {
    this.loadData()
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '即将上映'
    })
  },
  loadData: function () {
    wx.showLoading({
      title: '正在加载中',
    })
    return app.douban.find(this.data.type, this.data.page, this.data.count)
      .then(data => {
        if (data.subjects && data.subjects.length) {
          this.setData({
            movies: this.data.movies.concat(data.subjects)
          })
        } else {
          this.setData({
            hasMore: false
          })
        }
        // stop loading
        wx.hideLoading()
      })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      hasMore: false,
      movies: []
    })
    this.loadData()
      .then(() => {
        wx.stopPullDownRefresh()
      })
  },
  // 上拉刷新
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.loadData()
    }
  }
})
