import { useState } from "react";

import styles from "./AddCategoryPopup.module.css";
function AddCategoryPopup({ onClose, onAddCategory }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryImageName, setCategoryImageName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newCategory = { categoryTitle, categoryImageName };

    onAddCategory(newCategory);
    setCategoryTitle("");
    setCategoryImageName("");
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="title">Category Title:</label>

            <input
              type="text"
              placeholder="Title"
              id="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className={styles.titlefield}
            />
          </div>
          <div className={styles.image} htmlFor="image">
            <label>Category Image:</label>
            <input
              type="text"
              placeholder="Image"
              value={categoryImageName}
              onChange={(e) => setCategoryImageName(e.target.value)}
              className={styles.imagefield}
              required
            />
          </div>

          <button type="submit" className={styles.addcategory}>
            + Add Category
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCategoryPopup;
