'use client'
// use client: chỉ định component làm Client Component, đóng vai trò tương tác với người dùng phía giao diện
import Link from 'next/link';

const SearchFormReset = () => {

    const resetSearch = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement;

        if (form) form.reset();
    }

    return (
        <button type="reset" onClick={resetSearch}>
            <Link href="/" className="search-btn text-white">X</Link>
        </button>
    )
}

export default SearchFormReset