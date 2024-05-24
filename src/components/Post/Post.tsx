import { useEffect, useState } from "react";
import { getPostsList } from "../../service/posts";
import { Posts } from "../../entity/posts"
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import './post.css'
import Container from "@mui/material/Container";

export default function PostsComponent() {
    const [postList, setPostList] = useState<Posts[]>([]);
    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        try {
            let response = await getPostsList()
            setPostList(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <div className="postContainer">
            <h1>Loads Posts!!...</h1>
            {
                postList.map((post) => (
                    <div key={post.id} className="postcontent">
                        <Container>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <div className="post-icons">
                                <i className="fa fa-thumbs-up" style={{ fontSize: '25px' }} aria-hidden="true"></i> {post.reactions}
                            </div>
                        </Container>
                    </div>
                ))
            }

        </div >
    </>)
}