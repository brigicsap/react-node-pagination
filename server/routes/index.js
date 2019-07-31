const express = require('express')
const router = express.Router()
const paginate = require('jw-paginate')

router.get('/', (req, res) => {
  request('http://localhost:8081')
    .on('error', err => res.send('try refreshing the page'))
    .pipe(res)
})

router.get('/api/items', (req, res, next) => {
  //create array of fake items to be paginated
  const items = [...Array(200).keys()].map(i => {
    return {
      id: (i+1),
      name: `Item ${i + 1}`
    }
  })
  //get page from query params or default to 1
  const page = parseInt(req.query.page) || 1
  //number of items to be queried
  const pageSize = 10
  const pager = paginate(items.length, page, pageSize)
  //get items from array
  const itemsOnPage = items.slice(pager.startIndex, pager.endIndex + 1)

  return res.json({pager, itemsOnPage})
})

module.exports = router
