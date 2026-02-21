import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import useForm from "../../hooks/useForm";

const UserForm = ({ initialData = {}, onSubmit, loading }) => {
  const { form, errors, handleChange, validate, getFormData } = useForm(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = getFormData();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-md shadow-md max-w-2xl mx-auto space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} />
        <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} />
      </div>

      <InputField label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
      <InputField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} error={errors.mobile} />

      <div className="grid md:grid-cols-2 gap-4">
        <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} error={errors.gender} options={["Male", "Female"]} />
        <SelectField label="Status" name="status" value={form.status} onChange={handleChange} error={errors.status} options={["Active", "Inactive"]} />
      </div>

      <InputField label="Location" name="location" value={form.location} onChange={handleChange} />

      <div>
        <label className="text-sm font-medium">Profile Image</label>
        <input
          type="file"
          name="profileImage"
          onChange={handleChange}
          className="w-full text-sm mt-1"
        />
      </div>

      <div className="flex justify-center">
        <Button type="submit">
          {loading ? "Saving..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;