import { NOT_FOUND } from 'services/Api';
const NotFound = () => {
  return (
    <>
      <p>NotFound</p>;
      <img src={NOT_FOUND} alt="NOT_FOUND" width="400px" />;
    </>
  );
};
export default NotFound;
