import { deletePortfolio } from '@/services/Portfolio/portfolios';
import { IPortfolio } from '@/types';
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";

const ProjectActions = ({ project }: { project: IPortfolio }) => {
  return (
    <TableActionDropdown
      editLink={`/admin/portfolios/edit/${project._id}`}
      deleteAction={() => deletePortfolio(project._id)}
      deleteConfirmMessage="Are you sure you want to delete this project?"
      deleteSuccessMessage="Project removed from your portfolio successfully."
    />
  );
};

export default ProjectActions;
