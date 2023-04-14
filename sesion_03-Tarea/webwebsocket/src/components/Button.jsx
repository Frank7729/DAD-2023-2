import React from "react";

const Button = ({ titulo, onClick, className }) => {
    return (
        <button className={className} onClick={onClick}>
            {titulo}
        </button>
    )
}

export default Button;