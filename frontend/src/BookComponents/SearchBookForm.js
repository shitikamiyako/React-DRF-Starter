import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextField, Button, Grid, Box } from "@material-ui/core";

const SearchBookForm = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForm();

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                inputProps={{ min: 0, style: { textAlign: "center" } }}
              />
            }
            name="title"
            control={control}
            rules={{
              required: "書籍のタイトルを入力してください",
              maxLength: {
                value: 100,
                message: "タイトルは100文字以内です",
              },
            }}
            defaultValue=""
          />
          <div>
            <ErrorMessage errors={errors} name="multipleErrorInput">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            </ErrorMessage>
          </div>
          <Box mt={1} textAlign="center">
            <Controller
              as={
                <Button variant="outlined" color="primary">
                  Search
                </Button>
              }
              name="submit"
              control={control}
              defaultValue=""
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SearchBookForm;
