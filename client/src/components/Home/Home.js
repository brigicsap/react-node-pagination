import React, { Component } from 'react'
import styled from 'styled-components'

import Pagination from '../Pagination/Pagination'

const Grid = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 2rem;
`

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  padding: 2rem;
`

class Home extends Component {
  constructor() {
    super()

    this.state = {
      pager: {},
      itemsOnPage: [],
      currentPage: null
    }
  }

  componentDidMount() {
    this.loadPage()
  }

  handleClick = async e => {
    const pageId = e.target.dataset.page

    if (pageId !== this.state.currentPage) {
      const response = await fetch(
        `/api/items?page=${pageId}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      )

      const data = await response.json()

      this.setState({
        pager: data.pager,
        itemsOnPage: data.itemsOnPage,
        currentPage: data.pager.currentPage
      })
    }
  }

  loadPage = async () => {
    const page = this.props.location.search
    const pageNumber = parseInt(page.split('=')[1]) || 1

    if (pageNumber === this.state.currentPage) return

    const response = await fetch(
      `/api/items?page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    )

    const data = await response.json()

    this.setState({
      pager: data.pager,
      itemsOnPage: data.itemsOnPage,
      currentPage: data.pager.currentPage
    })
  }

  render() {
    const { pager: {pages, totalPages}, itemsOnPage, currentPage } = this.state

    return (
      <article>
        <section>
          <h1 style={{
            textAlign: 'center'
          }}>
            React / Node pagination
          </h1>
          <Grid>
            { itemsOnPage && itemsOnPage.map(item => (
                <GridItem key={item.id}>{item.name}</GridItem>
              ))
            }
          </Grid>
        </section>
        <Pagination
          pages={pages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={this.handleClick}
        />
      </article>
    )
  }
}

export default Home
