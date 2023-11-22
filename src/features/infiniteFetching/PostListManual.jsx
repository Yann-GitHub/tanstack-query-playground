import postService from '../../services/postApi'
import { useInfiniteQuery } from "@tanstack/react-query"

import Post from '../../components/Post'

const PostListManual = () => {

    // const {
    //     status,
    //     error,
    //     data,
    //     isFetchingNextPage,
    //     hasNextPage,
    //     fetchNextPage,
    //   } = useInfiniteQuery({
    //     queryKey: ["posts", "infinite"],
    //     getNextPageParam: prevData => prevData.nextPage,
    //     queryFn: ({ pageParam = 1 }) => postService.getPostsPage(pageParam),
    //   })

    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
      } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => postService.getPostsPage(pageParam),
        getNextPageParam: (lastPage, allPages) => {
          // If the last page is not full, there are no more pages
          if (lastPage.length < 4) return false;
      
          // Otherwise, the next page number is the current number of pages plus one
          return allPages.length + 1;
        },
      })
    
    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>

    console.log(data)
    if (data) {
  console.log(data.pages[0]); // Check the structure of the first page of data
}

    return (
        <>
      <h1>Post List Infinite</h1>
      <div className='post-wrapper'>
      {data && data.pages
  .flatMap(pageData => pageData) // Flatten the array of pages into a single array of posts
  .map(post => (
    <Post key={post.id} post={post} />
    // <div key={post.id}>{post.title}</div> // Render each post
))}

      </div>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
      {/* {data.pages
        .flatMap(data => data.posts)
        .map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )} */}
    </>
    )
}

export default PostListManual