import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import "../../assets/css/components/cart-dropdown.css";
import TestImage from "../../assets/img/landing/course-test.png";

interface CartItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  thumbnail: string;
  slug: string;
}

const CartDropdown = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        title: "Node.js 2025 - การพัฒนาเว็บแอปพลิเคชันด้วย Node.js แบบมืออาชีพ",
        instructor: "อาจารย์ สมชาย ใจดี",
        price: 1099,
        thumbnail: TestImage,
        slug: "nodejs-2025-professional-web-development"
      },
      {
        id: 2,
        title: "React & Redux - การพัฒนา Single Page Application แบบมืออาชีพ",
        instructor: "อาจารย์ มานี มีเงิน",
        price: 1299,
        thumbnail: TestImage,
        slug: "react-redux-professional-spa-development"
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-dropdown-container">
      <div 
        className="cart-icon-wrapper"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <FaShoppingCart />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>

      {isOpen && (
        <div 
          className="cart-dropdown" 
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="cart-dropdown-header">
            <h3>ตะกร้าสินค้า ({cartItems.length})</h3>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>ตะกร้าของคุณว่างเปล่า</p>
              <Link to="/courses" onClick={() => setIsOpen(false)}>
                เลือกดูคอร์สเรียน
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items-container">
                {cartItems.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-thumbnail">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">
                        <Link to={`/courses/${item.slug}`} onClick={() => setIsOpen(false)}>
                          {item.title}
                        </Link>
                      </h4>
                      <p className="cart-item-instructor">โดย {item.instructor}</p>
                      <p className="cart-item-price">฿{item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-dropdown-footer">
                <div className="cart-total">
                  <span>ยอดรวม:</span>
                  <span>฿{calculateTotal().toLocaleString()}</span>
                </div>
                <Link 
                  to="/cart" 
                  className="checkout-btn"
                  onClick={() => setIsOpen(false)}
                >
                  ไปที่ตะกร้าสินค้า
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
