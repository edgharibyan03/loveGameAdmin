import CIcon from '@coreui/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { CButton, CCol, CContainer, CFormCheck, CFormInput, CRow } from '@coreui/react';
import React from 'react';
import { addQuestionGame } from 'src/store/Slices/questionGame';
import { useAppDispatch } from '../../../store';
import { useMemo } from 'react';
import { addActionGame } from 'src/store/Slices/actionGame';
import { useSelector } from 'react-redux';
const Games = () => {
  const { register, reset, control, getValues, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      action: "",
      images: []
    }
  });
  const languages=useMemo(()=>(['ru','en']),[]); 
  const loading = useSelector((state) => state.actionGame.loading);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    const data = getValues();
    const {action_ru, action_en, ...rest}=data;
    const action_cont=languages.map((lang)=>({ "language":lang,  "title": lang==='ru'?action_ru:action_en,}))
    dispatch(addActionGame({
      ...rest,
      category: 1,
      action:action_cont
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
              name={`action_${language}`}
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
                  placeholder={`Write action ${language}`}
                  error={!!errors.action?.message}
                  className="mb-1"
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
            <CButton color="info mt-3 text-white" disabled={loading} onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Games;
