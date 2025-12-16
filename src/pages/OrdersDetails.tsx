import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from '../styles/components/OrdersDetails.module.scss';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';

export const OrderDetails: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCart();
  const { addOrder } = useOrders();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    billingCountry: 'Romania',
    billingAddress: '',
    billingPhone: '',
    useBillingForDelivery: true,

    deliveryCountry: 'Romania',
    deliveryAddress: '',
    deliveryPhone: '',
    paymentType: 'online',
    deliveryDate: '',
    observations: '',
    recommend: false,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    const val =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder(formData, cartItems, totalPrice);
    console.log('Final Order Data:', formData);
    alert('Order placed successfully!');
    navigate('/orders');
  };

  if (!isLoggedIn) return null;

  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={styles.orderDetailsSection}>
        <div className={styles.orderDetailsImage}>
          <img
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
            alt="Order Details"
          />
        </div>

        <div className={styles.orderDetailsFormContainer}>
          <h1 className={styles.formTitle}>Order Details</h1>

          <form onSubmit={handleSubmit}>
            <h3 className={styles.formSubsectionTitle}>Contact Details</h3>
            <div className={styles.formGroupInline}>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={styles.formInput}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={styles.formInput}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h3 className={styles.formSubsectionTitle}>Billing Address</h3>
            <div className={styles.formGroup}>
              <div>
                <select
                  name="billingCountry"
                  className={styles.formInput}
                  value={formData.billingCountry}
                  onChange={handleChange}
                >
                  <option value="">Country Selection</option>
                  <option value="Romania">Romania</option>
                  <option value="USA">USA</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  name="billingAddress"
                  placeholder="Address"
                  className={styles.formInput}
                  value={formData.billingAddress}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="billingPhone"
                  placeholder="Phone Number"
                  className={styles.formInput}
                  value={formData.billingPhone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroupCheckbox}>
                <label>
                  <input
                    type="checkbox"
                    name="useBillingForDelivery"
                    checked={formData.useBillingForDelivery}
                    onChange={handleChange}
                  />
                  Use address for delivery
                </label>
              </div>
            </div>

            {!formData.useBillingForDelivery && (
              <>
                <h3 className={styles.formSubsectionTitle}>Delivery Address</h3>
                <div className={styles.formGroup}>
                  <div>
                    <select
                      name="deliveryCountry"
                      className={styles.formInput}
                      value={formData.deliveryCountry}
                      onChange={handleChange}
                    >
                      <option value="">Country Selection</option>
                      <option value="Romania">Romania</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="deliveryAddress"
                      placeholder="Address"
                      className={styles.formInput}
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="deliveryPhone"
                      placeholder="Phone Number"
                      className={styles.formInput}
                      value={formData.deliveryPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <h3 className={styles.formSubsectionTitle}>Payment Type</h3>
            <div className={styles.formGroupRadio}>
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="online"
                  checked={formData.paymentType === 'online'}
                  onChange={handleChange}
                />
                Online
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="cash"
                  checked={formData.paymentType === 'cash'}
                  onChange={handleChange}
                />
                Cash
              </label>
            </div>

            <h3 className={styles.formSubsectionTitle}>Delivery Date</h3>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="deliveryDate"
                placeholder="Delivery Date"
                className={styles.formInput}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                value={formData.deliveryDate}
                onChange={handleChange}
              />
            </div>

            <h3 className={styles.formSubsectionTitle}>Observations</h3>
            <div className={styles.formGroup}>
              <textarea
                name="observations"
                placeholder="Observations"
                className={styles.formInput}
                style={{
                  minHeight: '100px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
                value={formData.observations}
                onChange={handleChange}
              />
            </div>

            <h3 className={styles.formSubsectionTitle}>
              Would You Recommend Us?
            </h3>
            <div className={styles.formGroupCheckbox}>
              <label>
                <input
                  type="checkbox"
                  name="recommend"
                  checked={formData.recommend}
                  onChange={handleChange}
                />
                Would you recommend us?
              </label>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() => navigate('/cart')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
