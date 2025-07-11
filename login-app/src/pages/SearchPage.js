import React from 'react';

function SearchPage() {
  const backgroundImageUrl = '/pexels.jpg';
  const username = localStorage.getItem('username') || 'User'; // 👈 get username from localStorage

  const wrapperStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const topSectionStyle = {
    flex: 3,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const blurredBackgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(6px)',
    zIndex: 1,
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '600px',
    padding: '2rem',
    color: 'white',
  };

  const taglineStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  };

  const actionBarWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  };

  const inputStyle = {
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '0.6rem 1rem',
    fontSize: '1.1rem',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const bottomSectionStyle = {
    flex: 1,
    backgroundColor: 'white',
  };

  return (
    <div style={wrapperStyle}>
      <div style={topSectionStyle}>
        <div style={blurredBackgroundStyle}></div>
        <div style={contentWrapperStyle}>
          <p style={taglineStyle}>
            Hey {username}! Dream Big, It is just a few steps away
          </p>
          <div style={actionBarWrapperStyle}>
            <input
              type="text"
              placeholder="Search job postings..."
              style={inputStyle}
            />
            <button style={buttonStyle}>🔍</button>
            <button style={buttonStyle}>Upload</button>
          </div>
        </div>
      </div>
      <div style={bottomSectionStyle}></div>
    </div>
  );
}

export default SearchPage;
