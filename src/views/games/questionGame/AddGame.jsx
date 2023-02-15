import CIcon from '@coreui/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { CButton, CCol, CContainer, CFormCheck, CFormInput, CRow } from '@coreui/react';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { addQuestionGame } from 'src/store/Slices/questionGame';
import { useAppDispatch } from '../../../store';
const Games = () => {
  const { register, reset, control, getValues, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      question: "",
      images: []
    }
  });
  const languages=useMemo(()=>(['ru','en']),[]); 
  const loading = useSelector((state) => state.questionGame.loading);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    const data = getValues();
    const {question_ru, question_en, ...rest}=data;
    const question_cont=languages.map((lang)=>({ "language":lang,  "question": lang==='ru'?question_ru:question_en,}))
    dispatch(addQuestionGame({
      ...rest,
      category: 1,
      question:question_cont
    }));
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            {languages.map((language,ind)=><Controller
            key={ind}
              control={control}
              name={`question_${language}`}
              rules={{
                required: {
                  value: true,
                  message: "Պարտադիր է"
                },
              }}
              render={({ field }) => (
                <CFormInput
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type="text"
                  placeholder={`Write question ${language}`}
                  error={!!errors.question?.message}
                // helperText={errors.username?.message}
                />
              )}
            />)}
            <Controller
              control={control}
              name='isPremium'
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
              name='visible'
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
            <CButton color="info mt-3" disabled={loading} onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Games;
