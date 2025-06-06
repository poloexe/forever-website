export const LoaderSpinner = () => {
  return (
    <>
      <div className="flex items-center justify-center my-28">
        <div className="lds-roller ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};