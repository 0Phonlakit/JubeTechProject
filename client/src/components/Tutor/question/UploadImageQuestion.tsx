import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    style: {
        width: "100%",
        height: "100%"
    },
    customRequest({ onSuccess }) {
        onSuccess && onSuccess("ok");
    },
    onChange(info) {
        const { status } = info.file;
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onRemove(file) {
        console.log("remove");
    }
};

export default function UploadImageQuestion() {
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: "purple" }} />
            </p>
            <p className="ant-upload-text" style={{ fontSize: "0.95rem" }}>Click or drag image of question (optional)</p>
            <p className="ant-upload-hint">
                Allow image file, maximum size 2MB
            </p>
        </Dragger>
    );
}