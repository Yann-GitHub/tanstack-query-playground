import postService from '../../services/postApi'
import { useInfiniteQuery } from "@tanstack/react-query"
import Post from '../../components/Post'

const PostListManual = () => {

    const {
        status,
        error,
        data,
        isFetchingNextPage, // boolean, loading state to determine if we are loading our data
        hasNextPage, // boolean determine if we have another page, return true if getNextPageParam return value other than undefined
        fetchNextPage, // function call when you want more data
      } = useInfiniteQuery({
        queryKey: ['posts', 'manual'],
        queryFn: ({ pageParam = 1 }) => postService.getPostsPage(pageParam), // function responsible for fetching data
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length ? allPages.length + 1 : undefined;
          // it receives the data from the last page fetched and all the pages fetched
          // function called after each fetch, return pageParam for the next page or undefined
          // the value is used as the pageParam in the next call to queryFn

          // Jsonplaceholder doesn't provide a nextPage field in the responses
        },
      })
    
    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>

    // console.log(data)

    return (
      <div className='wrapper'>
      <h1>Post List - Infinite manual fetching</h1>
      <div className='post-wrapper'>
        {data && data.pages
          .flatMap(pageData => pageData) // Flatten the array of pages into a single array of posts
          .map(post => (
            <Post key={post.id} post={post} /> // Render each post
        ))}
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
    )
}

export default PostListManual