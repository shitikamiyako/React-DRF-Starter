import React from "react";
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { TextField, Button  } from "@material-ui/core";

const SearchBookForm = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForm();
  const [searchWord, setSearchWord] = useState()
  const handleChange = e => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    searchTitle()
    return () => {
      cleanup
    }
  }, [input])

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={<TextField />}
        name="title"
        control={control}
        rules={{
          required: "書籍のタイトルを入力してください",
          maxLength: {
            value: 100,
            message: "タイトルは100文字以内です"
          }
          }}
        defaultValue=""
        onChange={handleChange}
      />
      <div>
        <ErrorMessage errors={errors} name="multipleErrorInput">
            {({ messages }) =>
              messages && Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))}
        </ErrorMessage>
      </div>

        <Controller
          as={<Button variant="outlined" color="primary">Search</Button>}
          name="submit"
          control={control}
          defaultValue=""
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </React.Fragment>
  );
};

export default SearchBookForm