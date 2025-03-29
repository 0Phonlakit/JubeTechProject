import { useState, useEffect } from "react";
import { Button, Typography, IconButton, Divider, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import { FaTrash, FaArrowLeft, FaShoppingCart, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CategoryProvider } from "../contexts/CategoryContext";
import Topbar from "../components/Landing/Topbar";
import TestImage from "../assets/img/landing/course-test.png";
import "../assets/css/pages/cart.css";


interface CartCourse {
  id: number;
  thumbnail: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  isSelected: boolean;
  slug: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockCartItems: CartCourse[] = [
        {
          id: 1,
          thumbnail: TestImage,
          title: "Node.js 2025 - การพัฒนาเว็บแอปพลิเคชันด้วย Node.js แบบมืออาชีพ",
          instructor: "อาจารย์ สมชาย ใจดี",
          price: 1099,
          originalPrice: 1299,
          discount: 15,
          isSelected: true,
          slug: "nodejs-2025-professional-web-development"
        },
        {
          id: 2,
          thumbnail: TestImage,
          title: "React & Redux - การพัฒนา Single Page Application แบบมืออาชีพ",
          instructor: "อาจารย์ มานี มีเงิน",
          price: 1299,
          originalPrice: 1499,
          discount: 13,
          isSelected: true,
          slug: "react-redux-professional-spa-development"
        },
        {
          id: 3,
          thumbnail: TestImage,
          title: "การพัฒนา Mobile Application ด้วย React Native",
          instructor: "อาจารย์ สมหมาย ใจดี",
          price: 1399,
          originalPrice: 1599,
          discount: 12,
          isSelected: true,
          slug: "react-native-mobile-application-development"
        }
      ];
      setCartItems(mockCartItems);
      setLoading(false);
    }, 800);
  }, []);

  const handleToggleSelect = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
    updateSelectAllStatus();
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(prevItems =>
      prevItems.map(item => ({ ...item, isSelected: newSelectAll }))
    );
  };

  const updateSelectAllStatus = () => {
    const allSelected = cartItems.every(item => item.isSelected);
    setSelectAll(allSelected);
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.isSelected)
      .reduce((total, item) => total + item.price, 0);
  };

  const calculateSavings = () => {
    return cartItems
      .filter(item => item.isSelected && item.originalPrice)
      .reduce((total, item) => total + ((item.originalPrice || 0) - item.price), 0);
  };

  const selectedItemsCount = cartItems.filter(item => item.isSelected).length;

  return (
    <CategoryProvider>
      <div className="cart-page">
        <Topbar
          modalStatus={showModal}
          setShowModal={setShowModal}
          setTypeModal={() => {}}
        />
        
        <div className="cart-header">
          <div className="container">
            <h1>ตะกร้าสินค้า</h1>
            <p>รายการคอร์สเรียนที่คุณเลือกไว้</p>
          </div>
        </div>
        
        <div className="cart-content container">
          <div className="back-to-courses">
            <Link to="/courses" className="back-link">
              <FaArrowLeft /> กลับไปเลือกคอร์สเรียนเพิ่มเติม
            </Link>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <CircularProgress style={{ color: "#a906f5" }} />
            </div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <FaShoppingCart />
              </div>
              <Typography variant="h5" className="empty-cart-title">ตะกร้าของคุณว่างเปล่า</Typography>
              <Typography variant="body1" className="empty-cart-message">
                ดูเหมือนว่าคุณยังไม่ได้เพิ่มคอร์สเรียนใดๆ ลงในตะกร้า
              </Typography>
              <Button 
                variant="contained" 
                component={Link} 
                to="/courses"
                className="browse-courses-btn"
              >
                เลือกดูคอร์สเรียน
              </Button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                <div className="cart-header-row">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAll}
                        color="secondary"
                        sx={{ 
                          color: "#a906f5",
                          '&.Mui-checked': {
                            color: "#a906f5",
                          },
                        }}
                      />
                    }
                    label={`เลือกทั้งหมด (${cartItems.length} คอร์ส)`}
                    className="select-all-label"
                  />
                </div>
                
                <Divider />
                
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-select">
                      <Checkbox
                        checked={item.isSelected}
                        onChange={() => handleToggleSelect(item.id)}
                        color="secondary"
                        sx={{ 
                          color: "#a906f5",
                          '&.Mui-checked': {
                            color: "#a906f5",
                          },
                        }}
                      />
                    </div>
                    <div className="item-thumbnail">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <Typography variant="h6" className="item-title">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" className="item-instructor">
                        โดย {item.instructor}
                      </Typography>
                      {item.discount && (
                        <div className="discount-badge">
                          <FaTag /> ลด {item.discount}%
                        </div>
                      )}
                    </div>
                    <div className="item-price">
                      <Typography variant="h6" className="current-price">
                        ฿{item.price.toLocaleString()}
                      </Typography>
                      {item.originalPrice && (
                        <Typography variant="body2" className="original-price">
                          ฿{item.originalPrice.toLocaleString()}
                        </Typography>
                      )}
                    </div>
                    <div className="item-actions">
                      <IconButton 
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-btn"
                        size="small"
                      >
                        <FaTrash />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-header">
                  <Typography variant="h6">สรุปคำสั่งซื้อ</Typography>
                </div>
                <div className="summary-content">
                  <div className="summary-row">
                    <span>คอร์สเรียนที่เลือก ({selectedItemsCount})</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  {calculateSavings() > 0 && (
                    <div className="summary-row savings">
                      <span>ส่วนลด</span>
                      <span>-฿{calculateSavings().toLocaleString()}</span>
                    </div>
                  )}
                  <Divider className="summary-divider" />
                  <div className="summary-row total">
                    <span>ยอดรวมทั้งสิ้น</span>
                    <span>฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  <Button 
                    variant="contained"
                    fullWidth 
                    className="checkout-btn"
                    disabled={selectedItemsCount === 0}
                    sx={{
                      backgroundColor: "#a906f5",
                      '&:hover': {
                        backgroundColor: "#8205c0",
                      },
                      '&.Mui-disabled': {
                        backgroundColor: "#e0e0e0",
                        color: "#a0a0a0"
                      }
                    }}
                  >
                    ชำระเงิน
                  </Button>
                  <div className="payment-methods">
                    <Typography variant="body2">วิธีการชำระเงิน:</Typography>
                    <div className="payment-icons">
                      <span>บัตรเครดิต/เดบิต</span>
                      <span>โอนเงิน</span>
                      <span>พร้อมเพย์</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CategoryProvider>
  );
};

export default CartPage;
