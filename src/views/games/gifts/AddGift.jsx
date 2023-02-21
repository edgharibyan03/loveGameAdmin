import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CRow,
} from '@coreui/react';
import { toastAddBody } from 'src/utils/toast';
import { toast } from 'react-toastify';
import { createGift } from '../../../store/Slices/gifts';
import { useAppDispatch } from '../../../store';

const AddGift = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      level: null,
      goldPrice: null,
      dimondPrice: null,
      path: '',
      visible: true,
      category: 1,
      isPremium: true,
    },
  });

  const filesInputRef = useRef();

  const loading = useSelector((state) => state.actionGame.loading);

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const data = getValues();

    if (filesInputRef.current.files[0]) {
      toast.promise(
        dispatch(createGift({ ...data, image: filesInputRef.current.files[0] })),
        toastAddBody('gift'),
      )
    }
    // const { action_ru, action_en, ...rest } = data;
    // const action_cont = languages.map((lang) => ({ "language": lang, "title": lang === 'ru' ? action_ru : action_en, }));
    // dispatch(addActionGame(data));
  };

  return (
    <div className="bg-light min-vh-100 d-flex">
      <CContainer>
        <CRow>
          <CCol md={6}>
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
                // helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="dimondPrice"
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
                  placeholder="Diamond price"
                  error={!!errors.dimondPrice?.message}
                  className="mb-1"
                // helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="goldPrice"
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
                  placeholder="Gold price"
                  error={!!errors.goldPrice?.message}
                  className="mb-1"
                // helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="level"
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
                  placeholder="Level"
                  error={!!errors.level?.message}
                  className="mb-1"
                // helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="isPremium"
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
            <input multiple ref={filesInputRef} className="question-game-files-input" type="file" id="" />
            <CButton color="info mt-3 text-white" disabled={loading} onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AddGift;
