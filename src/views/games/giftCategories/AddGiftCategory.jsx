import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CRow,
} from '@coreui/react';
import { createGiftCategory } from 'src/store/Slices/giftsCotegories';
import { toastAddBody } from 'src/utils/toast';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store';

const AddGift = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  const filesInputRef = useRef();

  const loading = useSelector((state) => state.actionGame.loading);

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const data = getValues();
    toast.promise(
      dispatch(createGiftCategory(data)),
      toastAddBody('add category'),
    )
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
              name="title"
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
                  error={!!errors.category?.message}
                  className="mb-1"
                // helperText={errors.username?.message}
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

export default AddGift;
