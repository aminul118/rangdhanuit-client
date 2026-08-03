import CenterSpinner from "@/components/common/loader/CenterSpinner";

const PublicLoading = () => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <CenterSpinner text="Loading..." />
  </div>
);

export default PublicLoading;
