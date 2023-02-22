import { useForm, Controller } from 'react-hook-form';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CRow,
} from '@coreui/react';
import React, { useMemo } from 'react';
import { addActionGame } from 'src/store/Slices/actionGame';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastAddBody } from 'src/utils/toast';
import { addChoiceGame } from 'src/store/Slices/choiceGame';
import { useAppDispatch } from '../../../store';

const Games = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      ispremium: false,
      visible: false,
      category: 1,
    },
  });
  const languages = useMemo(() => (['ru', 'en', 'es', 'fr', 'jp', 'cn', 'kr']), []);
  const loading = useSelector((state) => state.actionGame.loading);
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    const data = getValues();

    const choice_cont = languages.map((lang) => ({ language: lang, title: data['choice_' + lang] }));

    toast.promise(
      dispatch(addChoiceGame({
        ...data,
        chouse: choice_cont,
      })),
      toastAddBody('choice game'),
    );
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow>
          <CCol md={6}>
            {languages.map((language, ind) => (
              <Controller
                key={ind}
                control={control}
                name={`choice_${language}`}
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                }}
                render={({ field }) => (
                  <CFormInput
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    type="text"
                    placeholder={`Write choice ${language}`}
                    error={!!errors.action?.message}
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
                  message: 'Required',
                },
              }}
              render={({ field }) => (
                <CFormInput
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type="text"
                  placeholder="Category"
                  error={!!errors.action?.message}
                  className="mb-1"
                />
              )}
            />
            <Controller
              control={control}
              name="ispremium"
              render={({ field }) => (
                <CFormCheck
                  id="flexCheckDefault"
                  label="Is Premium"
                  onChange={(e) => field.onChange(e)}
                  defaultChecked={field.value}
                  value={field.value}
                  error={!!errors.ispremium?.message}
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
                  defaultChecked={field.value}
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
