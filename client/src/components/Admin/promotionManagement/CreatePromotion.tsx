import { useState, useEffect, FormEvent } from 'react';
import { Modal, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';

// Define the props for the component
interface CreatePromotionProps {
  onClose: () => void;
}

// Define the course type
interface Course {
  value: string;
  label: string;
}

// Define the course data type
interface CourseData {
  _id: string;
  title: string;
}


// Define the form data type
interface FormData {
  name: string;
  for_course: string;
  code: string;
  courses: string[];
  status: boolean;
  type: string;
  discount: number;
  min_purchase_amount: number;
  max_discount: number;
  condition_type: string;
  quantity_per_day: number;
  quantity: number;
  remark: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}

export default function CreatePromotion({ onClose }: CreatePromotionProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    for_course: '',
    code: '',
    courses: [],
    status: false,
    type: '',
    discount: 0,
    min_purchase_amount: 0,
    max_discount: 0,
    condition_type: '',
    quantity_per_day: 0,
    quantity: 0,
    remark: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
  });

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/getAllCourses`)
      .then((response) => response.json())
      .then((data: CourseData[]) => {
        setCourses(
          data.map((course) => ({
            value: course._id,
            label: course.title,
          }))
        );
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleChange = (
    input: | { name: string; value: string | boolean } | ReadonlyArray <{ value: string }>,
    action?: { name: string }
    ) => {
      if (!input) return;
    
      if (action?.name === "courses" && Array.isArray(input)) {
        setFormData((prevState) => ({
          ...prevState,
          courses: input.map((option) => option.value),
        }));
      } else if (!Array.isArray(input) && "name" in input) {
        setFormData((prevState) => ({
          ...prevState,
          [input.name]: input.value,
        }));
      }
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const missingFields = [];

      if (!formData.name) missingFields.push("Name");
      if (!formData.for_course) missingFields.push("For Course");
      if (!formData.code) missingFields.push("Code");
      if (formData.courses.length === 0) missingFields.push("Courses");
      if (!formData.type) missingFields.push("Type");
      if (!formData.discount) missingFields.push("Discount");
      if (!formData.min_purchase_amount) missingFields.push("Min Purchase Amount");
      if (!formData.max_discount) missingFields.push("Max Discount");
      if (!formData.condition_type) missingFields.push("Condition Type");
      if (!formData.quantity) missingFields.push("Quantity");
      if (!formData.start_date) missingFields.push("start_date");
      if (!formData.end_date) missingFields.push("end_date");

    if (missingFields.length > 0) {
        Swal.fire({
            icon: "warning",
            title: "Incomplete Form",
            text: "Please fill in all required fields.",
            confirmButtonText: "OK",
        });
        return;
    }

      if (formData.start_date && formData.end_date) {
        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);

        if (startDate > endDate) {
            Swal.fire({
                icon: "error",
                title: "Invalid Date Range",
                text: "Start date cannot be later than end date.",
                confirmButtonText: "OK",
            });
        return;
      }
    }

    const dataToSubmit = {
        name: formData.name,
        for_course: formData.for_course,
        code: formData.code,
        courses: formData.courses,
        status: formData.status,
        type: formData.type,
        discount: Number(formData.discount),
        min_purchase_amount: Number(formData.min_purchase_amount),
        max_discount: Number(formData.max_discount),
        condition_type: formData.condition_type,
        quantity_per_day: Number(formData.quantity_per_day),
        quantity: Number(formData.quantity),
        remark: formData.remark,
        start_date: formData.start_date,
        end_date: formData.end_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
      };

    fetch(`${import.meta.env.VITE_API_URL}/createPromotion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
    })
        .then((response) => response.json())
        .then(() => {
        Swal.fire({
            icon: "success",
            title: "Promotion Created",
            text: "Promotion created successfully!",
            confirmButtonText: "OK",
        }).then(() => {
            onClose();
            window.location.reload();
        });
        })
        .catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error creating promotion. Please try again later.",
            confirmButtonText: "OK",
        });
        console.error("Error creating promotion:", error);
        });
    };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Add Promotion</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '68vh', overflowY: 'auto' }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="name">
              <Form.Label>Promotion Name <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Promotion Name" />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="for_course">
              <Form.Label>For Course <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select name="for_course" 
                           value={formData.for_course} 
                           onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}>
                <option value=""  hidden>For Course </option>
                <option value="all">All</option>
                <option value="specific">Specific</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="code">
              <Form.Label>Promotion Code <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="text" 
                            name="code" 
                            value={formData.code} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Promo Code" />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} controlId="type">
                <Form.Label>Type <span style={{ color: "red" }}>*</span> </Form.Label>
                <Form.Select name="type" 
                             value={formData.type} 
                             onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}>
                <option value="" hidden>Select Type</option>
                <option value="amount">Amount</option>
                <option value="percent">Percent</option>
                </Form.Select>
            </Form.Group>
           </Row>

           <Row className="mb-3">
            <Form.Group controlId="courses">
              <Form.Label>Applicable Courses <span style={{ color: "red" }}>*</span> </Form.Label>
              <Select
                isMulti
                name="courses"
                options={courses}
                value={courses.filter((course) => formData.courses.includes(course.value))}
                onChange={(selectedOptions) => handleChange(selectedOptions, { name: 'courses' })}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="discount">
              <Form.Label>Discount <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="number" 
                            name="discount" 
                            value={formData.discount} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Discount" />
            </Form.Group>
            <Form.Group as={Col} controlId="min_purchase_amount">
              <Form.Label>Min Purchase Amount <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="number" 
                            name="min_purchase_amount" 
                            value={formData.min_purchase_amount} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Minimum Purchase" />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="max_discount">
              <Form.Label>Max Discount <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="number" 
                            name="max_discount" 
                            value={formData.max_discount} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })} 
                            placeholder="Enter Maximum Discount" />
            </Form.Group>
            <Form.Group as={Col} controlId="condition_type">
              <Form.Label>Condition Type <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Select name="condition_type" 
                           value={formData.condition_type} 
                           onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}>
                <option value="" hidden>Select Condition</option>
                <option value="Once">Once</option>
                <option value="Unlimited">Unlimited</option>
                <option value="LimitPerDay">Limit Per Day</option>
              </Form.Select>
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="quantity_per_day">
              <Form.Label>Quantity Per Day</Form.Label>
              <Form.Control type="number" 
                            name="quantity_per_day" 
                            value={formData.quantity_per_day} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Quantity Per Day" />
            </Form.Group>
            <Form.Group as={Col} controlId="quantity">
              <Form.Label>Quantity <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="number" 
                            name="quantity" 
                            value={formData.quantity} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Quantity" />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="start_date">
              <Form.Label>Start Date <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="date" 
                            name="start_date" 
                            value={formData.start_date} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            pattern="\d{2}/\d{2}/\d{4}" />
            </Form.Group>
            <Form.Group as={Col} controlId="end_date">
              <Form.Label>End Date <span style={{ color: "red" }}>*</span> </Form.Label>
              <Form.Control type="date" 
                            name="end_date" 
                            value={formData.end_date} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            pattern="\d{2}/\d{2}/\d{4}" />
            </Form.Group>
          </Row>
  
          <Row className="mb-3">
            <Form.Group controlId="remark">
              <Form.Label>Remark</Form.Label>
              <Form.Control as="textarea" rows={3} 
                            name="remark" 
                            value={formData.remark} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            placeholder="Enter Remark" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="start_time">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="time" 
                            name="start_time" 
                            value={formData.start_time} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            step="1" />
            </Form.Group>
            <Form.Group as={Col} controlId="end_time">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="time" 
                            name="end_time" 
                            value={formData.end_time} 
                            onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            step="1" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId='status'>
                <Form.Check
                type='checkbox'
                label='Active Promotion'
                name='status'
                checked={formData.status}
                onChange={(e) => {
                    setFormData((prevState) => ({
                        ...prevState,
                        status: e.target.checked,
                    }));
                }}
                />
            </Form.Group>
          </Row>
            
          <Stack>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </div>
  );
}