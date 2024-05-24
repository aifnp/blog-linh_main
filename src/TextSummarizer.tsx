import React, { useState, useRef, useEffect, FormEvent } from 'react';
import axios from 'axios';
import './TextSummarizer.css';

const TextSummarizer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const summarizerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSummary('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/summarize', { text });
      setSummary(response.data.summary);
      setLoading(false);
    } catch (err) {
      setError('Error summarizing text');
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    const summarizer = summarizerRef.current;
    if (!summarizer) return;

    const handleMouseDown = (e: MouseEvent) => {
      const offsetX = e.clientX - summarizer.getBoundingClientRect().left;
      const offsetY = e.clientY - summarizer.getBoundingClientRect().top;

      const handleMouseMove = (e: MouseEvent) => {
        summarizer.style.left = `${e.clientX - offsetX}px`;
        summarizer.style.top = `${e.clientY - offsetY}px`;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove);
      }, { once: true });
    };

    summarizer.addEventListener('mousedown', handleMouseDown);

    return () => {
      summarizer.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isVisible]);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)} className="toggle-button">
        {isVisible ? 'Close Summarizer' : 'Open Summarizer'}
      </button>
      {isVisible && (
        <div className="TextSummarizer" ref={summarizerRef}>
          <h1>Text Summarization</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              id="content"
              name="text"
              rows={10}
              cols={40}
              placeholder="Nhập đoạn văn bản tại đây..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea><br />
            <button type="submit" className="button">Summarize</button>
          </form>
          <div className="summary">
            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Đang xử lý...</p>
              </div>
            )}
            {summary && (
              <>
                <h2>Summary:</h2>
                <p>{summary}</p>
              </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
