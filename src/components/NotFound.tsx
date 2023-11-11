import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return(
        <div>
            <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, consequuntur consectetur iure non quidem, esse soluta pariatur voluptatum, rerum molestias fuga tempora laboriosam odit animi possimus eveniet quo recusandae itaque.</h2>
            <p>Go to the <Link to="/">Homepage</Link>.</p>
        </div>
    )
}