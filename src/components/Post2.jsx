import { forwardRef } from 'react'

// forwardRef est utilisé dans ce cas pour permettre au composant Post2 de recevoir une référence (ref) directement depuis son parent,
// sans l'intercepter ni la traiter avant de la transmettre à l'élément <article> rendu.
// Cela peut être très utile lorsque vous souhaitez contrôler ou manipuler cet élément directement depuis l'extérieur,
// par exemple pour gérer le focus, les mesures, ou d'autres interactions directes avec le DOM.

const Post2 = forwardRef(({ post }, ref) => {

    const postBody = (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Post ID: {post.id}</p>
        </>
    )

    const content = ref
        ? <article className='articlePost' ref={ref}>{postBody}</article>
        : <article className='articlePost0'>{postBody}</article>

    return content
})

Post2.displayName = 'Post2'; // React.forwardRef do not have a display name by default, so you need to set it manually.

export default Post2