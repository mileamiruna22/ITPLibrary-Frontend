import React, { useRef, memo, useState, useEffect, useCallback } from 'react';
import type { Book } from '../types/Book';
import { BookCard } from './BookCard';
import styles from './BookSection.module.scss';

const CARD_WIDTH = 130;
const CARD_HEIGHT = 340;
const CARD_GAP = 20;
const CARD_STEP_X = CARD_WIDTH + CARD_GAP;
const CARD_STEP_Y = CARD_HEIGHT + CARD_GAP;
const OVERSCAN = 1;

type VirtualBookSectionProps = {
  title: string;
  books: Book[];
  className: 'booksOfMonth' | 'recentlyAdded';
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
};

const VirtualBookSection: React.FC<VirtualBookSectionProps> = ({
  title,
  books,
  className,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (!containerRef.current) return;
      setContainerSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const cardsPerRow = containerSize.width > 0
    ? Math.max(1, Math.floor((containerSize.width + CARD_GAP) / CARD_STEP_X))
    : 0;

  const totalRows = cardsPerRow > 0
    ? Math.ceil(books.length / cardsPerRow)
    : 0;

  const totalHeight = totalRows * CARD_STEP_Y - CARD_GAP;

  const visibleRowCount = containerSize.height > 0
    ? Math.ceil(containerSize.height / CARD_STEP_Y)
    : 0;

  const firstVisibleRow = Math.max(0, Math.floor(scrollTop / CARD_STEP_Y) - OVERSCAN);
  const lastVisibleRow = Math.min(totalRows - 1, firstVisibleRow + visibleRowCount + OVERSCAN);
  const firstVisibleIndex = firstVisibleRow * cardsPerRow;
  const lastVisibleIndex = Math.min(books.length - 1, (lastVisibleRow + 1) * cardsPerRow - 1);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setScrollTop(scrollTop);

    const isNearEnd = scrollTop + clientHeight >= scrollHeight - CARD_STEP_Y * 2;
    if (isNearEnd && hasMore && !isLoading) {
      onLoadMore?.();
    }
  }, [hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!books || books.length === 0) return null;

  return (
    <section className={styles[className]}>
      <h2>{title}</h2>

      <div ref={containerRef} className={styles.bookListWrapper}>
        <div style={{ height: totalHeight, position: 'relative' }}>
          {cardsPerRow > 0 && books.slice(firstVisibleIndex, lastVisibleIndex + 1).map((book, i) => {
            const actualIndex = firstVisibleIndex + i;
            const row = Math.floor(actualIndex / cardsPerRow);
            const col = actualIndex % cardsPerRow;

            return (
              <div
                key={book.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: CARD_WIDTH,
                  transform: `translateX(${col * CARD_STEP_X}px) translateY(${row * CARD_STEP_Y}px)`,
                  willChange: 'transform',
                }}
              >
                <BookCard book={book} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const MemoVirtualBookSection = memo(VirtualBookSection);