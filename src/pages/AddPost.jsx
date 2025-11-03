import { useRef, useState } from "react";
import { Button, Modal, Tabs } from "antd";
import QuillEditor from "../components/QuillEditor";
import "quill/dist/quill.snow.css"; // biar preview styled kaya editor
import { useUserProfile } from "../hooks/useUserProfile";
import NotFound from "./404NotFound";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAlert } from "../context/AlertContext";
import { useNavigate } from "react-router-dom";


const EditorWithPreview = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { profile } = useUserProfile();
  const quillRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //data
  const [htmlPreview, setHtmlPreview] = useState("");
  const [title, setTitle] = useState("");
  const [postImage, setPostImage] = useState("");
  const [titleSlug, setTitleSlug] = useState("");

  const handleSave = async () => {
    if (quillRef.current) {
      const html = quillRef.current.root.innerHTML;
      const data = {
        author: profile.name,
        content: html,
        createdAt: new Date(),
        idAuthor: profile.id,
        image: postImage,
        readTime: Math.random * 10,
        tagIds: [],
        title: title,
        userSlug: profile.userSlug,
      };
      console.log("Post data to be saved:", data);
      try {
        console.log("Saving post with titleSlug:", titleSlug);
        const docRef = doc(db, "posts", titleSlug);
        await setDoc(docRef, data);
        showAlert("Post saved successfully!", "success");
        navigate(`/news/${titleSlug}`); // redirect to home or another page after saving
      } catch (err) {
        console.error("Error saving post:", err);
        showAlert("Error saving post. Please try again.", "error");
      }

      // setHtmlPreview(html);
      // setIsModalOpen(true);
    }
  };

  if (!profile) {
    return <NotFound />;
  }
  return (
    <div className="my-10">
      {/* title */}
      <div className="mb-4 ">
        <input
          type="text"
          className="w-full p-2 text-center text-5xl font-bold font-cormorant focus:outline-none focus:border-transparent"
          placeholder="Title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleSlug(
              e.target.value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
            );
          }}
        />
      </div>
      {/* rich text */}
      <div>
        <QuillEditor ref={quillRef} />
      </div>
      <div className="">
        <Button type="primary" onClick={handleSave} className="mt-4">
          Simpan
        </Button>
      </div>

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
            <div>Title : {title}</div>
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: htmlPreview }} />
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
