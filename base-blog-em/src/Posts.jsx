import { useState } from "react";
// useQuery 훅은 서버에서 데이터를 가져올 때 사용
import {useQuery} from "react-query";
import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // useQuery argument: queryKey, queryFunction
  const {data, isError, isLoading} = useQuery("posts", fetchPosts, {staleTime: 10000});
  if(isLoading) return <h3>Loading...</h3>
  // 리액트 쿼리는 세 번 시도한 후에 fail을 결정한다
  if(isError) return <h3>Oops, something went wrong</h3>

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
