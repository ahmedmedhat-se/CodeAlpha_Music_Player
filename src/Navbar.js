import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark p-4">
                <Link className="navbar-brand" to="/"><span>Groove</span>Nexus</Link>

                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#my-items">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="my-items">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/music-player">Music Player</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/community">Community</Link>
                        </li>
                    </ul>
                </div>
            </nav><br /><br /><br /><br />
        </>
    )
}
export default Navbar;