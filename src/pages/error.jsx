import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Kiểm tra nếu error không phải là object mong đợi
  const errorMessage = error && typeof error === "object" ? error.statusText || error.message || "Unknown error" : "Unknown error";


  return (

    <Result
      status="404"
      title="404"
      subTitle={error.statusText || error.message}
      extra={<Button type="primary">
        <Link to="/">
          Back home
        </Link>
      </Button>}
    />




  );
}