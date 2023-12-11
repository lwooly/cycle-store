import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@/components/mui";
import { addProductSchema, updateProductSchema } from "@/lib/validation";
import { ClassSharp } from "@mui/icons-material";
import Image from "next/image";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Paragraph from "../Paragraph";

const defaults = {
  image: "",
  title: "",
  description: "",
  price: "",
  quantity: "",
};

const ProductForm = ({ submitHandler, product }) => {
  const [formValues, setFormValues] = useState(product);
  const [imgError, setImgError] = useState(false);

  console.log(imgError)

  let schema = addProductSchema;
  if (product) {
    schema = updateProductSchema;
  }

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    control,
    formState,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: product || defaults,
  });

  // watch image url field
  const imageUrl = watch("image");

  //reset error status so code checks url when url is changed by user;
  useEffect(() => {
    setImgError(false);
  }, [imageUrl])

  //show image
  const renderImage = () => {
    if (imgError) {
      return (<Paragraph>No image at this url</Paragraph>)
    } else {
      return (
        <Image
          alt={"Preview image"}
          src={imageUrl}
          height={200}
          width={200}
          onError={() => setImgError(true)}
        />
      );
    }
  };

  const submitFn = (vals) => {
    setFormValues(vals);
    submitHandler(vals);
  };

  const formRowStyle = {
    marginBlockEnd: "1em",
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitFn)}>
        <div style={formRowStyle}>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <TextField
                type="text"
                {...field}
                label="Image url"
                fullWidth
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            )}
          />
        </div>
        <div style={formRowStyle}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                type="text"
                {...field}
                label="title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </div>
        <div style={formRowStyle}>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                type="text"
                {...field}
                label="description"
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </div>
        <div style={formRowStyle}>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextField
                type="number"
                {...field}
                label="price"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </div>
        <div style={formRowStyle}>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => (
              <TextField
                type="number"
                {...field}
                label="quantity"
                fullWidth
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
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
          Submit
        </Button>
      </form>
      <ErrorBoundary>{renderImage()}</ErrorBoundary>
    </>
  );
};

export default ProductForm;
