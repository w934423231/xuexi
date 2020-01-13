Component({
  data: {
  },
  properties: {
    "productlist": {
      type: Array,
      default: []
    }
  },
  methods: {
    catechange(e) {
      console.log(JSON.stringify(e.currentTarget.dataset.index))
      wx.navigateTo({
        url: '/pages/xiangqing/xiangqing?cateid=' + JSON.stringify(e.currentTarget.dataset.index)
      })
    },
  }
})