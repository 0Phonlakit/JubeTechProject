import { useState, useEffect } from "react";
import { Tabs, Tab, Box, CircularProgress, Typography, Button } from "@mui/material";
import { FaPlay, FaRegClock, FaRegStar, FaSearch, FaFilter, FaSort } from "react-icons/fa";
import { CategoryProvider } from "../contexts/CategoryContext";
import Topbar from "../components/Landing/Topbar";
import "../assets/css/pages/my-courses.css";
import TestImage from "../assets/img/landing/course-test.png";

interface BaseCourse {
  id: number;
  thumbnail: string;
  title: string;
  instructor: string;
  slug: string;
}

interface EnrolledCourse extends BaseCourse {
  progress: number;
  lastAccessed: string;
  totalHours: number;
  completedHours: number;
}

interface WishlistCourse extends BaseCourse {
  price: number;
  rating: number;
  totalStudents: number;
}

interface ArchivedCourse extends BaseCourse {
  progress: number;
  completedDate: string;
  totalHours: number;
  completedHours: number;
}

// Mock data - would be replaced with API calls
const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 1,
    thumbnail: TestImage,
    title: "Node.js 2025 - การพัฒนาเว็บแอปพลิเคชันด้วย Node.js แบบมืออาชีพ",
    instructor: "อาจารย์ สมชาย ใจดี",
    progress: 35,
    lastAccessed: "2025-03-25T14:30:00",
    totalHours: 42,
    completedHours: 14.7,
    slug: "nodejs-2025-professional-web-development"
  },
  {
    id: 2,
    thumbnail: TestImage,
    title: "React & Redux - การพัฒนา Single Page Application แบบมืออาชีพ",
    instructor: "อาจารย์ มานี มีเงิน",
    progress: 68,
    lastAccessed: "2025-03-28T09:15:00",
    totalHours: 38,
    completedHours: 25.8,
    slug: "react-redux-professional-spa-development"
  },
  {
    id: 3,
    thumbnail: TestImage,
    title: "การพัฒนาเว็บไซต์ด้วย HTML, CSS และ JavaScript สำหรับผู้เริ่มต้น",
    instructor: "อาจารย์ สมศรี มีสุข",
    progress: 100,
    lastAccessed: "2025-03-10T16:45:00",
    totalHours: 24,
    completedHours: 24,
    slug: "html-css-javascript-for-beginners"
  },
  {
    id: 4,
    thumbnail: TestImage,
    title: "การพัฒนา Mobile Application ด้วย React Native",
    instructor: "อาจารย์ สมหมาย ใจดี",
    progress: 12,
    lastAccessed: "2025-03-29T11:20:00",
    totalHours: 36,
    completedHours: 4.3,
    slug: "react-native-mobile-application-development"
  }
];

const mockWishlistCourses: WishlistCourse[] = [
  {
    id: 5,
    thumbnail: TestImage,
    title: "การพัฒนา Microservices ด้วย Node.js และ Docker",
    instructor: "อาจารย์ สมชาย ใจดี",
    price: 1999,
    rating: 4.8,
    totalStudents: 945,
    slug: "microservices-nodejs-docker"
  },
  {
    id: 6,
    thumbnail: TestImage,
    title: "การพัฒนาเว็บแอปพลิเคชันด้วย MERN Stack",
    instructor: "อาจารย์ มานี มีเงิน",
    price: 1699,
    rating: 4.5,
    totalStudents: 1545,
    slug: "mern-stack-web-application-development"
  }
];

const mockArchivedCourses: ArchivedCourse[] = [
  {
    id: 7,
    thumbnail: TestImage,
    title: "การพัฒนา Progressive Web Application (PWA)",
    instructor: "อาจารย์ สมศรี มีสุข",
    progress: 100,
    completedDate: "2025-02-15T00:00:00",
    totalHours: 32,
    completedHours: 32,
    slug: "progressive-web-application-development"
  }
];

type CourseType = EnrolledCourse | WishlistCourse | ArchivedCourse;

