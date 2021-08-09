import React from "react";
import "./container.css";

type Props = {
    children: React.ReactNode
}

const Container = ({ children }: Props) => 
    <div className="wrapper"> 
        { children }
    </div>

export default Container;