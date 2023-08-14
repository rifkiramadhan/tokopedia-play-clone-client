import React, { useState } from 'react';
import './CommentForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && username.trim()) {
      onCommentSubmit(username, comment);
      setComment('');
      setUsername('');
    }
  };
  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Nama Kamu'
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Tulis Komentarmu Di Sini...'
        required
      />
      <button type='submit'>
        <FontAwesomeIcon icon={faPaperPlane} /> Kirim
      </button>
    </form>
  );
};

export default CommentForm;