const MyCourses = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(mockEnrolledCourses);
  const [sortOption, setSortOption] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let coursesToFilter: CourseType[] = [];
      
      switch(tabValue) {
        case 0:
          coursesToFilter = [...mockEnrolledCourses];
          break;
        case 1:
          coursesToFilter = [...mockWishlistCourses];
          break;
        case 2:
          coursesToFilter = [...mockArchivedCourses];
          break;
        default:
          coursesToFilter = [...mockEnrolledCourses];
      }
      
      if (searchTerm) {
        coursesToFilter = coursesToFilter.filter(course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Sort courses
      if (sortOption === "recent") {
        if (tabValue === 0) {
          // Only sort enrolled courses by lastAccessed
          const enrolledCourses = coursesToFilter as EnrolledCourse[];
          enrolledCourses.sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime());
        }
      } else if (sortOption === "title") {
        coursesToFilter.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === "progress") {
        if (tabValue === 0 || tabValue === 2) {
          // Only sort enrolled or archived courses by progress
          const progressCourses = coursesToFilter as (EnrolledCourse | ArchivedCourse)[];
          progressCourses.sort((a, b) => b.progress - a.progress);
        }
      }
      
      setFilteredCourses(coursesToFilter);
      setLoading(false);
    }, 300);
  }, [tabValue, searchTerm, sortOption]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h} ชั่วโมง ${m > 0 ? `${m} นาที` : ''}`;
  };

  const isEnrolledCourse = (course: CourseType): course is EnrolledCourse => {
    return 'lastAccessed' in course && 'progress' in course;
  };

  const isWishlistCourse = (course: CourseType): course is WishlistCourse => {
    return 'price' in course && 'rating' in course;
  };

  const isArchivedCourse = (course: CourseType): course is ArchivedCourse => {
    return 'completedDate' in course && 'progress' in course;
  };

  return (
    <div className="my-courses-page">
      <CategoryProvider>
        <Topbar
          modalStatus={showModal}
          setShowModal={setShowModal}
          setTypeModal={() => {}}
        />
      </CategoryProvider>
      
      <div className="my-courses-header">
        <div className="container">
          <h1>คอร์สเรียนของฉัน</h1>
          <p>จัดการและติดตามความก้าวหน้าในการเรียนรู้ของคุณ</p>
        </div>
      </div>
      
      <div className="container">
        <div className="my-courses-content">
          <div className="search-and-filter">
            <div className="search-input">
              <FaSearch />
              <input
                type="text"
                placeholder="ค้นหาคอร์สเรียนของคุณ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-options">
              <div className="filter-button" onClick={() => setShowFilters(!showFilters)}>
                <FaFilter />
                <span>ตัวกรอง</span>
              </div>
              
              <div className="sort-button">
                <FaSort />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="recent">เข้าชมล่าสุด</option>
                  <option value="title">ชื่อ A-Z</option>
                  <option value="progress">ความคืบหน้า</option>
                </select>
              </div>
            </div>
          </div>
          
          <Box sx={{ width: '100%', marginTop: '20px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="my courses tabs"
                sx={{
                  '& .MuiTab-root': { 
                    fontWeight: 600,
                    fontSize: '16px',
                    textTransform: 'none',
                    color: '#555',
                    '&.Mui-selected': {
                      color: 'var(--purple-logo-primary)',
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'var(--purple-logo-primary)',
                  }
                }}
              >
                <Tab label={`กำลังเรียน (${mockEnrolledCourses.length})`} />
                <Tab label={`รายการโปรด (${mockWishlistCourses.length})`} />
                <Tab label={`คอร์สที่เรียนจบแล้ว (${mockArchivedCourses.length})`} />
              </Tabs>
            </Box>
            
            {loading ? (
              <div className="loading-container">
                <CircularProgress sx={{ color: 'var(--purple-logo-primary)' }} />
              </div>
            ) : (
              <div className="courses-grid">
                {filteredCourses.length === 0 ? (
                  <div className="no-courses">
                    <Typography variant="h6" sx={{ marginTop: '30px', color: '#555' }}>
                      ไม่พบคอร์สเรียนที่ตรงกับการค้นหาของคุณ
                    </Typography>
                  </div>
                ) : (
                  <>
                    {tabValue === 0 && (
                      <div className="enrolled-courses">
                        {filteredCourses.map((course) => {
                          if (isEnrolledCourse(course)) {
                            return (
                              <div className="course-card" key={course.id}>
                                <div className="course-image">
                                  <img src={course.thumbnail} alt={course.title} />
                                  <div className="course-overlay">
                                    <button className="play-button">
                                      <FaPlay />
                                      <span>เริ่มเรียนต่อ</span>
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="course-details">
                                  <h3 className="course-title">
                                    <a href={`/course/${course.slug}`}>{course.title}</a>
                                  </h3>
                                  <p className="course-instructor">{course.instructor}</p>
                                  
                                  <div className="course-progress">
                                    <div className="progress-bar">
                                      <div 
                                        className="progress-fill" 
                                        style={{ width: `${course.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="progress-text">{course.progress}% เสร็จสิ้น</span>
                                  </div>
                                  
                                  <div className="course-meta">
                                    <div className="last-accessed">
                                      <FaRegClock />
                                      <span>เข้าชมล่าสุด: {formatDate(course.lastAccessed)}</span>
                                    </div>
                                    <div className="time-spent">
                                      <span>{formatTime(course.completedHours)} / {formatTime(course.totalHours)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                    
                    {tabValue === 1 && (
                      <div className="wishlist-courses">
                        {filteredCourses.map((course) => {
                          if (isWishlistCourse(course)) {
                            return (
                              <div className="course-card" key={course.id}>
                                <div className="course-image">
                                  <img src={course.thumbnail} alt={course.title} />
                                  <div className="course-overlay">
                                    <a href={`/course/${course.slug}`} className="view-button">
                                      ดูรายละเอียด
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="course-details">
                                  <h3 className="course-title">
                                    <a href={`/course/${course.slug}`}>{course.title}</a>
                                  </h3>
                                  <p className="course-instructor">{course.instructor}</p>
                                  
                                  <div className="course-meta">
                                    <div className="course-rating">
                                      <FaRegStar />
                                      <span>{course.rating} ({course.totalStudents} คน)</span>
                                    </div>
                                    <div className="course-price">
                                      <span>฿{course.price.toLocaleString()}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="course-actions">
                                    <Button 
                                      variant="contained"
                                      sx={{
                                        backgroundColor: 'var(--purple-logo-primary)',
                                        '&:hover': {
                                          backgroundColor: '#a529d2',
                                        }
                                      }}
                                    >
                                      ซื้อคอร์สเรียน
                                    </Button>
                                    <Button 
                                      variant="outlined"
                                      sx={{
                                        color: '#555',
                                        borderColor: '#ccc',
                                        '&:hover': {
                                          borderColor: '#999',
                                          backgroundColor: '#f5f5f5',
                                        }
                                      }}
                                    >
                                      ลบออกจากรายการโปรด
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                    
                    {tabValue === 2 && (
                      <div className="archived-courses">
                        {filteredCourses.map((course) => {
                          if (isArchivedCourse(course)) {
                            return (
                              <div className="course-card" key={course.id}>
                                <div className="course-image">
                                  <img src={course.thumbnail} alt={course.title} />
                                  <div className="course-overlay">
                                    <button className="play-button">
                                      <FaPlay />
                                      <span>ทบทวนคอร์สเรียน</span>
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="course-details">
                                  <h3 className="course-title">
                                    <a href={`/course/${course.slug}`}>{course.title}</a>
                                  </h3>
                                  <p className="course-instructor">{course.instructor}</p>
                                  
                                  <div className="course-progress">
                                    <div className="progress-bar">
                                      <div 
                                        className="progress-fill completed" 
                                        style={{ width: '100%' }}
                                      ></div>
                                    </div>
                                    <span className="progress-text">เรียนจบแล้ว</span>
                                  </div>
                                  
                                  <div className="course-meta">
                                    <div className="completion-date">
                                      <span>เรียนจบเมื่อ: {formatDate(course.completedDate)}</span>
                                    </div>
                                    <div className="time-spent">
                                      <span>{formatTime(course.totalHours)}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="course-actions">
                                    <Button 
                                      variant="outlined"
                                      sx={{
                                        color: 'var(--purple-logo-primary)',
                                        borderColor: 'var(--purple-logo-primary)',
                                        '&:hover': {
                                          borderColor: '#a529d2',
                                          backgroundColor: 'rgba(165, 41, 210, 0.05)',
                                        }
                                      }}
                                    >
                                      ขอใบรับรอง
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
