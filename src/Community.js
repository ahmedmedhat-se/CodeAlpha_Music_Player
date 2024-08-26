import React, { useState } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      setPosts([...posts, { content: newPost, id: Date.now() }]);
      setNewPost('');
    }
  };

  const handleEditPost = (index) => {
    setEditIndex(index);
    setEditContent(posts[index].content);
  };

  const handleUpdatePost = () => {
    const updatedPosts = posts.map((post, index) =>
      index === editIndex ? { ...post, content: editContent } : post
    );
    setPosts(updatedPosts);
    setEditIndex(null);
    setEditContent('');
  };

  const handleDeletePost = (index) => {
    const filteredPosts = posts.filter((_, i) => i !== index);
    setPosts(filteredPosts);
    setEditIndex(null);
  };

  const handleAddComment = (postId) => {
    if (newComment[postId]?.trim() !== '') {
      setComments({
        ...comments,
        [postId]: [...(comments[postId] || []), newComment[postId]]
      });
      setNewComment({ ...newComment, [postId]: '' });
    }
  };

  const handleShareLink = (post) => {
    const link = `${window.location.origin}/posts/${post.id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="community-container">
      <h1>Community Posts</h1>
      <div className="add-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>

      {posts.map((post, index) => (
        <div key={post.id} className="post">
          {editIndex === index ? (
            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={handleUpdatePost}>Update</button>
              <button onClick={() => setEditIndex(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{post.content}</p>
              <button onClick={() => handleEditPost(index)}>Edit</button>
              <button onClick={() => handleDeletePost(index)}>Delete</button>
              <button onClick={() => handleShareLink(post)}>Share</button>
              <div className="comments">
                <h4>Comments:</h4>
                <div>
                  <textarea
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                    placeholder="Add a comment"
                  />
                  <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
                </div>
                <ul>
                  {(comments[post.id] || []).map((comment, i) => (
                    <li key={i}>{comment}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Community;
