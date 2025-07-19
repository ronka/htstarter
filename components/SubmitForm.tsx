import ProjectForm from "./ProjectForm";

interface SubmitFormProps {
  onClose: () => void;
}

const SubmitForm = ({ onClose }: SubmitFormProps) => {
  return <ProjectForm onClose={onClose} mode="create" />;
};

export default SubmitForm;
