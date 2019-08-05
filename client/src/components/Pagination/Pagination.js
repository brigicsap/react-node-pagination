import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.aside`
  margin: 0 auto;
  text-align: center;
`

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  display: inline-block;
  padding: 1rem .4rem;
  cursor: pointer;

  a {
    text-decoration: none;
    color: black;
  }

  &.disabled {
    opacity: .5;
    pointer-events: none;
  }
`

const Pagination = ({ currentPage, pages, totalPages, handleClick }) => {
  return (
    <Container>
      <List>
        <ListItem
          className={currentPage===1 ? 'disabled' : ''}
          onClick={handleClick}
          data-page={1}
        >
          First
        </ListItem>
        <ListItem
          className={currentPage===1 ? 'disabled' : ''}
          onClick={handleClick}
          data-page={currentPage-1}
        >
          Previous
        </ListItem>
        <aside>
          <List>
            { pages && pages.map(page => (
                <ListItem
                  key={`page-${page}`}
                  data-page={page}
                  onClick={handleClick}
                >
                  {page}
                </ListItem>
              ))
            }
          </List>
        </aside>
        <ListItem
          className={currentPage===totalPages ? 'disabled' : ''}
          onClick={handleClick}
          data-page={currentPage+1}
        >
          Next
        </ListItem>
        <ListItem
          className={currentPage===totalPages ? 'disabled' : ''}
          onClick={handleClick}
          data-page={totalPages}
        >
          Last
        </ListItem>
      </List>
    </Container>
  )
}

Pagination.defaultProps = {
  pages: [],
  totalPages: 1
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pages: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination
