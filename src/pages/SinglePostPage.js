import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Container } from '../Container';
import { Comments } from '../features/comments/Comments';
import {
  fetchSinglePost,
  selectSinglePost,
  selectSinglePostStatus,
} from '../features/posts/posts.slice';
import parse from 'html-react-parser';

const SinglePostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectSinglePost);
  const singlePostStatus = useSelector(selectSinglePostStatus);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);
  if (singlePostStatus !== 'fulfilled' && !post) {
    return <Container>loading</Container>;
  } else {
    const { host } = post.url ? new URL(post.url) : { host: null };
    return (
      <div>
        <Container>
          <div className="w-2xl max-w-2xl">
            <div className="mb-8">
              <div>{post.by}</div>
              <a className="text-xl" href={post.url} target="_blank" rel="noreferrer">
                {post.title}
              </a>{' '}
              {post.text ? <p>{parse(post.text)}</p> : null}
              <small className="text-blue-900 dark:text-blue-400 hover:underline">
                {host && (
                  <a href={post.url} target="_blank" rel="noreferrer">
                    ({host})
                  </a>
                )}
              </small>
            </div>
          </div>
          <Comments postId={id} />
        </Container>
      </div>
    );
  }
};

export default SinglePostPage;
