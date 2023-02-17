import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CRow,
} from '@coreui/react';
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { addQuestionGame } from 'src/store/Slices/questionGame';
import { useAppDispatch } from '../../../store';

const Games = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      question: '',
      images: [],
    },
  });

  const filesInputRef = useRef();

  const languages = useMemo(() => (['ru', 'en']), []);
  const loading = useSelector((state) => state.questionGame.loading);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    if (filesInputRef.current.files.length === 3) {
      const data = getValues();
      const { question_ru, question_en, ...rest } = data;
      const question_cont = languages.map((lang) => ({ language: lang, question: lang === 'ru' ? question_ru : question_en }));
      dispatch(addQuestionGame({
        ...rest,
        category: 1,
        question: question_cont,
        images: filesInputRef.current.files,
      }));
    } else {
      toast.warn('Images count should be 3');
    }
  };
  return (
    <div className="question-game bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            {languages.map((language, ind) => (
              <Controller
                key={ind}
                control={control}
                name={`question_${language}`}
                rules={{
                  required: {
                    value: true,
                    message: 'Պարտադիր է',
                  },
                }}
                render={({ field }) => (
                  <CFormInput
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    type="text"
                    placeholder={`Write question ${language}`}
                    error={!!errors.question?.message}
                    className="mb-1"
                  />
                )}
              />
            ))}
            <Controller
              control={control}
              name="isPremium"
              render={({ field }) => (
                <CFormCheck
                  id="flexCheckDefault"
                  label="Is Premium"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  error={!!errors.isPremium?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="visible"
              render={({ field }) => (
                <CFormCheck
                  id="flexCheckDefault"
                  label="Visible"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  error={!!errors.visible?.message}
                />
              )}
            />
            {/* <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton> */}
            {/* <label className='question-game-files-input-label'>

            </label> */}
            <input multiple ref={filesInputRef} className="question-game-files-input" type="file" id="" />
            {/* <Controller
              control={control}
              name='images'
              rules={{
                required: {
                  value: true,
                  message: "Պարտադիր է"
                },
              }}
              render={({ field }) => (
                <CFormInput
                  onChange={(e) => {
                    const array = e?.target?.files;
                    // const files = [];
                    // for (let index = 0; index < array.length; index++) {
                    //   const element = array[index];
                    //   files.push(element);
                    // }
                    // console.log(files, 'filesfilesfiles');
                    // field.onChange(files);
                  }}
                  value={field.value}
                  type="file"
                  placeholder="Write question"
                  error={!!errors.images?.message}
                  multiple
                // helperText={errors.username?.message}
                />
              )}
            /> */}
            <CButton color="info mt-3 text-white" disabled={loading} onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Games;
