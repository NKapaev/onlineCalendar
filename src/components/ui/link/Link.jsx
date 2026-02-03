import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./link.css";

const requireProp = (prop, propName) => {
  if (!prop) {
    console.error(`${propName} is required`);
  }
};

export default function Link({
  href,
  className = "",
  disabled = false,
  children,
  ...props
}) {
  requireProp(href, "href");
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={href}
        className={`link ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <RouterLink
      to={href}
      className={`link ${className} ${disabled ? "disabled" : ""}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
