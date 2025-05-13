import { useState, useEffect, useReducer } from "react";
import { Rating, FormControlLabel, Radio, RadioGroup, CircularProgress, Pagination, Slider } from "@mui/material";
import { FaFilter, FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/pages/course-listing.css";
import TestImage from "../assets/img/landing/course-test.png";
import Topbar from "../components/Landing/Topbar";
import { CategoryProvider } from "../contexts/CategoryContext";
import { CourseProvider, useCourse, CourseCard } from "../contexts/CourseContext";
import { getImageUrl } from "../utils/imageUtils";

// const mockCourses = [
//   {
//     id: 1,
//     thumbnail: TestImage,
//     title: "Node.js 2025 - การพัฒนาเว็บแอปพลิเคชันด้วย Node.js แบบมืออาชีพ",
//     description: "เรียนรู้การพัฒนาเว็บแอปพลิเคชันด้วย Node.js ตั้งแต่พื้นฐานจนถึงขั้นสูง พร้อมทั้งการใช้งาน Express, MongoDB และ REST API",
//     price: 1299,
//     point: 100,
//     rating: 4.5,
//     instructor: "อาจารย์ สมชาย ใจดี",
//     student_enrolled: 1245,
//     duration: 42,
//     level: "intermediate",
//     slug: "nodejs-2025-professional-web-development"
//   },
//   {
//     id: 2,
//     thumbnail: TestImage,
//     title: "React & Redux - การพัฒนา Single Page Application แบบมืออาชีพ",
//     description: "เรียนรู้การพัฒนา Single Page Application ด้วย React และ Redux ตั้งแต่พื้นฐานจนถึงขั้นสูง",
//     price: 1499,
//     point: 150,
//     rating: 4.7,
//     instructor: "อาจารย์ มานี มีเงิน",
//     student_enrolled: 2145,
//     duration: 38,
//     level: "intermediate",
//     slug: "react-redux-professional-spa-development"
//   },
//   {
//     id: 3,
//     thumbnail: TestImage,
//     title: "การพัฒนาเว็บไซต์ด้วย HTML, CSS และ JavaScript สำหรับผู้เริ่มต้น",
//     description: "เรียนรู้พื้นฐานการพัฒนาเว็บไซต์ด้วย HTML, CSS และ JavaScript สำหรับผู้เริ่มต้น",
//     price: 799,
//     point: 80,
//     rating: 4.3,
//     instructor: "อาจารย์ สมศรี มีสุข",
//     student_enrolled: 3245,
//     duration: 24,
//     level: "beginner",
//     slug: "html-css-javascript-for-beginners"
//   },
//   {
//     id: 4,
//     thumbnail: TestImage,
//     title: "การพัฒนา Mobile Application ด้วย React Native",
//     description: "เรียนรู้การพัฒนา Mobile Application ด้วย React Native สำหรับ iOS และ Android",
//     price: 1599,
//     point: 160,
//     rating: 4.6,
//     instructor: "อาจารย์ สมหมาย ใจดี",
//     student_enrolled: 1845,
//     duration: 36,
//     level: "intermediate",
//     slug: "react-native-mobile-application-development"
//   },
//   {
//     id: 5,
//     thumbnail: TestImage,
//     title: "การพัฒนา Microservices ด้วย Node.js และ Docker",
//     description: "เรียนรู้การพัฒนา Microservices ด้วย Node.js และ Docker พร้อมทั้งการใช้งาน Kubernetes",
//     price: 1999,
//     point: 200,
//     rating: 4.8,
//     instructor: "อาจารย์ สมชาย ใจดี",
//     student_enrolled: 945,
//     duration: 48,
//     level: "expert",
//     slug: "microservices-nodejs-docker"
//   },
//   {
//     id: 6,
//     thumbnail: TestImage,
//     title: "การพัฒนาเว็บแอปพลิเคชันด้วย MERN Stack",
//     description: "เรียนรู้การพัฒนาเว็บแอปพลิเคชันด้วย MERN Stack (MongoDB, Express, React, Node.js)",
//     price: 1699,
//     point: 170,
//     rating: 4.5,
//     instructor: "อาจารย์ มานี มีเงิน",
//     student_enrolled: 1545,
//     duration: 45,
//     level: "intermediate",
//     slug: "mern-stack-web-application-development"
//   },
//   {
//     id: 7,
//     thumbnail: TestImage,
//     title: "การพัฒนา Progressive Web Application (PWA)",
//     description: "เรียนรู้การพัฒนา Progressive Web Application (PWA) ที่สามารถทำงานได้ทั้งบนเว็บและมือถือ",
//     price: 1399,
//     point: 140,
//     rating: 4.4,
//     instructor: "อาจารย์ สมศรี มีสุข",
//     student_enrolled: 1145,
//     duration: 32,
//     level: "intermediate",
//     slug: "progressive-web-application-development"
//   },
//   {
//     id: 8,
//     thumbnail: TestImage,
//     title: "การพัฒนา Backend ด้วย Python และ Django",
//     description: "เรียนรู้การพัฒนา Backend ด้วย Python และ Django Framework",
//     price: 1299,
//     point: 130,
//     rating: 4.3,
//     instructor: "อาจารย์ สมหมาย ใจดี",
//     student_enrolled: 1345,
//     duration: 36,
//     level: "intermediate",
//     slug: "python-django-backend-development"
//   }
// ];

// Define a type for our course data structure
type CourseItem = {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  point: number;
  rating: number;
  instructor: {
    firstname: string;
    lastname: string;
  };
  student_enrolled: number;
  duration: number;
  level: string;
  slug: string;
};

const CourseListingPageContent = () => {
  const [allCourses, setAllCourses] = useState<CourseItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    rating: 0,
    level: "",
    duration: "",
    priceRange: ""
  });
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const coursesPerPage = 8;
  // Fetch all courses from API when component mounts
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/course/all");
        console.log("response", response.data.data);
        setAllCourses(response.data.data);
        // setCourses(response.data.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดคอร์สเรียน:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Helper function to map API CourseCard to our local CourseItem type
  const mapApiCourseToLocalFormat = (course: any): CourseItem => ({
    _id: course._id, // Convert string ID to number or generate random ID
    thumbnail: course.thumbnail || TestImage,
    title: course.title,
    description: course.description,
    price: course.price,
    point: 0, // Default value since it might not exist in CourseCard
    rating: course.rating || 0,
    instructor: {
      firstname: course.instructor.firstname,
      lastname: course.instructor.lastname
    },
    student_enrolled: 0, // Default value since it might not exist in CourseCard
    duration: 0, // Default value since it might not exist in CourseCard
    level: course.level || 'beginner',
    slug: course.slug
  });


 

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filteredCourses = [...allCourses];

      if (searchTerm) {
        filteredCourses = filteredCourses.filter((course: any) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filters.rating > 0) {
        filteredCourses = filteredCourses.filter(course => course.rating >= filters.rating);
      }

      if (filters.level) {
        filteredCourses = filteredCourses.filter(course => course.level === filters.level);
      }

      if (filters.duration) {
        switch (filters.duration) {
          case "0-3":
            filteredCourses = filteredCourses.filter(course => course.duration <= 3);
            break;
          case "3-6":
            filteredCourses = filteredCourses.filter(course => course.duration > 3 && course.duration <= 6);
            break;
          case "6-17":
            filteredCourses = filteredCourses.filter(course => course.duration > 6 && course.duration <= 17);
            break;
          case "17+":
            filteredCourses = filteredCourses.filter(course => course.duration > 17);
            break;
        }
      }

      // Filter by price range using the slider values
      filteredCourses = filteredCourses.filter(
        course => course.price >= priceRange[0] && course.price <= priceRange[1]
      );

      setCourses(filteredCourses);
      setLoading(false);
    }, 500);
  }, [searchTerm, filters, priceRange, allCourses]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
    setPage(1);
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <CategoryProvider>
      <div className="course-listing-page">
        <Topbar
          modalStatus={showModal}
          setShowModal={setShowModal}
          setTypeModal={setTypeModal}
        />

        <div className="course-listing-header">
          <div className="container">
            <h1>คอร์สเรียนทั้งหมด</h1>
            <p>เรียนรู้ทักษะใหม่ๆ ด้านเทคโนโลยีกับคอร์สเรียนคุณภาพจาก JubeTech</p>
          </div>
        </div>

        <div className="course-listing-content container">
          <div className="search-bar">
            <div className="search-input">
              <FaSearch />
              <input
                type="text"
                placeholder="ค้นหาคอร์สเรียน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-button" onClick={toggleFilters}>
              <FaFilter /> ตัวกรอง {showFilters ? '▲' : '▼'}
            </button>
          </div>

          <div className={`filters-section ${showFilters ? 'show' : ''}`}>
            <div className="filter-group">
              <h3>ระดับคะแนน</h3>
              <div className="rating-filters">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <div key={rating} className="rating-filter-item">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange('rating', rating)}
                          size="small"
                        />
                      }
                      label={
                        <div className="rating-label">
                          <Rating value={rating} readOnly precision={0.5} size="small" />
                          <span>{rating} ขึ้นไป</span>
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>ระดับความยาก</h3>
              <RadioGroup
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
              >
                <FormControlLabel
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    fontFamily: 'Mitr, sans-serif !important'
                  }}
                  value="beginner" control={<Radio size="small" />} label="สำหรับผู้เริ่มต้น" />
                <FormControlLabel
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    fontFamily: 'Mitr, sans-serif !important'
                  }}
                  value="intermediate" control={<Radio size="small" />} label="ระดับกลาง" />
                <FormControlLabel
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    fontFamily: 'Mitr, sans-serif !important'
                  }}
                  value="expert" control={<Radio size="small" />} label="ระดับสูง" />
              </RadioGroup>
            </div>

            <div className="filter-group">
              <h3>ระยะเวลา</h3>
              <RadioGroup
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
              >
                <FormControlLabel value="0-3" control={<Radio size="small" />} label="0-3 ชั่วโมง" />
                <FormControlLabel value="3-6" control={<Radio size="small" />} label="3-6 ชั่วโมง" />
                <FormControlLabel value="6-17" control={<Radio size="small" />} label="6-17 ชั่วโมง" />
                <FormControlLabel value="17+" control={<Radio size="small" />} label="17+ ชั่วโมง" />
              </RadioGroup>
            </div>

            <div className="filter-group">
              <h3>ราคา</h3>
              <div className="price-slider-container">
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                  step={100}
                  marks={[
                    { value: 0, label: '฿0' },
                    { value: 500, label: '฿500' },
                    { value: 1000, label: '฿1000' },
                    { value: 1500, label: '฿1500' },
                    { value: 2000, label: '฿2000' }
                  ]}
                  sx={{
                    color: 'var(--purple-logo-primary)',
                    '& .MuiSlider-thumb': {
                      backgroundColor: 'var(--purple-logo-primary)',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: 'var(--purple-logo-primary)',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#e0e0e0',
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#bfbfbf',
                    },
                    '& .MuiSlider-markLabel': {
                      fontSize: '0.75rem',
                    }
                  }}
                />
                <div className="price-range-display">
                  <span>฿{priceRange[0]}</span>
                  <span>ถึง</span>
                  <span>฿{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <button
              className="reset-filters-button"
              onClick={() => {
                setFilters({
                  rating: 0,
                  level: "",
                  duration: "",
                  priceRange: ""
                });
                setPriceRange([0, 2000]);
              }}
            >
              รีเซ็ตตัวกรอง
            </button>
          </div>
          <div className="course-main-content">

            <div className="filters-sidebar">
              <div className="filter-group">
                <h3>ระดับคะแนน</h3>
                <div className="rating-filters">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <div key={rating} className="rating-filter-item">
                      <FormControlLabel
                        control={
                          <Radio
                            checked={filters.rating === rating}
                            onChange={() => handleFilterChange('rating', rating)}
                            size="small"
                          />
                        }
                        label={
                          <div className="rating-label">
                            <Rating value={rating} readOnly precision={0.5} size="small" />
                            <span>{rating} ขึ้นไป</span>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>ระดับความยาก</h3>
                <RadioGroup
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                >
                  <FormControlLabel value="beginner" control={<Radio size="small" />} label="สำหรับผู้เริ่มต้น" />
                  <FormControlLabel value="intermediate" control={<Radio size="small" />} label="ระดับกลาง" />
                  <FormControlLabel value="expert" control={<Radio size="small" />} label="ระดับสูง" />
                </RadioGroup>
              </div>

              <div className="filter-group">
                <h3>ระยะเวลา</h3>
                <RadioGroup
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <FormControlLabel value="0-3" control={<Radio size="small" />} label="0-3 ชั่วโมง" />
                  <FormControlLabel value="3-6" control={<Radio size="small" />} label="3-6 ชั่วโมง" />
                  <FormControlLabel value="6-17" control={<Radio size="small" />} label="6-17 ชั่วโมง" />
                  <FormControlLabel value="17+" control={<Radio size="small" />} label="17+ ชั่วโมง" />
                </RadioGroup>
              </div>

              <div className="filter-group">
                <h3>ราคา</h3>
                <div className="price-slider-container">
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={2000}
                    step={100}
                    marks={[
                      { value: 0, label: '฿0' },
                      { value: 500, label: '฿500' },
                      { value: 1000, label: '฿1000' },
                      { value: 1500, label: '฿1500' },
                      { value: 2000, label: '฿2000' }
                    ]}
                    sx={{
                      color: 'var(--purple-logo-primary)',
                      '& .MuiSlider-thumb': {
                        backgroundColor: 'var(--purple-logo-primary)',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: 'var(--purple-logo-primary)',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e0e0e0',
                      },
                      '& .MuiSlider-mark': {
                        backgroundColor: '#bfbfbf',
                      },
                      '& .MuiSlider-markLabel': {
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                  <div className="price-range-display">
                    <span>฿{priceRange[0]}</span>
                    <span>ถึง</span>
                    <span>฿{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <button
                className="reset-filters-button"
                onClick={() => {
                  setFilters({
                    rating: 0,
                    level: "",
                    duration: "",
                    priceRange: ""
                  });
                  setPriceRange([0, 2000]);
                }}
              >
                รีเซ็ตตัวกรอง
              </button>
            </div>
            <div className="course-results">
              <div className="results-header">
                <p>{courses.length} ผลลัพธ์</p>
                <div className="sort-dropdown">
                  <span>เรียงตาม: </span>
                  <select>
                    <option value="popularity">ความนิยมสูงสุด</option>
                    <option value="rating">คะแนนสูงสุด</option>
                    <option value="newest">ใหม่ล่าสุด</option>
                    <option value="price-low">ราคา: ต่ำไปสูง</option>
                    <option value="price-high">ราคา: สูงไปต่ำ</option>
                  </select>
                  <IoMdArrowDropdown />
                </div>
              </div>

              {loading ? (
                <div className="loading-container">
                  <CircularProgress />
                </div>
              ) : (
                <>
                  {currentCourses?.length === 0 ? (
                    <div className="no-results">
                      <p>ไม่พบคอร์สเรียนที่ตรงกับเงื่อนไขการค้นหา</p>
                    </div>
                  ) : (
                    <div className="course-grid">
                      {currentCourses?.map((course) => (
                        <Link to={`/courses/${course.slug}`} className="course-card-link" key={course._id}>
                          <div className="course-card">
                            <div className="course-thumbnail">
                              <img src={course.thumbnail} alt={course.title} />
                            </div>
                            <div className="course-info">
                              <h3 className="course-title">{course.title}</h3>
                              <p className="course-instructor">{course?.instructor?.firstname + " " + course?.instructor?.lastname}</p>
                              <div className="course-rating">
                                <span className="rating-value">{course.rating}</span>
                                <Rating value={course.rating} readOnly precision={0.5} size="small" />
                                <span className="student-count">({course.student_enrolled.toLocaleString()})</span>
                              </div>
                              <div className="course-meta">
                                <span className="course-level">
                                  {course.level === "beginner" && "สำหรับผู้เริ่มต้น"}
                                  {course.level === "intermediate" && "ระดับกลาง"}
                                  {course.level === "expert" && "ระดับสูง"}
                                </span>
                                <span className="course-duration">{course.duration} ชั่วโมง</span>
                              </div>
                              <div className="course-price">
                                {course.price > 0 ? (
                                  <span className="price">฿{course.price.toLocaleString()}</span>
                                ) : (
                                  <span className="free">เรียนฟรี</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="pagination-container">
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
};

const CourseListingPage = () => {
  return (
    <CourseProvider>
      <CourseListingPageContent />
    </CourseProvider>
  );
};

export default CourseListingPage;
