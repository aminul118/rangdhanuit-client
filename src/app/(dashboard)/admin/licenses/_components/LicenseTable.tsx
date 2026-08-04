"use client";

import TableManageMent from "@/components/common/table/TableManageMent";
import { ILicense } from "@/services/License/license.interface";
import { IMeta } from "@/types";
import getLicenseTableColumns from "./LicenseTableColumn";

interface LicenseTableProps {
  licenses: ILicense[];
  meta?: IMeta;
  onEdit: (lic: ILicense) => void;
  onApprove: (lic: ILicense) => void;
}

const LicenseTable = ({
  licenses,
  meta,
  onEdit,
  onApprove,
}: LicenseTableProps) => {
  const columns = getLicenseTableColumns(onEdit, onApprove);

  return (
    <TableManageMent
      columns={columns}
      data={licenses}
      meta={meta}
      getRowKey={(lic) => lic._id}
      emptyMessage="No client licenses found. Click 'Add Client Website' above to issue a new license!"
    />
  );
};

export default LicenseTable;
