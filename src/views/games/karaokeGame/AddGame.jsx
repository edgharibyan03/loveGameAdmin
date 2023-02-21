import { useForm, Controller } from 'react-hook-form';
import {
  CButton, CCol, CContainer, CFormCheck, CFormInput, CRow,
} from '@coreui/react';
import React from 'react';
import { addKaraokeGame } from 'src/store/Slices/karaokeGame';
import { toast } from 'react-toastify';
import { toastAddBody } from 'src/utils/toast';
import { useAppDispatch } from '../../../store';
import '../style.css'

const Games = () => {
  const {
    control, getValues, formState: { errors }, handleSubmit,
  } = useForm({
    defaultValues: {
      question: '',
      images: [],
      category: 0,
      visible: false,
      ispremium: false,
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    const data = getValues();
    console.log(data, 'data');
    toast.promise(
      dispatch(addKaraokeGame({
        ...data,
      })),
      toastAddBody('karaoke'),
    )
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row karaoke-game-add">
      <CContainer>
        <CRow>
          <CCol md={6}>
            <Controller
              control={control}
              name="name"
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
                  placeholder="Name"
                  className="mb-3"
                  error={!!errors.name?.message}
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
                  message: 'Պարտադիր է',
                },
              }}
              render={({ field }) => (
                <CFormInput
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type="text"
                  placeholder="Language"
                  className="mb-3"
                  error={!!errors.language?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="link"
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
                  placeholder="Link"
                  error={!!errors.link?.message}
                  className="mb-3"
                // helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CFormInput
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  type="number"
                  placeholder="Category"
                  error={!!errors.category?.message}
                  className="mb-3"
                // helperText={errors.username?.message}
                />
              )}
            />
            <div className="karaoke-game-add-checkboxes">
              <span>Visible: </span>
              <Controller
                control={control}
                name="visible"
                render={({ field }) => (
                  <CFormCheck
                    onChange={(e) => field.onChange(e)}
                    checked={field.value}
                    placeholder="Visible"
                    defaultChecked={field.value}
                    error={!!errors.category?.message}
                    className="mb-3"
                  />
                )}
              />
            </div>
            <div className="karaoke-game-add-checkboxes">
              <span>Is premium: </span>
              <Controller
                control={control}
                name="ispremium"
                render={({ field }) => (
                  <CFormCheck
                    onChange={(e) => field.onChange(e)}
                    checked={field.value}
                    placeholder="Is premium"
                    defaultChecked={field.value}
                    error={!!errors.category?.message}
                    className="mb-3"
                  // helperText={errors.username?.message}
                  />
                )}
              />
            </div>
            <CButton color="info text-white" onClick={handleSubmit(onSubmit)}>Submit</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Games;
