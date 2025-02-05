import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FaFileImage } from 'react-icons/fa6';

interface ButtonUploadProp {
    image: File | null,
    handleCourse: (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name:string) => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ButtonUpload({ handleCourse, image }:ButtonUploadProp) {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FaFileImage />}
            sx={{ backgroundColor: "#9308cf", width: "210px", fontFamily: "Mitr, sans-serif", color: "#FFFFFF !important", fontSize: "0.8rem !important" }}
        >
        อัพโหลดไฟล์คอร์สเรียน
        <VisuallyHiddenInput
            type="file"
            accept='image/*'
            onChange={(event) => handleCourse(event, "image")}
            required={image instanceof File ? false : true}
        />
        </Button>
    );
}