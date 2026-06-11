import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';

async function enableAllOptionalContent(pdf) {
  try {
    const config = await pdf.getOptionalContentConfig();
    if (!config) return;

    const order = config.getOrder();
    if (order) {
      for (const id of order) {
        config.setVisibility(id, true);
      }
    }
  } catch {
    // Optional content is not available for every PDF.
  }
}

function LazyPage({ pageNumber, width, fileKey }) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(pageNumber === 1);
  const placeholderHeight = width ? Math.round(width * 1.414) : 640;

  useEffect(() => {
    if (shouldRender) return undefined;

    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center bg-white"
      style={{ minHeight: shouldRender ? undefined : placeholderHeight }}
    >
      {shouldRender && (
        <Page
          key={`${fileKey}-${pageNumber}`}
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={true}
          canvasBackground="#ffffff"
          loading={
            <div
              className="w-full bg-[#f4f4eb] animate-pulse"
              style={{ height: placeholderHeight }}
            />
          }
        />
      )}
    </div>
  );
}

export default function PdfPages({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setNumPages(null);
  }, [file]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const updateWidth = () => setWidth(node.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, [file]);

  const handleLoadSuccess = async (pdf) => {
    await enableAllOptionalContent(pdf);
    setNumPages(pdf.numPages);
  };

  return (
    <div ref={containerRef} className="w-full custom-pdf-container">
      <Document
        key={file}
        file={file}
        onLoadSuccess={handleLoadSuccess}
        loading={<p className="text-center mt-10 text-[#171717]/50 font-mono">Loading PDF...</p>}
        error={<p className="text-center mt-10 text-red-500 font-mono">Failed to load PDF ({file.slice(1)}).</p>}
        noData={<p className="text-center mt-10 text-[#171717]/50 font-mono">No PDF file specified.</p>}
      >
        {numPages && width
          ? Array.from({ length: numPages }, (_, index) => (
              <LazyPage
                key={`${file}-${index + 1}`}
                fileKey={file}
                pageNumber={index + 1}
                width={width}
              />
            ))
          : null}
      </Document>
    </div>
  );
}
