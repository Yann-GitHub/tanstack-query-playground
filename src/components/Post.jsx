const Post = ({ post }) => {
    return (
        <article className="articlePost">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="id-wrapper">
                <p>Post ID: {post.id}</p>
                <p>User ID: {post.userId}</p>
            </div>
            
        </article>
    )
}
export default Post