import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from '../styles/components/BookDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useBookDetails } from '../hooks/useBookDetails';

export const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { book, isLoading, error } = useBookDetails(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && !book) {
    return <div>Error {error.message}</div>;
  }

  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={styles.bookDetailSection}>
        <div className={styles.detailImageContainer}>
          <img
            src={book?.image}
            alt={book?.imageAlt || 'Book Cover'}
            className={styles.detailBookCover}
          />
        </div>

        <div className={styles.detailInfoBlock} style={{ flexGrow: 1 }}>
          <h1 className={styles.detailTitle}>{book?.title}</h1>
          <span className={styles.detailPrice}>{`${book?.price} $`}</span>
          <p className={styles.detailAuthor}>
            by <span className={styles.authorName}>{book?.author}</span>
          </p>

          <p className={styles.detailDescription}>{book?.longDescription}</p>

          <button className={styles.detailBtn}>Add to cart</button>
        </div>
      </section>
    </main>
  );
};
