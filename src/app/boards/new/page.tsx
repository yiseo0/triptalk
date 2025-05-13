'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import styles from './styles.module.css';

const CREATE_BOARD = gql`
   mutation createBoard($createBoardInput: CreateBoardInput!) {
      createBoard(createBoardInput: $createBoardInput) {
         _id
      }
   }
`;

export default function NewBoardPage() {
   const router = useRouter();
   const [formData, setFormData] = useState({
      writer: '',
      password: '',
      title: '',
      contents: '',
   });
   const [createBoard] = useMutation(CREATE_BOARD);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // TODO: API 연동 로직 추가
      try {
         const result = await createBoard({
            variables: {
               createBoardInput: {
                  ...formData
               }
            }
         });

         router.push(`/boards/${result.data.createBoard._id}`);

      } catch (error) {
         console.error('Error creating board:', error);
      }
   };

   const handlePostcodeSearch = () => {
      // TODO: 우편번호 검색 API 연동
   };

   return (
      <div className={styles.container}>
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
               <label className={styles.label}>
                  작성자<span className={styles.required}>*</span>
               </label>
               <input
                  className={styles.input}
                  type="text"
                  name="writer"
                  value={formData.writer}
                  onChange={handleChange}
                  placeholder="작성자 명을 입력해 주세요."
                  required
               />
            </div>

            <div className={styles.inputWrapper}>
               <label className={styles.label}>
                  비밀번호<span className={styles.required}>*</span>
               </label>
               <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력해 주세요."
                  required
               />
            </div>

            <div className={styles.inputWrapper}>
               <label className={styles.label}>
                  제목<span className={styles.required}>*</span>
               </label>
               <input
                  className={styles.input}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="제목을 입력해 주세요."
                  required
               />
            </div>

            <div className={styles.inputWrapper}>
               <label className={styles.label}>
                  내용<span className={styles.required}>*</span>
               </label>
               <textarea
                  className={styles.textarea}
                  name="contents"
                  value={formData.contents}
                  onChange={handleChange}
                  placeholder="내용을 입력해 주세요."
                  required
               />
            </div>

            <div className={styles.inputWrapper}>
               <label className={styles.label}>주소</label>
               <div className={styles.addressWrapper}>
                  <input
                     className={`${styles.input} ${styles.addressInput}`}
                     type="text"
                     name="postcode"
                     value={formData.postcode}
                     placeholder="우편번호"
                     readOnly
                  />
                  <button
                     type="button"
                     className={styles.searchButton}
                     onClick={handlePostcodeSearch}
                  >
                     우편번호 검색
                  </button>
               </div>
               <input
                  className={styles.input}
                  type="text"
                  name="address"
                  value={formData.address}
                  placeholder="주소를 입력해 주세요."
                  readOnly
               />
               <input
                  className={styles.input}
                  type="text"
                  name="detailAddress"
                  value={formData.detailAddress}
                  onChange={handleChange}
                  placeholder="상세주소를 입력해 주세요."
               />
            </div>

            <div className={styles.inputWrapper}>
               <label className={styles.label}>링크</label>
               <div className={styles.imageUploadArea}>
                  <div className={styles.imageUploadBox}>
                     <span>+</span>
                     <span>갤러리에서 사진 업로드</span>
                  </div>
                  <div className={styles.imageUploadBox}>
                     <span>+</span>
                     <span>갤러리에서 사진 업로드</span>
                  </div>
                  <div className={styles.imageUploadBox}>
                     <span>+</span>
                     <span>갤러리에서 사진 업로드</span>
                  </div>
               </div>
            </div>

            <div className={styles.buttonGroup}>
               <button type="button" className={styles.cancelButton} onClick={() => router.back()}>
                  취소
               </button>
               <button type="submit" className={styles.submitButton}>
                  등록
               </button>
            </div>
         </form>
      </div>
   );
} 