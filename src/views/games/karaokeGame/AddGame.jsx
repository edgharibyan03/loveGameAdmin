import CIcon from '@coreui/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { CButton, CCol, CContainer, CFormInput, CRow } from '@coreui/react';
import React from 'react';
import { addKaraokeGame } from 'src/store/Slices/karaokeGame';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';

const Games = () => {
  const { register, reset, control, getValues, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      question: "",
      images: []
    }
  });
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    const data = getValues();
    dispatch(addKaraokeGame({
      ...data
    }));

  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <Controller
              control={control}
              name='name'
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
                  placeholder="name"
                  className='mb-3'
                  error={!!errors.name?.message}
                // helperText={errors.username?.message}
                />
              )}
            />
             <Controller
              control={control}
              name='language'
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
                  placeholder="language"
                  className='mb-3'
                  error={!!errors.language?.message}
                // helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='link'
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
                  placeholder="link"
                  error={!!errors.link?.message}
                  className='mb-3'
                // helperText={errors.username?.message}
                />
              )}
            />
            
            <CButton color="info mt-3 text-white" onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Games;
