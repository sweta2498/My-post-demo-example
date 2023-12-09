import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllComment, setPost, setScrollPost } from '../Reduc/ActionCreator';
import { CircularProgress, Grid} from '@mui/material';
import axios from 'axios';
import Single_post from './Single_post';

const Home = () => {

  const dispatch = useDispatch()
  const post = useSelector((state) => state?.Post);
  const postscroll = useSelector((state) => state?.Scroll);
  const planRef = useRef(null);
  const [loader, setloader] = useState(true)

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      dispatch(setScrollPost(post.id))
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (planRef.current) {
      observer.observe(planRef.current);
    }
  }, [])

  useEffect(() => {
    getData();
  }, [])

  // useEffect(() => {
  //   // const scrollToMe = document.getElementById("scroll");
  //   // scrollToMe.scrollIntoView({ behavior: "smooth" });
  //   const plan = document.getElementById(postscroll);
  //   setTimeout(
  //     () => plan?.scrollIntoView({ behavior: "smooth", block: "center" }),
  //     800
  //   );
  // }, [])

  async function getData() {
    const responce = await axios.get('/post');
    if (responce) setloader(false)
    // console.log(responce.data);
    dispatch(setPost(responce.data));
    getComment()
  }

  async function getComment() {
    const responce = await axios.get('/comment');
    // dispatch(setAllComment(responce.data));
    dispatch(setAllComment(responce.data));
  }

  return (
    <div>
      {
        loader ? <CircularProgress sx={{ mt: 20 }} size={70} /> :
          <Grid container direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }} spacing={2} columns={{ xs: 1, sm: 6, md: 12 }}>
            {
              post?.map((item, i) => {
                return (
                  <>
                    <Single_post item={item} />
                  </>
                )
              })
            }
          </Grid>
      }
    </div>
  )
}

export default Home