/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { HiReply } from 'react-icons/hi';
import PostForm from './newform';

const PostStream = ({ post }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState(null);

  const handleReplySubmit = (newReply) => {
    setReply(newReply);
    setReplyOpen(false);
  };


  return (
    <li className="media">
      <div className="media-content">
        <p className="is-size-5 has-text-weight-bold has-text-info">{post.title}</p>
        <p className="has-text-info">{post.author}</p>
        <p className="has-text-white">{post.questionText}</p>
        {reply && (
          <div className="ml-6">
            <p className="has-text-info">{reply.title}</p>
            <p className="has-text-info">{reply.author}</p>
            <p className="has-text-white">{reply.text}</p>
          </div>
        )}
        {!reply && (
          <>
            <button
              type="button"
              onClick={() => setReplyOpen(true)}
              className="button is-info is-small"
            >
              <HiReply />
              Reply
            </button>
            {replyOpen && (
              <div className="mt-2">
                <PostForm onSubmit={handleReplySubmit} />
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default PostStream;
