import React, { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CFormSelect, CRow,
} from '@coreui/react';
import { toastAddBody } from 'src/utils/toast';
import { toast } from 'react-toastify';
import { getGiftsCategories } from 'src/store/Slices/giftsCotegories';
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
      categoryId: null,
      ispremium: true,
      time: null,
      fixedPosition: '',
      title: '',
    },
  });

  const filesInputRef = useRef();

  const loading = useSelector((state) => state.actionGame.loading);
  const giftsCotegories = useSelector((state) => state.giftsCotegories.giftCategory);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const { fixedPosition, ...data } = getValues();
    console.log(data, 'dataaaaaaa');
    if (filesInputRef.current.files[0]) {
      toast.promise(
        dispatch(createGift({ ...data, position: { fixedPosition }, image: filesInputRef.current.files[0] })),
        toastAddBody('gift'),
      )
    }
    // const { action_ru, action_en, ...rest } = data;
    // const action_cont = languages.map((lang) => ({ "language": lang, "title": lang === 'ru' ? action_ru : action_en, }));
    // dispatch(addActionGame(data));
  };
  useEffect(() => {
    dispatch(getGiftsCategories('?skip=0&take=10'));
  }, []);
  return (
    <div className="bg-light min-vh-100 d-flex">
      <CContainer>
        <CRow>
          <CCol md={6}>
            <Controller
              control={control}
              name="categoryId"
              rules={{
                required: {
                  value: true,
                  message: 'Required',
                },
              }}
              render={({ field }) => (
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(e) => field.onChange(e)}
                >
                  <option>Open this select menu</option>
                  { giftsCotegories?.categoryList?.map((cotegory, ind) => (<option key={ind} value={+cotegory.id}>{cotegory.title}</option>))}
                </CFormSelect>
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
              name="time"
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
                  placeholder="Time"
                  error={!!errors.time?.message}
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
              name="fixedPosition"
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
                  placeholder="Fixed Position"
                  error={!!errors.fixedPosition?.message}
                  className="mb-1"
                // helperText={errors.username?.message}
                />
              )}
            />
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
                  placeholder="Title"
                  error={!!errors.title?.message}
                  className="mb-1"
                // helperText={errors.username?.message}
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
            <input multiple ref={filesInputRef} className="question-game-files-input" type="file" id="" />
            <CButton color="info mt-3 text-white" disabled={loading} onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AddGift;
