'use client';

import React from 'react';

/**
 * Generic section wrapper with a subtle scroll-triggered fade.
 * Uses IntersectionObserver via CSS animation rather than a JS library
 * to keep things lightweight and human-feeling.
 */
const Section = ({ children, id, className = '', style = {} }) => {
  return (
    <section
      id={id}
      className={className}
      style={{ position: 'relative', width: '100%', ...style }}
    >
      {children}
    </section>
  );
};

export default Section;
