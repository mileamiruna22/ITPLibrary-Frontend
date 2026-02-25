import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './OrdersDetails.module.scss';
import formStyles from './Form.module.scss';
import { useAuth } from '../contexts/AuthProvider';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { Button } from '../components';
import { useNotification } from '../hooks/useNotification';
import { Notification } from '../components/Notification';

export const OrderDetails: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCart();
  const { addOrder, isPlacingOrder } = useOrders();
  const { notification, showNotification, closeNotification } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    billingCountry: 'Romania',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingPhone: '',
    useBillingForDelivery: true,
    deliveryCountry: 'Romania',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPostalCode: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addOrder({
        details: formData,
        items: cartItems,
        total: totalPrice,
      });

      showNotification('success', 'Success', 'Order placed successfully!');
      setTimeout(() => navigate('/orders'), 2000);
    } catch (error: any) {
      showNotification('error', 'Error', error.message || 'Failed to place order.');
    }
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
              <div className={formStyles.formGroup}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={formStyles.formGroup}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h3 className={styles.formSubsectionTitle}>Billing Address</h3>
            <div className={formStyles.formGroup}>
              <select name="billingCountry" value={formData.billingCountry} onChange={handleChange}>
                <option value="">Country Selection</option>
                <option value="Romania">Romania</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div className={formStyles.formGroup}>
              <input
                type="text"
                name="billingAddress"
                placeholder="Street Address"
                value={formData.billingAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <input
                type="text"
                name="billingCity"
                placeholder="City"
                value={formData.billingCity}
                onChange={handleChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <input
                type="text"
                name="billingState"
                placeholder="State / Județ"
                value={formData.billingState}
                onChange={handleChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <input
                type="text"
                name="billingPostalCode"
                placeholder="Postal Code"
                value={formData.billingPostalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className={formStyles.formGroup}>
              <input
                type="text"
                name="billingPhone"
                placeholder="Phone Number"
                value={formData.billingPhone}
                onChange={handleChange}
                required
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

            {!formData.useBillingForDelivery && (
              <>
                <h3 className={styles.formSubsectionTitle}>Delivery Address</h3>
                <div className={formStyles.formGroup}>
                  <select name="deliveryCountry" value={formData.deliveryCountry} onChange={handleChange}>
                    <option value="">Country Selection</option>
                    <option value="Romania">Romania</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className={formStyles.formGroup}>
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Street Address"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={formStyles.formGroup}>
                  <input
                    type="text"
                    name="deliveryCity"
                    placeholder="City"
                    value={formData.deliveryCity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={formStyles.formGroup}>
                  <input
                    type="text"
                    name="deliveryState"
                    placeholder="State / Județ"
                    value={formData.deliveryState}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={formStyles.formGroup}>
                  <input
                    type="text"
                    name="deliveryPostalCode"
                    placeholder="Postal Code"
                    value={formData.deliveryPostalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={formStyles.formGroup}>
                  <input
                    type="text"
                    name="deliveryPhone"
                    placeholder="Phone Number"
                    value={formData.deliveryPhone}
                    onChange={handleChange}
                  />
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

            <h3 className={styles.formSubsectionTitle}>Would You Recommend Us?</h3>
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
              <Button variant="outline" onClick={() => navigate('/cart')} disabled={isPlacingOrder}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isPlacingOrder}>
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </form>
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