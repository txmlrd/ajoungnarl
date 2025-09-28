import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import PropTypes from "prop-types";

// jangan lupa import css di root (App.js atau index.js):
// import "quill/dist/quill.snow.css";

const QuillEditor = forwardRef(
  ({ readOnly = false, defaultValue, onTextChange, onSelectionChange, placeholder = "Tulis sesuatu..." }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      // bikin div editor
      const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      ref.current = quill;

      // kalau ada defaultValue, isi
      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on("text-change", (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on("selection-change", (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref, placeholder]);

    return <div ref={containerRef} />;
  }
);

QuillEditor.displayName = "QuillEditor";

QuillEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.object,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default QuillEditor;
