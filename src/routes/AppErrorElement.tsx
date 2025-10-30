// src/routes/AppErrorElement.tsx
import { Button, Result } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

export default function AppErrorElement() {
  const nav = useNavigate();
  const err = useRouteError() as any;
  return (
    <Result
      status="error"
      title="Unexpected application error"
      subTitle={err?.message || "Something went wrong."}
      extra={[
        <Button
          type="primary"
          key="home"
          onClick={() => nav("/", { replace: true })}
        >
          Go Home
        </Button>,
        <Button key="back" onClick={() => nav(-1)}>
          Go Back
        </Button>,
      ]}
    />
  );
}
