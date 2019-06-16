import React, { Component } from 'react';
import api from '../../services/api';
import {IProps,IState,IPost} from './interface';

import './feed.css';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';
import io from 'socket.io-client';



class Feed extends Component<IProps,IState> {
  state:IState = { feed: [] } 

    async componentDidMount() {
        
        const response = await api.get('/api/post/all');
       
      //  this.state.feed = [...response.data];
         this.setState({ feed: response.data.payload});
        
         this.registerToSocket();

    }

    handleLike = async (id:string) => {
      console.log(id);
      await api.post(`/api/post/${id}/like`)
    }

    registerToSocket = () => {
      const socket = io('http://localhost:3333');

      socket.on('post', (newPost:IPost) => {

        console.log(newPost);
        this.setState(  { feed: [newPost, ...this.state.feed]   } )
      });


      socket.on('like', (likedPost:IPost) => {

        console.log(likedPost);
        this.setState(  { feed: this.state.feed.map(post => 
          post._id === likedPost._id ? likedPost : post
          )  
        });
      });
    }

    render() {

        return (


          <section id="post-list">

            { this.state.feed.map(post => (

              <article key={post._id}>
              <header>
                <div className="user-info">
                  <span> {post.author} </span>
                  <span className="place"> {post.place}</span>
                </div>
                <img src={more} alt="mais" />

              </header>

              <img src={`http://localhost:3333/files/${post.image}`}  alt="" />
              <footer>
                <div className="actions">
                  <button type="button" onClick={() => this.handleLike(post._id)}>
                    <img src={like} alt="" />
                  </button>
                  <img src={comment} alt="" />
                  <img src={send} alt="" />
                </div>
                <strong>{post.likes} curtidas</strong>

                <p>
                    {post.description}
                  <span>{post.hashtags}</span>
                </p>
              </footer>

            </article>


            )
              )}
              

          </section>

        );
    }
}

export default Feed;