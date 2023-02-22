import { useForm, Controller } from 'react-hook-form';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CRow,
} from '@coreui/react';
import React, { useCallback, useMemo } from 'react';
import { addActionGame } from 'src/store/Slices/actionGame';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastAddBody } from 'src/utils/toast';
import { useAppDispatch } from '../../../store';

const Games = () => {
  const dispatch = useAppDispatch();

  const loading = useSelector((state) => state.actionGame.loading);

  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      action: '',
      images: [],
      ispremium: false,
      visible: false,
    },
  });

  const languages = useMemo(() => (['ru', 'en', 'es', 'fr', 'jp', 'cn', 'kr']), []);

  const onSubmit = useCallback(() => {
    const data = getValues();

    const { ...rest } = data;

    const action_cont = languages.map((lang) => ({ language: lang, title: data['action_' + lang] }));

    toast.promise(
      dispatch(addActionGame({
        ...rest,
        action: action_cont,
      })),
      toastAddBody('action game'),
    )
  }, [languages]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow>
          <CCol md={6}>
            {languages.map((language, ind) => (
              <Controller
                key={ind}
                control={control}
                name={`action_${language}`}
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
                    placeholder={`Write action ${language}`}
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
                  type="number"
                  placeholder="Category"
                  error={!!errors.category?.message}
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
