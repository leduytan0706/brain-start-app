import React from 'react' // Chỉ dùng cho Server Component
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

// Form là component mới của React 19 giúp xử lý form server action trong server components, tự động thay đổi URL params
// Nhận query là props được truyền từ cha tùy chọn kiểu string
const SearchForm = ({query}: {query? : string}) => {


  return (
    <Form action="/" scroll={false} className='search-form'>
        <input 
            type="text" 
            name="query"
            defaultValue={query}
            className='search-input'
            placeholder='Search Startups'
        />

        <div className='flex gap-2'>
            {query && (
                <SearchFormReset />
            )}
            <button type='submit' className='search-btn text-white'>
                <Search className='size-6'/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm