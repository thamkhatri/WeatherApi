import { FiSearch } from 'react-icons/fi';
import React from 'react'

const SearchBar = ({input,setInput,handleSubmit}) => {
  return (
    <>

        {/* Search */}
        <form onSubmit={handleSubmit} className="w-full flex gap-7 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city..."
            className="px-4 py-2 bg-white rounded-md shadow border  flex w-full"
          />
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
              <FiSearch style={{ marginRight: '8px' }} />
          </button>
        </form>

    </>
  )
}

export default SearchBar;