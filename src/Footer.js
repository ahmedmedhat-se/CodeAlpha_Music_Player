import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Footer = () => {
  return (
    <footer className="text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: '#0082ca', border: 'none' }}
            href="https://www.linkedin.com/in/ahmed-medhat-ramadan-4061b7263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank'
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>

          <a
            className="btn btn-primary btn-floating m-1"
            style={{ backgroundColor: '#333333', border: 'none' }}
            href="https://github.com/ahmedmedhat-se" target='_blank'
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
      </div>
      <div className="text-center p-3">
        © 2024 Copyright - <span>Ahmed Medhat</span>
      </div>
    </footer>
  );
};

export default Footer;
