import React from 'react'
import classnames from 'classnames'

const Search = ({ searchCallback, curClass }) => {
  return (
    <div className={`search-input ${curClass}`}>
      <input
        autoFocus
        type='text'
        placeholder='search'
        onChange={e => {
          searchCallback(e.target.value)
        }}
      />
    </div>
  )
}

export default Search
