import { useRef, useState } from "react";
import { Button, Modal, Tabs } from "antd";
import QuillEditor from "../components/QuillEditor";
import "quill/dist/quill.snow.css"; // biar preview styled kaya editor

const EditorWithPreview = () => {
  const quillRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState("");

  const handleSave = () => {
    if (quillRef.current) {
      const html = quillRef.current.root.innerHTML; // ambil HTML dari Quill
      setHtmlPreview(html);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <QuillEditor ref={quillRef} />

      <Button type="primary" onClick={handleSave} style={{ marginTop: 16 }}>
        Simpan
      </Button>

      <Modal
        title="Preview Konten"
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Tutup
          </Button>,
        ]}
        width={800}
      >
        <Tabs defaultActiveKey="rendered">
          <Tabs.TabPane tab="Rendered" key="rendered">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="HTML" key="html">
            <pre
              style={{
                background: "#f7f7f7",
                padding: "12px",
                borderRadius: "6px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {htmlPreview}
            </pre>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default EditorWithPreview;
