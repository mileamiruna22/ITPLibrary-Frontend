import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './BookDetails.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { useBookDetails } from '../hooks/useBookDetails';
import { Loading } from '../components/Loading';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthProvider';
import { useNotification } from '../hooks/useNotification';
import { Notification } from '../components/Notification';

export const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { book, isLoading, error } = useBookDetails(id);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const { notification, showNotification, closeNotification } = useNotification();

  if (isLoading) {
    return <Loading />;
  }

  if (error && !book) {
    return <div>Error {error.message}</div>;
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (book) {
      addToCart({
        ...book, 


        thumbnail: book.image,
        imageSrc: book.image,
        imageAlt: book.imageAlt,
        description: book.longDescription,
        priceDisplay: `${book.price} $`,

        popular: false,
        recentlyAdded: false,
      });

      showNotification(
        'success',
        'Added to cart!',
        `"${book.title}" has been added to your cart.`
      );
    }
  };

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
          <div className={styles.titlePriceRow}>
            <h1 className={styles.detailTitle}>{book?.title}</h1>
            <span className={styles.detailPrice}>{`${book?.price} $`}</span>
          </div>
          <p className={styles.detailAuthor}>
            by <span className={styles.authorName}>{book?.author}</span>
          </p>

          <p className={styles.detailDescription}>{book?.longDescription}</p>

          <Button  variant="primary" onClick={handleAddToCart}>
            🛒 Add to cart
          </Button>
        </div>
      </section>

      <Notification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
      />
    </main>
  );
};
