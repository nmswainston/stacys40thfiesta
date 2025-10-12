import React from "react";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /**
   * If true, uses lazy loading (good for images below the fold)
   * Default: true
   */
  lazy?: boolean;
  /**
   * Sizes attribute for responsive images
   * Example: "(max-width: 768px) 100vw, 50vw"
   */
  sizes?: string;
  className?: string;
}

/**
 * Responsive image component with WEBP support and lazy loading
 * 
 * Usage:
 * 1. Convert JPEGs to WEBP at multiple sizes:
 *    - Mobile: ~480px width
 *    - Tablet: ~768px width  
 *    - Desktop: ~1200px width
 * 
 * 2. Name them with suffixes:
 *    - original.jpg
 *    - original-480w.webp
 *    - original-768w.webp
 *    - original-1200w.webp
 */
export default function ResponsiveImage({ 
  src, 
  alt, 
  lazy = true,
  sizes,
  className = "",
  ...props 
}: ResponsiveImageProps) {
  // Extract the file path without extension
  const pathWithoutExt = src.replace(/\.(jpg|jpeg|png)$/i, '');
  
  // Check if WEBP versions exist (fallback to original if not)
  const hasWebp = true; // Assume WEBP versions will be created
  
  // Generate srcSet for different sizes
  const webpSrcSet = `${pathWithoutExt}-480w.webp 480w, ${pathWithoutExt}-768w.webp 768w, ${pathWithoutExt}-1200w.webp 1200w`;
  const jpgSrcSet = `${pathWithoutExt}-480w.jpg 480w, ${pathWithoutExt}-768w.jpg 768w, ${pathWithoutExt}-1200w.jpg 1200w`;
  
  return (
    <picture>
      {/* WEBP sources for modern browsers */}
      {hasWebp && (
        <source 
          type="image/webp" 
          srcSet={webpSrcSet}
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
      )}
      
      {/* JPEG fallback for older browsers */}
      <source 
        type="image/jpeg" 
        srcSet={jpgSrcSet}
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      />
      
      {/* Fallback img tag */}
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding={lazy ? "async" : "auto"}
        className={className}
        {...props}
      />
    </picture>
  );
}

