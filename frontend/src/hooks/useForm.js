import { useState, useEffect } from "react";
import { validateUser } from "../utils/validators";

const useForm = (initialData = {}) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    status: "",
    location: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData._id) {
      setForm({ ...initialData, profileImage: null });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      setForm({ ...form, profileImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const validationErrors = validateUser(form);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const getFormData = () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });
    return formData;
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      status: "",
      location: "",
      profileImage: null,
    });
    setErrors({});
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    validate,
    getFormData,
    resetForm,
  };
};

export default useForm;
