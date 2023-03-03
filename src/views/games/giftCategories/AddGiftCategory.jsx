import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CFormSelect, CRow,
} from '@coreui/react';
import { createGiftCategory } from 'src/store/Slices/giftsCotegories';
import { toastAddBody } from 'src/utils/toast';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../store';

const languages = [
  {
    id: 0,
    value: 'Russian',
  },
  {
    id: 1,
    value: 'English',
  },
  {
    id: 2,
    value: 'Spanish',
  },
  {
    id: 3,
    value: 'Japanese',
  },
  {
    id: 4,
    value: 'French',
  },
  {
    id: 5,
    value: 'Chinese',
  },
  {
    id: 6,
    value: 'Korean',
  },
]

const AddGift = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
      language: languages[0],
    },
  });

  const filesInputRef = useRef();

  const loading = useSelector((state) => state.actionGame.loading);

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const data = getValues();
    console.log(data, '3-21-321-3-21--21-31');
    toast.promise(
      dispatch(createGiftCategory({
        category: {
          title: data.title,
          language: data.language.value,
        },
      })),
      toastAddBody('add category'),
    )
  };

  console.log(getValues(), errors, 'errors');

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
            <Controller
              control={control}
              name="language"
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
                  {languages.map((language, ind) => {
                    return (
                      <option
                        key={ind}
                        value={+language.id}
                      >
                        {language.value}
                      </option>
                    );
                  })}
                </CFormSelect>
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
