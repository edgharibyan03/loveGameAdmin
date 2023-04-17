import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CFormSelect, CRow,
} from '@coreui/react';
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { addQuestionGame } from 'src/store/Slices/questionGame';
import { toastAddBody } from 'src/utils/toast';
import { useAppDispatch } from '../../../store';

const Games = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      question: '',
      images: [],
      ispremium: false,
      visible: false,
    },
  });

  const filesInputRef = useRef();

  const languages = useMemo(() => (['ru', 'en', 'es', 'fr', 'jp', 'cn', 'kr']), []);
  const loading = useSelector((state) => state.questionGame.loading);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    if (filesInputRef.current.files.length === 3) {
      const data = getValues();
      const { ...rest } = data;
      const question_cont = languages.map((lang) => {
        return { language: lang, question: data['question_' + lang] };
      });
      console.log(question_cont);

      toast.promise(
        dispatch(addQuestionGame({
          ...rest,
          category: 1,
          question: question_cont,
          images: filesInputRef.current.files,
        })).then((response) => console.log(response, 'respondddassas')).catch((err) => console.log(err, 'errsadasd')),
        toastAddBody('question'),
      );
    } else {
      toast.warn('Images count should be 3');
    }
  };
  return (
    <div className="question-game bg-light min-vh-100 ">
      <CContainer>
        <CRow>
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
                    error={errors.question?.message}
                    className="mb-1"
                  />
                )}
              />
            ))}
            <Controller
              control={control}
              name="category"
              rules={{
                required: {
                  value: true,
                  message: 'Պարտադիր է',
                },
              }}
              render={({ field }) => (
                <CFormSelect
                  aria-label="Default select example"
                  onChange={field.onChange}
                  value={field.value}
                >
                  {[1, 2, 3].map((category) => {
                    return (
                      <option
                        // key={ind}
                        value={category}
                      >
                        {category}
                      </option>
                    );
                  })}
                </CFormSelect>
              )}
            />
            <Controller
              control={control}
              name="ispremium"
              render={({ field }) => {
                console.log(errors, field, 'field');
                return (
                  <CFormCheck
                    id="flexCheckDefault"
                    label="Is Premium"
                    onChange={(e) => field.onChange(e)}
                    checked={field.value}
                    error={errors.ispremium?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="visible"
              render={({ field }) => (
                <CFormCheck
                  id="flexCheckDefault"
                  label="Visible"
                  onChange={(e) => field.onChange(e)}
                  checked={field.value}
                  error={errors.visible?.message}
                />
              )}
            />
            <input multiple ref={filesInputRef} className="question-game-files-input" type="file" id="" />
            <CButton color="info mt-3 text-white" disabled={loading} onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Games;
