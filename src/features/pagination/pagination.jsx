import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import userService from '../../services/UserApi'

import User from '../../components/User'
import PageButton from '../../components/PageButton'


const UserListPaginated = () => {
    const [page, setPage] = useState(1) // pagination number

    const {
        isLoading, // used when the data is fetched for the first time
        isError,
        error,
        data: users,
        isFetching, // used when new data is being fetched including background updates after initial load.
        isPreviousData, // return boolean - allow to manage access data new/old - only relevant when keepPreviousData is true
    } = useQuery({
        queryKey: ['/users', page],
        queryFn: () => userService.getUsersPage(page),
        keepPreviousData: true // allow the old data to be kept and displayed until the new data is available
    })


    if (isLoading) return <p>Loading Users...</p>
    if (isError) return <p>Error: {error.message}</p>

    const firstPage = () => setPage(1)
    const lastPage = () => setPage(users.total_pages)
    
    const prevPage = () => setPage(prevPage => Math.max(prevPage - 1, 1))
    const nextPage = () => setPage(prevPage => prevPage + 1)

    const pagesArray = Array(users.total_pages).fill().map((_, index) => index + 1)

    const content = users.data.map(user => <User key={user.id} user={user} />)

    const nav = (
        <nav className="nav-ex2">
            <button onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
            <button onClick={prevPage} disabled={isPreviousData || page === 1}>&lt;</button>
            {/**'isPreviousData' provides a smoother user experience by ensuring that the user always sees complete and up-to-date data before they can navigate to a different page. */}
            {pagesArray.map(pg => <PageButton key={pg} pg={pg} setPage={setPage} />)}
            <button onClick={nextPage} disabled={isPreviousData || page === users.total_pages}>&gt;</button>
            <button onClick={lastPage} disabled={isPreviousData || page === users.total_pages}>&gt;&gt;</button>
        </nav>
    )

    return (
        <div className='wrapper'>
            {nav}
            {isFetching && <span className="loading">Loading...</span>}
            {content}
        </div>
    )
}
export default UserListPaginated