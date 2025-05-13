import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating, Button, Tabs, Tab, Box, CircularProgress } from "@mui/material";
import { FaPlay, FaRegClock, FaSignal, FaGlobe, FaRegCalendarAlt, FaRegFileAlt, FaInfinity, FaMobileAlt, FaTrophy } from "react-icons/fa";
import axios from 'axios'
import "../assets/css/pages/course-detail.css";
import TestImage from "../assets/img/landing/course-test.png";
import Topbar from "../components/Landing/Topbar";
import { CategoryProvider } from "../contexts/CategoryContext";
import { getImageUrl } from "../utils/imageUtils";



const CourseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(0);


  useEffect(() => {
    (async () => {
      await getCouseDetail(slug as string);
    })();
  }, [slug]);



  const getCouseDetail = (slug: string) => {
    axios.get(`http://localhost:8000/api/course/slug/${slug}`)
      .then((res) => {
        console.log("Response", res.data.data[0])
        setCourse(res.data.data[0])
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const AddCourseToCart = () => {
    if (!course) return;

    try {

      const cartItemsStr = localStorage.getItem('cartItems');
      let cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
      const existingItemIndex = cartItems.findIndex((item: any) => item._id === course._id);

      if (existingItemIndex >= 0) {
        alert('คอร์สนี้อยู่ในตะกร้าของคุณแล้ว');
        return;
      }
      const cartItem = {
        _id: course._id,
        title: course.title,
        instructor: `${course.instructor.firstname} ${course.instructor.lastname}`,
        price: course.price,
        thumbnail: getImageUrl(course.thumbnail),
        slug: course.slug
      };

      // เพิ่มคอร์สลงในตะกร้า
      cartItems.push(cartItem);

      // บันทึกข้อมูลตะกร้าลงใน localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // แจ้งเตือนผู้ใช้
      alert('เพิ่มคอร์สลงในตะกร้าเรียบร้อยแล้ว');

      // อัพเดทจำนวนสินค้าในตะกร้า (ถ้ามีการแสดงจำนวนสินค้าในตะกร้า)
      const cartCountEvent = new CustomEvent('cartUpdated');
      window.dispatchEvent(cartCountEvent);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มคอร์สลงในตะกร้า:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มคอร์สลงในตะกร้า');
    }
  }



  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>ไม่พบคอร์สเรียนที่คุณต้องการ</h2>
        <p>กรุณาตรวจสอบ URL หรือกลับไปที่หน้ารายการคอร์สเรียน</p>
      </div>
    );
  }

  return (
    <CategoryProvider>
      <div className="course-detail-page">
        <Topbar
          modalStatus={showModal}
          setShowModal={setShowModal}
          setTypeModal={setTypeModal}
        />

        <div className="course-header">
          <div className="container">
            <div className="course-header-content">
              <div className="course-info">
                <h1>{course.title}</h1>
                <p className="course-description">{course.description}</p>

                <div className="course-meta">
                  <div className="course-rating">
                    <span className="rating-value">{course.rating}</span>
                    <Rating value={course.rating} readOnly precision={0.5} size="small" />
                    <span className="student-count">({course.student_enrolled.toLocaleString()} นักเรียน)</span>
                  </div>

                  <div className="course-instructor">
                    <span>สร้างโดย </span>
                    <a href="#instructor">{course.instructor.name}</a>
                  </div>

                  <div className="course-details-meta">
                    <span><FaRegCalendarAlt /> อัพเดทล่าสุด {course.last_updated}</span>
                    <span><FaGlobe /> {course.language}</span>
                    <span>
                      <FaSignal />
                      {course.level === "beginner" && "สำหรับผู้เริ่มต้น"}
                      {course.level === "intermediate" && "ระดับกลาง"}
                      {course.level === "expert" && "ระดับสูง"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="course-content container">
          <div className="course-main">
            {/* Tabs Navigation */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="course detail tabs">
                <Tab label="ภาพรวม" id="tab-0" />
                <Tab label="เนื้อหาคอร์ส" id="tab-1" />
                <Tab label="ผู้สอน" id="tab-2" />
                <Tab label="รีวิว" id="tab-3" />
              </Tabs>
            </Box>
            <div role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0">
              {activeTab === 0 && (
                <div className="course-overview">
                  <div className="course-section">
                    <h2>สิ่งที่คุณจะได้เรียนรู้</h2>

                  </div>


                  <div className="course-section">
                    <h2>รายละเอียดคอร์ส</h2>
                    <div className="course-description-full">
                      {course.description}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1">
              {activeTab === 1 && (
                <div className="course-curriculum">
                  <h2>เนื้อหาคอร์ส</h2>
                  <div className="course-sections">
                    {course.section_ids.map((section: any, sectionIndex: number) => (
                      <div className="curriculum-section" key={sectionIndex}>
                        <div className="section-header">
                          <h3>{section.title}</h3>
                          <span>{section.lesson_ids.length} บทเรียน</span>
                        </div>
                        <div className="section-lectures">
                          {section?.lesson_ids?.map((lesson_id: any, lesson_idIndex: number) => (
                            <div className="lecture-item" key={lesson_idIndex}>
                              <div className="lecture-icon">
                                <FaPlay />
                              </div>
                              <div className="lecture-title">
                                {lesson_id.name}
                              </div>
                              <div className="lecture-duration">
                                {lesson_id.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>



            <div role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2">
              {activeTab === 2 && (
                <div className="course-instructor-tab" id="instructor">
                  <h2>ผู้สอน</h2>
                  <div className="instructor-profile">
                    {/* <div className="instructor-avatar">
                      
                    </div> */}
                    <div className="instructor-info">
                      <h3>{course.instructor.firstname} {course.instructor.lastname} </h3>

                    </div>
                  </div>
                </div>
              )}
            </div>




            <div role="tabpanel" hidden={activeTab !== 3} id="tabpanel-3">
              {activeTab === 3 && (
                <div className="course-reviews">
                  <h2>รีวิวจากผู้เรียน</h2>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <div className="rating-number">{course.rating}</div>
                      <div className="rating-stars">
                        <Rating value={course.rating} readOnly precision={0.5} size="large" />
                      </div>
                      <div className="rating-count">{course.student_enrolled} รีวิว</div>
                    </div>
                  </div>
                  <div className="no-reviews-message">
                    <p>ยังไม่มีรีวิวสำหรับคอร์สนี้</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="course-sidebar">
            <div className="course-card">
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.title} />
                <div className="play-overlay">
                  <FaPlay />
                </div>
              </div>
              <div className="course-card-content">
                <div className="course-price">
                  {course.price > 0 ? (
                    <span className="price">฿{course.price.toLocaleString()}</span>
                  ) : (
                    <span className="free">เรียนฟรี</span>
                  )}
                </div>

                <div className="course-actions">
                  <Button variant="contained"

                    onClick={() => {
                      AddCourseToCart()
                    }}
                    color="primary" fullWidth className="enroll-button">
                    ลงทะเบียนเรียน
                  </Button>
                  <Button variant="outlined" color="primary" fullWidth className="wishlist-button">
                    เพิ่มในรายการโปรด
                  </Button>
                </div>

                <div className="course-includes">
                  <h3>คอร์สนี้ประกอบด้วย:</h3>
                  <ul>
                    <li><FaRegClock /> {course.duration} ชั่วโมงของวิดีโอ</li>
                    {/* <li><FaRegFileAlt /> {course.sections.reduce((acc: number, section: any) => acc + section.lectures.length, 0)} บทเรียน</li> */}
                    <li><FaInfinity /> เข้าถึงตลอดชีพ</li>
                    <li><FaMobileAlt /> เข้าถึงได้ทุกอุปกรณ์</li>
                    <li><FaTrophy /> ใบประกาศนียบัตรเมื่อเรียนจบ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
};

export default CourseDetailPage;
