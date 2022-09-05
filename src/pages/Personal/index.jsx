import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../../components/Post';
import { fetchPersonalPosts } from '../../redux/slices/posts'

export const Personal = () => {
  const dispatch = useDispatch(); 
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPersonalPosts());
}, []);

  return (
    <Paper>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true}/>
            ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ),
          )}
        </Grid>
      </Grid>
      </Paper>
  );
};
