import request from '/src/utils/request'

// 获取单个基金
export const getFund = (fundCode) => {
  return request.get(
    '/fund/fundInfo',
    {
      params: {
        fundCode: fundCode
      }
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 获取基金列表
export const getFundList = (pageNum, pageSize) => {
  return request.get(
    '/fund/fundList',
    {
      params: {
        pageNum: pageNum,
        pageSize: pageSize
      }
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 爬取基金网页
export const getFundHtml = (url) => {
  return request.get(
    'fund/fundCrawler',
    {
      params: {
        url: url
      }
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
