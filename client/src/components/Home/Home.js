import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      pager: {},
      itemsOnPage: []
    }
  }

  componentDidMount() {
    this.loadPage()
  }

  async loadPage() {
    const params = this.props.match.params

    const page = params || 1

    if (page === this.state.pager.currentPage) {
      return
    }

    const apiRequest = await fetch(
      `/api/items?page=${page}`,{
      method: 'GET'
    })

    const response = await apiRequest.json()
    this.setState({
      pager: response.pager,
      itemsOnPage: response.itemsOnPage
    })
  }

  render() {
    const { pager, itemsOnPage } = this.state
    console.log(pager.currentPage)

    return (
      <article>
        <section>
          <h1>React / Node pagination</h1>
          <ul>
            { itemsOnPage && itemsOnPage.map(item => <li key={item.id}>{item.name}</li>)}
          </ul>
        </section>
        <aside>
            <ul>
              <li>
                <Link to={{search: `?page=1`}}>First</Link>
              </li>
              <li>
                <Link to={{search: `?page=${pager.currentPage-1}`}}>Previous</Link>
              </li>
              { pager.pages && pager.pages.map(page => (
                  <li key={`page-${page}`}>
                    <Link to={{ search: `?page/${page}`}}>
                      {page}
                    </Link>
                  </li>
                ))
              }
              <li>
                <Link to={{search: `?page=${pager.currentPage+1}`}}>Next</Link>
              </li>
              <li>
                <Link to={{search: `?page=${pager.totalPages}`}}>Last</Link>
              </li>
            </ul>
        </aside>
      </article>
    )
  }
}

export default Home
