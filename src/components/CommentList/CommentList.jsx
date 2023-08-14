import React from 'react';
import './CommentList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CommentList = ({ comments }) => (
  <div className='comment-list'>
    {comments.map((comment, idx) => (
      <div key={idx} className='comment-item'>
        <strong>
          <FontAwesomeIcon icon={faUser} className='icon-user' />{' '}
          <span>{comment.username}</span>
        </strong>
        <p>{comment.comment}</p>
      </div>
    ))}
  </div>
);

export default CommentList;
