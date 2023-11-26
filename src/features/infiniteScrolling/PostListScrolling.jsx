import { useRef, useCallback } from 'react'
import Post2 from '../../components/Post2'
import { useInfiniteQuery } from "@tanstack/react-query"
import postService from '../../services/postInfiniteApi'

const PostListScrolling = () => {

    const {
        fetchNextPage, // function call when you want more data
        hasNextPage, // boolean determine if we have another page, return true if getNextPageParam return value other than undefined
        isFetchingNextPage, // boolean, loading state to determine if we are loading our data
        data,
        status,
        error
    } = useInfiniteQuery({
        queryKey: ['posts', 'infinite'],
        queryFn: ({ pageParam = 1 }) => postService.getPostsPage(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
            // it receives the data from the last page fetched and all the pages fetched
            // function called after each fetch, return pageParam for the next page or undefined
            // the value is used as the pageParam in the next call to queryFn
        }
    })

    const intObserver = useRef() // une référence créée pour stocker l'intersectionObserver


    // useCallback() est utilisé car la fonction doit être passée a des éléments enfants via les props
    // Les composants enfants qui reçoivent cette fonction en prop ne se rerenderont pas à moins que les dépendances de cette fonction ne changent
    const lastPostRef = useCallback(post => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()
        // .current est proposé par useRef pour accéder ou modifier la valeur de la référence
        // .disconnect() est une methode proposer par intersectionObserver pour deconnecter et arrêter la surveillance des éléments
        // Avant de créer un nouvel observateur pour surveiller un nouvel élément, on vérifie si un observateur existe déjà.
        // Cela peut être nécessaire pour éviter les éventuelles interférences entre les anciens et nouveaux éléments observés

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                fetchNextPage()
            }
        })
        // assigne un nouvel objet intersectionObserver à la référence intObserver
        // reagit lorsque le premier élément observé devient visible dans la fenêtre 'isIntersecting === true'
        // et s'il reste des pages à charger 'hasNextPage === true'
        // Lorsque ces conditions sont remplies, il déclenche l'appel à fetchNextPage() pour charger la page suivante de contenu.

        if (post) intObserver.current.observe(post)
        // Une précaution pour s'assurer que l'IntersectionObserver observe un élément valide
        // Si post est une référence valide à un élément DOM

    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    if (status === 'error') return <p className='center'>Error: {error.message}</p>


    // Without using methode flatMap()
    const content = data?.pages.map(pg => {
        return pg.map((post, i) => {
            if (pg.length === i + 1) {
                return <Post2 ref={lastPostRef} key={post.id} post={post} />
                // si il s'agit du dernier élément de la liste on joint lastPostRef avec l'intersectionObserver
            }
            return <Post2 key={post.id} post={post} />
        })
    })

    console.log(data)

    return (
        <div className='wrapper'>
            <h1>Post List - Infinite scrolling (Query)</h1>
            {content}
            {isFetchingNextPage && <p className="center">Loading More Posts...</p>}
            <p className="center"><a href="#top">Back to Top</a></p>
        </div>
    )
}
export default PostListScrolling