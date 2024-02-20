/* eslint-disable react/jsx-props-no-spreading */
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button } from '@/components/mui';
import sendEmail from '@/lib/api-functions/client/index';

const schema = yup
  .object()
  .shape({
    from: yup.string().email().max(50).required(),
    subject: yup.string().max(300).required(),
    message: yup.string().max(50000).required(),
  })
  .required();

const defaults = {
  from: '',
  subject: '',
  message: '',
};

function ContactForm() {
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    control,
    // formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: defaults,
  });

  const submitFn = (vals) => {
    reset();
    console.log(vals);
    sendEmail(vals);
  };

  const formRowStyle = {
    marginBlockEnd: '1em',
  };

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="from"
          render={({ field }) => (
            <TextField
              type="from"
              {...field}
              label="From"
              fullWidth
              error={!!errors.from}
              helperText={errors.from?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <TextField
              type="subject"
              {...field}
              label="Subject"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <TextField
              type="message"
              {...field}
              label="Message"
              multiline
              rows={4}
              fullWidth
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          )}
        />
      </div>
      <Button
        type="reset"
        onClick={() => reset()}
        primary="true"
        variant="contained"
        disabled={!isDirty}
        sx={{ mx: 2 }}
      >
        Reset
      </Button>
      <Button
        type="submit"
        primary="true"
        variant="contained"
        disabled={isSubmitting || !isDirty || (!isDirty && !isValid)}
      >
        Send Message
      </Button>
    </form>
  );
}

export default ContactForm;
