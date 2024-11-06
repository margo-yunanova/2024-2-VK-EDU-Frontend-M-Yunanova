import { ChangeEventHandler, useState } from 'react';

export const useForm = <T>(form: T) => {
  const [formData, setFormData] = useState(form);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, handleChange };
};
